async function setHeaders(context) {
    const isExcluded = await context.store.hasItem(`excluded.${context.request.getId()}`);
    console.log(isExcluded);
    if (isExcluded) {
        console.log("[global-headers]: Skipping... request is excluded");
        return false;
    }

    const globalHeaders = await context.request.getEnvironmentVariable("GLOBAL_HEADERS");
    if (!globalHeaders) {
        console.log("[global-headers]: Skipping... no [GLOBAL_HEADERS] present in environment");
        return;
    }

    for (const headerName of Object.keys(globalHeaders)) {
        const headerValue = globalHeaders[headerName];

        if (await context.request.hasHeader(headerName)) {
            console.log("[global-headers]: Skipping... header already set");
            continue;
        }

        await context.request.setHeader(headerName, headerValue);
    }
    console.log("[global-headers]: Set headers");
}

const exclueRequest = {
    label: 'Disable global headers',
    action: async (context, data) => {
        const { request } = data;
        context.store.setItem(`excluded.${request._id}`, "true");
    },
};

const excludeRequestGroup = {
    label: "Disable global headers",
    action: async (context, data) => {
        const { requests } = data;
        for (const request of requests) {
            await context.store.setItem(`excluded.${request._id}`, "true");
        }
    },
};

const includeRequest = {
    label: 'Enable global headers',
    action: async (context, data) => {
        const { request } = data;
        context.store.removeItem(`excluded.${request._id}`);
    }
};

const includeRequestGroup = {
    label: "Enable global headers",
    action: async (context, data) => {
        const { requests } = data;
        for (const request of requests) {
            await context.store.removeItem(`excluded.${request._id}`);
        }
    }
};

exports.requestHooks = [setHeaders];
exports.requestActions = [exclueRequest, includeRequest];
exports.requestGroupActions = [excludeRequestGroup, includeRequestGroup];