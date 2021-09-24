import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then(data => {
        if (data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    })
}

export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(routes => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        // 递归处理
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmtRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve) {
                require(['../views/' + component + '.vue'], resolve);
            }
        }
        fmtRoutes.push(fmtRouter);
    })
    return fmtRoutes;
}