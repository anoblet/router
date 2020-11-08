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
export interface Route {
    path: string;
    component: string;
    src?: any;
}
export declare class Router {
    outlet: HTMLElement;
    routes: Route[];
    constructor(props: {
        outlet: HTMLElement;
        routes: Route[];
    });
    install(): void;
    navigate(path: string): void;
    onRouteChange(location: any): void;
}
export declare const router: {
    install: (locationUpdatedCallback: (location: Location, event: Event) => void) => void;
    register: (outlet: HTMLElement, routes: any) => void;
    routeChanged: ({ location, portal, routes }: any) => Promise<void>;
    setPortal: (portal: any) => void;
    setRoutes: (routes: any) => void;
};
export default router;
