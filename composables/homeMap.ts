import { MarkerWithLabel } from "@googlemaps/markerwithlabel"

export type PolygonNode = {
  id: string,
  parent_id: string | null,
  path: string,
  state: {
    selected: boolean,
    indeterminate: boolean,
    expanded: boolean,
    checked: boolean
  },
  data: any,
  text: string,
  zoom: number,
  _lft: number,
  _rgt: number,
  children?: PolygonNode[]
}
export type FlattenedNode = Omit<PolygonNode, 'children'>

export const MAP_OPACITY_HOVER = 0.6
export const MAP_OPACITY_CHILDIN = 0.25
export const MAP_OPACITY_SELECTED = 0.9;

const DEFAULT_ZOOM = 10;
const ZOOM_BREAK1 = 13;
const ZOOM_BREAK2 = 15;

export const DEFAULT_MAP = {
  center: {
    lat: 29.757224,
    lng: -95.360641,
  },
  zoom: DEFAULT_ZOOM,
}

let floodFetchAborter = new AbortController();
let listPointAborter = new AbortController();
let schoolZoneAborter = new AbortController();
let polyListAborter = new AbortController();

export const useGoogleMap = () =>
  useState<google.maps.Map>('google_map', undefined)

export const initializeGoogleMap = async (map_html: HTMLElement): Promise<void> => {
  const homeStore = useHomeStore();

  // Initialize Google Map
  const map = new google.maps.Map(map_html as HTMLElement, {
    center: new google.maps.LatLng(homeStore.map.center.lat, homeStore.map.center.lng),
    zoom: homeStore.map.zoom,
    maxZoom: 18,
    minZoom: 8,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
    panControl: true,
    mapId: '1'
  });

  homeStore.bikeLayer = new google.maps.BicyclingLayer();

  homeStore.polygonLabel = new MarkerWithLabel({
    map,
    position: new google.maps.LatLng(0, 0),
    draggable: false,
    labelAnchor: new google.maps.Point(0, 0),
    labelClass: "polygon-label",
    icon: "/images/transparent.png",
    visible: false,
    labelContent: 'FOO',
    crossOnDrag: false
  });

  google.maps.event.addListener(map, 'idle', () => {
    const center = map.getCenter();
    homeStore.map = {
      center: {
        lat: center?.lat() || DEFAULT_MAP.center.lat,
        lng: center?.lng() || DEFAULT_MAP.center.lng
      },
      zoom: map.getZoom() || DEFAULT_MAP.zoom
    }
    updatePolygonViewport()
  })

  map.data.addListener('mouseover', (event: google.maps.Data.MouseEvent) => {
    if (event.feature.getProperty("disableEvents")) return false;
    polyMouseOverEvent(event.feature, event);
  })

  map.data.addListener("mousemove", (event: google.maps.Data.MouseEvent) => {
    if (event.feature.getProperty("disableEvents")) return false;
    polyMouseMoveEvent(event.feature, event);
  });

  map.data.addListener("mouseout", (event: google.maps.Data.MouseEvent) => {
    if (event.feature.getProperty("disableEvents")) return false;
    polyMouseOutEvent(event.feature, event);
  });

  map.data.addListener("click", (event: google.maps.Data.MouseEvent) => {
    if (event.feature.getProperty("disableClick")) return false;

    polyClickEvent(event.feature, event);
    setPolygonDataStyling();
  })

  map.data.addListener("rightclick", (event: google.maps.Data.MouseEvent) => {
    const feature = event.feature;
    const page_url = feature.getProperty('page_url');
    if (feature.getProperty("disableClick")) return false;
    if (page_url === undefined || page_url === null) return false;

    if (typeof page_url === 'string') {
      window.location.href = page_url;
    }
  });

  useGoogleMap().value = map;
}

export const getPolygonList = async (isV2: boolean) => {
  const homeStore = useHomeStore()

  if (polyListAborter && !polyListAborter.signal.aborted) polyListAborter.abort();

  polyListAborter = new AbortController();

  homeStore.isLoading = true;

  $fetch<any[]>(`${homeStore.API_ENDPOINT}/api/polygon/${isV2 ? 'get-list-v2' : 'get-list'}`,
    {
      method: 'POST',
      body: {
        ids: homeStore.selectedParents
      },
      signal: polyListAborter.signal
    },
  ).then(data => {
    const notExpanded = findAll(homeStore.polygonTrunks[homeStore.level], { expanded: false });
    // const notExpanded = this.$refs.tree
    //   .findAll({ state: { expanded: false } })
    //   .map((node) => node.id);

    // this.$refs.tree?.remove({}, true);
    homeStore.polygonTrunks = [[], [], []];

    console.log("Selected Polygons: ", homeStore.selectedPolygons);

    buildTrunk(data).forEach((list, index) => {
      list.forEach((data) => {
        const node = prepareNodeData(data);
        homeStore.polygonTrunks[index].push(node);

        if (index === homeStore.level) {
          console.log(node)
          if (!notExpanded.includes(node)) {
            node.state.expanded = true
          }
          // let trunk = this.$refs.tree.prepend(node);

          // if (!notExpanded.includes(trunk.id)) {
          //   trunk.expand();
          // }
        }
      });
    });
  }).finally(() => {
    homeStore.isLoading = false;
  })
}

export const isPolygonVisible = (zoom: number, displayAsBg: number) => {
  const homeStore = useHomeStore();
  if (homeStore.showFloodZones || homeStore.showSchoolZones || homeStore.showBikeTrails) return false;
  return (homeStore.level + 1 === zoom) || (homeStore.level === 2 && zoom === 2 && displayAsBg === 1)
}

export const setPolygonDataStyling = async () => {
  const map = useGoogleMap().value;
  const homeStore = useHomeStore();

  const currentZoom = map.getZoom() || homeStore.map.zoom;
  const level3Enabled = currentZoom >= ZOOM_BREAK2;
  const level2Enabled = !level3Enabled && currentZoom >= ZOOM_BREAK1;

  let level: 0 | 1 | 2 = 0;
  if (level2Enabled) {
    level = 1;
  } else if (level3Enabled) {
    level = 2;
  }

  setPolygonsActiveLevel(level, true);

  map.data.setStyle(function (feature) {
    const visibilityToggle = feature.getProperty("visibilityToggle") as string;
    const type = feature.getProperty("type") as string;
    let active = false;
    if (homeStore.showSchoolZones && visibilityToggle === 'schoolZones') active = type === homeStore.activeSchoolZone
    else if (homeStore.showFloodZones && visibilityToggle === 'floodZones') active = homeStore.floodZones.includes(type)
    else active = false

    const zoom = feature.getProperty("zoom") as number;
    const displayAsBg = feature.getProperty("display_as_background") as number;
    const visible = visibilityToggle ? active : isPolygonVisible(zoom, displayAsBg);

    let selected = false;
    if (visible && !visibilityToggle) {
      let id = feature.getProperty("id");
      selected = homeStore.selectedPolygons.some((sid) => sid == id);
    }

    let fillColor = feature.getProperty("fillColor") as string;
    if (!fillColor.includes("#")) {
      fillColor = "#" + fillColor;
    }

    let strokeColor = feature.getProperty("strokeColor") as string;
    if (strokeColor && !strokeColor.includes("#")) {
      strokeColor = "#" + strokeColor;
    }

    return {
      fillColor: fillColor,
      strokeColor: strokeColor || "#101010",
      strokeWeight: 1,
      strokeOpacity: 0.5,
      fillOpacity: selected
        ? MAP_OPACITY_SELECTED
        : feature.getProperty("fillOpacity") as number,
      visible: visible as boolean,
      zIndex: feature.getProperty("zIndex") as number,
    };
  });
}

const polyClickEvent = (poly: google.maps.Data.Feature, event: google.maps.Data.MouseEvent) => {
  const homeStore = useHomeStore();
  const map = useGoogleMap().value;

  let zoom = poly.getProperty("zoom");

  if (zoom == 2 && homeStore.level === 2) {
    return false;
  }

  if (homeStore.zoomOnPolyClick && !homeStore.selectedPolygons.length) {
    if (event.latLng) map.setCenter(event.latLng);
    map.setZoom(13);
  }

  homeStore.zoomOnPolyClick = false;

  const polyId = poly.getProperty("id") as string;
  if (homeStore.selectedPolygons.some((sid) => sid == polyId)) {
    uncheckPolygon(polyId);
  } else {
    checkPolygon(polyId);
    homeStore.showResult = false;
  }
}

export const redrawMap = () => {
  setPolygonDataStyling();
}

export const updateBikeLayer = () => {
  const store = useHomeStore();
  const map = useGoogleMap().value;

  store.bikeLayer.setMap(store.showBikeTrails ? map : null);
}

export const updatePolygonViewport = async (initiate: boolean = false) => {
  const map = useGoogleMap().value;
  const homeStore = useHomeStore();
  const authStore = useAuthStore();

  let mapBounds = map.getBounds();

  if (!mapBounds) {
    return;
  }

  let currentZoom = map.getZoom() || DEFAULT_MAP.zoom;
  const ne = mapBounds.getNorthEast();
  const sw = mapBounds.getSouthWest();
  const level = currentZoom >= ZOOM_BREAK1 ? (currentZoom >= ZOOM_BREAK2 ? 2 : 1) : 0;

  const minLat = sw.lat();
  const maxLat = ne.lat();
  const minLng = ne.lng();
  const maxLng = sw.lng();

  homeStore.level = level;

  if (currentZoom == homeStore.lastZoomUpdate && level === 0 && homeStore.existingPolygonIds.length > 0) {
    return;
  }
  homeStore.lastZoomUpdate = currentZoom;

  homeStore.l3Confirmed = true;
  if (!authStore.authenticated && level === 2 && homeStore.level !== level && !initiate && !homeStore.popupDisplayed) {
    homeStore.popupDisplayed = true;
    eventBus.emit(SHOW_POPUP_L3ALERT)
  }

  if (homeStore.showBikeTrails || homeStore.showFloodZones || homeStore.showSchoolZones) return;

  try {
    if (listPointAborter && !listPointAborter.signal.aborted) listPointAborter.abort();
    listPointAborter = new AbortController();

    homeStore.isLoading = true;

    const data = await $fetch<string>(`${homeStore.API_ENDPOINT}/api/polygons/list-points`, {
      method: 'POST',
      body: {
        bounds: [minLat, minLng, maxLat, maxLng],
        excludeList: homeStore.existingPolygonIds,
        zoom: level + 1
      },
      signal: listPointAborter.signal
    });

    const realData = JSON.parse(data) as any[]

    realData.forEach(makePolygon)

    redrawMap()
  } catch {

  } finally {
    homeStore.isLoading = false;
  }
}

const makePolygon = (el: any) => {
  const homeStore = useHomeStore();
  const map = useGoogleMap().value;

  if (homeStore.existingPolygonIds.some((id) => id == el.id)) {
    return;
  }

  homeStore.existingPolygonIds.push(el.id);
  el.geometry = JSON.parse(el.geometry);

  map.data.addGeoJson({
    type: "FeatureCollection",
    features: [
      {
        id: el.id,
        type: "Feature",
        geometry: el.geometry,
        properties: {
          title: el.title,
          id: el.id,
          parent_id: el.parent_id,
          zIndex: 40075000 - el.area,
          fillColor: el.color ?? "275b30",
          fillOpacity: MAP_OPACITY_CHILDIN,
          zoom: el.zoom,
          display_as_background: el.display_as_background,
          page_url: el.page_url
        },
      },
    ],
  });
}

const mapSchools = (item: any) => ({
  type: "Feature",
  geometry: item.geometry_json,
  properties: {
    id: item.id,
    title: item.title_short,
    zIndex: -1,
    fillColor: item.color,
    fillOpacity: .8,
    opacityChillin: .8,
    visibilityToggle: "schoolZones",
    type: item.type,
    disableClick: 1,
    disableEvents: 0,
  }
});

const filterSchools = (item: any) => {
  const homeStore = useHomeStore();

  const isPlotted = homeStore.schoolZoneIds.has(item.properties.id);
  homeStore.schoolZoneIds.add(item.properties.id);

  if (!isPlotted && item.geometry?.coordinates) {
    const bounds = new google.maps.LatLngBounds();

    for (let i = 0; i < item.geometry.coordinates[0][0].length; i++) {
      bounds.extend(new google.maps.LatLng(item.geometry.coordinates[0][0][i][1], item.geometry.coordinates[0][0][i][0]));
    }
  }

  return !isPlotted;
}

export const updateSchoolZones = async () => {
  const homeStore = useHomeStore();
  const map = useGoogleMap().value;

  if (!homeStore.showSchoolZones) {
    return;
  }

  if (schoolZoneAborter && !schoolZoneAborter.signal.aborted) schoolZoneAborter.abort();

  schoolZoneAborter = new AbortController();

  try {
    homeStore.isLoading = true;
    const data = await $fetch<any[]>(`${homeStore.API_ENDPOINT}/api/school-zones/list`,
      {
        method: 'POST',
        body: {
          type: homeStore.activeSchoolZone
        },
        signal: schoolZoneAborter.signal
      }
    )

    const features = data.map(item => mapSchools(item)).filter(filterSchools)
    console.log(features)
    map.data.addGeoJson({
      type: 'FeatureCollection',
      features: features
    })
    redrawMap()
  } finally {
    homeStore.isLoading = false;
  }
}

export const updateFloodZones = (zone: number = -1) => {
  const homeStore = useHomeStore();
  const map = useGoogleMap().value;

  if (!homeStore.showFloodZones) {
    return;
  }

  const mapBounds = map.getBounds();
  if (!mapBounds) return;

  const zoom = map.getZoom();
  const ne = mapBounds.getNorthEast();
  const sw = mapBounds.getSouthWest();

  const minLat = sw.lat();
  const maxLat = ne.lat();
  const minLng = ne.lng();
  const maxLng = sw.lng();
  const bounds = [minLat, minLng, maxLat, maxLng];

  fetchFloodData({ bounds, zoom, exclude: Array.from(homeStore.floodPlaneIds) });
}

export const polyMouseOverEvent = (poly: google.maps.Data.Feature, event: google.maps.Data.MouseEvent) => {
  let zoom = poly.getProperty("zoom");
  const homeStore = useHomeStore();

  if (zoom == 2 && homeStore.level === 2) {
    return false;
  }

  poly.setProperty("fillOpacity", MAP_OPACITY_HOVER);

  if (homeStore.polygonLabel) {
    const title = poly.getProperty("title") as string;
    homeStore.polygonLabel.labelElement.innerHTML = `<div>${title}<br/><span class="text-muted"><em>right click to view more information.</em></span></div>`
  }
}

export const polyMouseMoveEvent = (poly: google.maps.Data.Feature, event: google.maps.Data.MouseEvent) => {
  let zoom = poly.getProperty("zoom");
  const homeStore = useHomeStore();

  if (zoom == 2 && homeStore.level === 2) {
    return false;
  }

  if (homeStore.polygonLabel) {
    const title = poly.getProperty("title") as string;
    homeStore.polygonLabel.labelElement.innerHTML = `<div>${title}<br/><span class="text-muted"><em>right click to view more information.</em></span></div>`
    homeStore.polygonLabel.setPosition(event.latLng);
    homeStore.polygonLabel.setVisible(true);
  }
}

export const polyMouseOutEvent = (poly: google.maps.Data.Feature, event: google.maps.Data.MouseEvent) => {
  let zoom = poly.getProperty("zoom");
  const homeStore = useHomeStore();

  if (zoom == 2 && homeStore.level === 2) {
    return false;
  }
  homeStore.polygonLabel?.setVisible(false);
  poly.setProperty("fillOpacity", poly.getProperty('opacityChillin') || MAP_OPACITY_CHILDIN);
}


const fetchFloodData = async ({
  url = "",
  bounds = [],
  zoom = 10,
  exclude = [],
}: {
  url?: string;
  bounds?: number[];
  zoom?: number;
  exclude?: string[];
}) => {
  const homeStore = useHomeStore();
  const map = useGoogleMap().value;
  if (!homeStore.showFloodZones) return false;

  if (floodFetchAborter && !floodFetchAborter.signal.aborted) floodFetchAborter.abort()
  floodFetchAborter = new AbortController();

  try {
    homeStore.isLoading = true;
    const data = (await $fetch<any>(`${homeStore.API_ENDPOINT}/api/flood-zones/list${url}`, {
      method: "POST",
      body: {
        exclude,
        flood_zone: homeStore.floodZones,
        bounds,
        zoom
      },
      signal: floodFetchAborter.signal
    }))?.data as any[];

    if (!data.length) {
      redrawMap()
      return;
    }

    map.data.addGeoJson({
      type: "FeatureCollection",
      features: data.map(item => {
        return {
          id: item.flood_zone_ar_id,
          type: "Feature",
          geometry: JSON.parse(item.geometry),
          properties: {
            id: item.flood_zone_ar_id,
            zIndex: -1,
            type: item.flood_zone,
            fillColor: item.color,
            fillOpacity: .8,
            strokeColor: "232323",
            visibilityToggle: "floodPlanes",
            disableClick: 1,
            disableEvents: 1,
          }
        }
      }).filter(item => {
        const isPlotted = homeStore.floodPlaneIds.has(item.properties.id);
        homeStore.floodPlaneIds.add(item.properties.id);
        return !isPlotted;
      }),
    });
  } catch {

  } finally {
    homeStore.isLoading = false;
  }
}

export const setPolygonsActiveLevel = async (level: 0 | 1 | 2, skipZoom: boolean, ignorePopup: boolean = true) => {
  const authStore = useAuthStore();
  const homeStore = useHomeStore();

  homeStore.l3Confirmed = true;

  if (!authStore.authenticated && !ignorePopup && homeStore.level !== level && !homeStore.popupDisplayed) {
    homeStore.popupDisplayed = true;
    eventBus.emit(SHOW_POPUP_L3ALERT);
  }


  if (level !== homeStore.level) {
    homeStore.level = level;
    homeStore.polygonTrunks[level].forEach((trunkData: PolygonNode) => {
      trunkData.state.expanded = true;
    })

    if (!skipZoom) {
      let zoom = 10;
      if (level === 1) {
        zoom = 13;
      } else if (level === 2) {
        zoom = 15;
      }
      useGoogleMap().value.setZoom(zoom);
    }
  }
}

export const onCheckPoly = (node: PolygonNode) => {
  const homeStore = useHomeStore();
  setTimeout(function () {
    if (!node.state.checked) return;
    if (homeStore.selectedPolygons.indexOf(node.id) !== -1) return;
    addPolygonChildrenRecursively(node.id);
  }, 300);
}

export const onUncheckPoly = (node: PolygonNode) => {
  const homeStore = useHomeStore();
  setTimeout(() => {
    if (node.state.checked) return;
    if (homeStore.selectedPolygons.indexOf(node.id) === -1) return;
    homeStore.selectedParents = homeStore.selectedPolygons.filter(id => id != node.id)
    homeStore.selectedPolygons = homeStore.selectedPolygons.filter(id => id != node.id)
    removePolygonChildrenRecursively(node.id);
  }, 300);
}

export const addPolygonChildrenRecursively = (polyId: string) => {
  const homeStore = useHomeStore();
  const data = homeStore.polygonTrunks[homeStore.polygonTrunks.length - 1];

  const item = findItemById(data, polyId)
  if (item) {
    const items = findAll(item?.children || [], {})

    items.forEach(item => {
      item.state.checked = true
    })
    const selectedPolygons = [...homeStore.selectedPolygons, ...items.map(item => item.id), item.id];
    homeStore.selectedPolygons = [...new Set(selectedPolygons)];
  }
}

export const removePolygonChildrenRecursively = (polyId: string) => {
  const homeStore = useHomeStore();
  const data = homeStore.polygonTrunks[homeStore.polygonTrunks.length - 1];

  const item = findItemById(data, polyId)
  const items = findAll(item?.children || [], {})

  items.forEach(item => {
    item.state.checked = false
    item.state.indeterminate = false
    const selectedPolygons = homeStore.selectedPolygons
    const index = selectedPolygons.indexOf(item.id)
    if (index !== -1) {
      selectedPolygons.splice(index, 1)
    }
    homeStore.selectedPolygons = [...new Set(selectedPolygons)];
  })
}

const checkPolygon = (polyId: string) => {
  const homeStore = useHomeStore()
  addToPolygonList(polyId);

  if (homeStore.selectedPolygons.some((id) => id == polyId)) {
    return;
  }

  homeStore.selectedPolygons.push(polyId);

  $fetch(`${homeStore.API_ENDPOINT}/api/polygon/trunk/${polyId}`)
    .then((data: any) => {
      homeStore.selectedPolygons = [...homeStore.selectedPolygons, ...data.ids].filter((value, index, self) => self.indexOf(value) === index);
      homeStore.ancestorPolygons = [...homeStore.ancestorPolygons, ...data.ancestors].filter((value, index, self) => self.indexOf(value) === index);
      homeStore.selectedParents = [...homeStore.selectedParents, ...data.ancestors, +data.id].filter((value, index, self) => self.indexOf(value) === index);
    })
}

export const uncheckPolygon = (polyId: string) => {
  const homeStore = useHomeStore();

  const item = findItemById(homeStore.polygonTrunks[homeStore.level], polyId)
  if (item) onUncheckPoly(item)

  removePolygonChildrenRecursively(polyId);
  homeStore.selectedPolygons.splice(homeStore.selectedPolygons.indexOf(polyId), 1);
  removeFromPolygonList(polyId);
  if (homeStore.selectedParents.indexOf(polyId) !== -1) {
    homeStore.selectedParents.splice(homeStore.selectedParents.indexOf(polyId), 1);
  }
}

const addToPolygonList = (polyId: string) => {
  const homeStore = useHomeStore();

  const selectedPolygons = homeStore.property.map.selectedPolygons;
  if (!selectedPolygons.includes(polyId)) {
    homeStore.property.map.selectedPolygons.push(polyId);
  }
}

const flattenData = (data: PolygonNode[]): PolygonNode[] => {
  return data.map(item => {
    const newItem = {
      ...item, state: {
        checked: false,
        expanded: false,
        indeterminate: false,
        selected: false
      }
    };

    if (newItem.children && newItem.children.length) {
      newItem.children = flattenData(newItem.children);
    }

    return newItem;
  });
};

export const removeFromPolygonList = (polyId: string) => {
  const homeStore = useHomeStore();
  homeStore.property.map.selectedPolygons = homeStore.property.map.selectedPolygons.filter(item => item !== polyId);
}

export const prepareNodeData = (node: PolygonNode) => {
  const homeStore = useHomeStore();

  node.data = { id: node.id, page_url: node.path };
  node.state = {
    checked: false,
    selected: false,
    expanded: true,
    indeterminate: false
  };

  if (node.children) {
    const children = findAll(node.children || [], {});
    const match = totalMatch(
      children.map((x) => x.id),
      homeStore.selectedPolygons
    );
    const indeterminate =
      match === 0 ? false : children.length === 0 ? false : match != children.length;
    node.state = {
      ...node.state,
      indeterminate: indeterminate,
      expanded: match > 0,
      checked: false,
      selected: false
    };
  }

  if (homeStore.selectedPolygons.includes(node.id)) {
    node.state = {
      ...node.state,
      checked: true,
      selected: true,
      expanded: true
    };
  } else if (!homeStore.ancestorPolygons.some((id) => id == node.id)) {
    homeStore.ancestorPolygons.push(node.id);
  }

  if (node.children) {
    node.children.map((childrenNode) => {
      return prepareNodeData(childrenNode);
    });
  }

  return node;
}

export const totalMatch = (needles: string[], haystack: string[]) => {
  let i = 0;
  haystack.forEach((x) => {
    if (needles.includes(x)) {
      i += 1;
    }
  });
  return i;
}

export const buildTrunk = (nodes: PolygonNode[]) => {
  if (nodes && nodes.length) {
    let trunk = [];
    for (let i = 1; i <= 3; i++) {
      trunk.push(getTrunkByLevel(nodes, i));
    }
    return trunk;
  }
  return [[], [], []];
}

export const getTrunkByLevel = (nodes: PolygonNode[], maxLevel: number) => {
  let data = [];
  for (let i = 0; i < nodes.length; i++) {
    let currentNode = { ...nodes[i] };
    delete currentNode.children;
    if (
      nodes[i].children?.length &&
      ((maxLevel < 3 && currentNode.zoom < maxLevel) || maxLevel === 3)
    ) {
      currentNode.children = getTrunkByLevel(
        nodes[i].children || [],
        maxLevel
      );
    }
    data.push(currentNode);
  }
  return data;
}

export const clearAllSelected = () => {
  eventBus.emit(CLEAR_ALL_FILTERS)
}

export const onNeighborhoodClicked = (node: PolygonNode) => {
  console.log(node);
  const homeStore = useHomeStore();

  if (!(node.id in homeStore.selectedPolygons)) {
    checkPolygon(node.id);
  }

  return false;
}

function findItemById(arr: PolygonNode[], id: string): PolygonNode | null {
  for (const item of arr) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function findAll(items: PolygonNode[], condition: Partial<PolygonNode["state"]>): PolygonNode[] {
  let result: PolygonNode[] = [];

  for (const item of items) {
    // Check if the item meets the condition for its state object
    const isMatch = Object.entries(condition).every(
      ([key, value]) => item.state[key as keyof PolygonNode["state"]] === value
    );

    if (isMatch) {
      result.push(item);
    }

    // Recursively search in children, if they exist
    if (item.children) {
      result = result.concat(findAll(item.children, condition));
    }
  }

  return result;
}