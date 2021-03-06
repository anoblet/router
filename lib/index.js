import { render } from "lit-html";
import pathToRegexp from "path-to-regexp";
import { installRouter } from "pwa-helpers/router.js";
// Set a default route array, and portal
let globalRoutes = [];
let globalPortal;
const registry = {};
export const setRoutes = (routes) => {
    globalRoutes = routes;
};
export const setPortal = (portal) => {
    globalPortal = portal;
};
export const navigate = (path) => {
    window.history.pushState({}, "", path);
    routeChanged({ location: window.location });
};
/**
 * Route changed
 * @param  location
 * @param  portal    Outlet to serve results
 * @param  routes}   Our route definition file to parse
 * @return
 */
export const routeChanged = async ({ location, portal, routes }) => {
    let matchedRoute;
    portal = portal || globalPortal;
    routes = routes || globalRoutes;
    // Find a matched route
    routes.map((route) => {
        const keys = [];
        const regex = pathToRegexp(route.path, keys);
        const match = regex.exec(location.pathname);
        if (match) {
            match.shift();
            matchedRoute = route;
            matchedRoute.keys = keys;
            const data = {};
            keys.map((key, index) => {
                data[key.name] = match[index];
            });
            matchedRoute.data = data;
        }
    });
    // End find matched route
    if (!matchedRoute) {
        console.log(`Could not find route: ${location.pathname}`);
        // throw new Error(`Could not find route: ${location.pathname}`);
        return;
    }
    // Guard
    const guard = matchedRoute.guard;
    if (guard)
        if (!guard())
            throw new Error("Guard not satisfied");
    // End guard
    // Src
    if (matchedRoute.src)
        await matchedRoute.src();
    // End src
    // Check if the portal exists
    if (!portal)
        throw new Error("Could not find portal");
    // End check if the portal exists
    // Remove children
    while (portal.firstChild) {
        portal.removeChild(portal.firstChild);
    }
    if (matchedRoute.template) {
        const container = document.createElement("div");
        render(await matchedRoute.template, container);
        portal.appendChild(container);
    }
    else {
        const element = registry[location.pathname] ||
            document.createElement(matchedRoute.component);
        registry[location.pathname] = element;
        // Map properties
        matchedRoute.keys.map((key) => {
            element[key.name] = matchedRoute.data[key.name];
        });
        // End map properties
        const loading = document.createElement("loading-component");
        portal.appendChild(loading);
        if (!registry[matchedRoute.component])
            if (element.beforeRender)
                await element.beforeRender();
        portal.removeChild(loading);
        portal.appendChild(element);
        // End replace children
    }
};
export const handleNavigation = routeChanged;
const install = installRouter;
const register = (outlet, routes) => { };
export const router = {
    install,
    register,
    routeChanged,
    setPortal,
    setRoutes,
};
export default router;
export class Router {
    constructor(properties) {
        Object.assign(this, properties);
    }
    install(properties) {
        Object.assign(this, properties);
        installRouter(this.onRouteChange.bind(this));
    }
    navigate(path) {
        window.history.pushState({}, "", path);
        this.onRouteChange({ pathname: path });
    }
    onRouteChange(location) {
        routeChanged({ location, portal: this.outlet, routes: this.routes });
    }
    setOutlet(outlet) {
        this.outlet = outlet;
    }
}
