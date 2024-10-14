import Cookies from "js-cookie";

export const getErrorMessage = (errObj: any) => {
    const errResponse = errObj.response || null;
    const errorMessage =
        errResponse && errResponse.data.error
            ? errResponse.data.error.message
            : errObj.statusText
                ? "Something went wrong Please try again"
                : "Something went wrong Please try again";
    return errorMessage;
};

export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

export const storeUserSession = (token: string, user: any) => {
    Cookies.set("access-token", token);

    localStorage.setItem("user", JSON.stringify(user));
};

export const deleteUserSession = () => {
    Cookies.remove("access-token");
};

export const updateStorageValue = (key: string, value: any) => {
    const record = localStorage.getItem("user");

    if (record) {
        const existing = JSON.parse(record);
        existing[key] = value;
        localStorage.setItem("user", JSON.stringify(existing));
    }
};

export const propertyStatusColor = (status: any) => {
    const actives = ['active', 'completed'];
    const pendings = ['pending', 'pending continue to show', 'option pending'];
    const invalids = ['sold', 'withdrawn', 'terminated', 'expired'];

    return {
        'badge-success': actives.includes(status ? status.toLowerCase() : null),
        'badge-warning': pendings.includes(status ? status.toLowerCase() : null),
        'badge-danger': invalids.includes(status ? status.toLowerCase() : null),
        'badge-info': ![...actives, ...pendings, ...invalids].includes(status ? status.toLowerCase() : null),
    }
}
