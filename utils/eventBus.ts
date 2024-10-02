import mitt from 'mitt';
export const eventBus = mitt();

export const REPORT_MODAL = 'open report bug modal';
export const DEMO_MODAL = 'open demo modal';