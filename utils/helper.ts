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


export const propertyStatusClass = (status: any) => {
    const actives = ['active', 'completed'];
    const pendings = ['pending', 'pending continue to show', 'option pending'];
    const invalids = ['sold', 'withdrawn', 'terminated', 'expired'];

    return {
        'bg-green-500': actives.includes(status ? status.toLowerCase() : null),
        'bg-orange-500': pendings.includes(status ? status.toLowerCase() : null),
        'bg-red-500': invalids.includes(status ? status.toLowerCase() : null),
        'bg-blue-500': ![...actives, ...pendings, ...invalids].includes(status ? status.toLowerCase() : null),
    }
}
