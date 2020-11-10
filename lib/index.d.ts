import { TemplateResult } from "lit-html";
export declare const setRoutes: (routes: any) => void;
export declare const setPortal: (portal: any) => void;
export declare const navigate: (path: string) => void;
/**
 * Route changed
 * @param  location
 * @param  portal    Outlet to serve results
 * @param  routes}   Our route definition file to parse
 * @return
 */
export declare const routeChanged: ({ location, portal, routes }: any) => Promise<void>;
export declare const handleNavigation: ({ location, portal, routes }: any) => Promise<void>;
export declare const router: {
    install: (locationUpdatedCallback: (location: Location, event: Event) => void) => void;
    register: (outlet: HTMLElement, routes: any) => void;
    routeChanged: ({ location, portal, routes }: any) => Promise<void>;
    setPortal: (portal: any) => void;
    setRoutes: (routes: any) => void;
};
export default router;
/**
 * @deprecated
 */
export interface Route {
    path: string;
    component: string;
    src?: any;
    template?: TemplateResult;
}
export interface RouteInterface {
    path: string;
    component: string;
    src?: any;
    template?: TemplateResult;
}
export interface RouterInterface {
    outlet?: HTMLElement;
    routes?: Route[];
}
export declare class Router {
    outlet: HTMLElement;
    routes: Route[];
    constructor(properties?: RouterInterface);
    install(properties?: RouterInterface): void;
    navigate(path: string): void;
    onRouteChange(location: any): void;
    setOutlet(outlet: HTMLElement): void;
}
