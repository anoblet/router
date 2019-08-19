Router

API:

  * target - Target node to output response
  * routes - Route definition array
  * callback - Callback on route change

Objectives:
  * Take a location and return the appropriate component/html template
  * Update the target node with the correct information

```
export const routes = [
  {
    path: "",
    component: "page-home",
    src: () => import("../PageHome/PageHome")
  },
  {
    path: "/post/:action/:id?",
    component: "post-controller",
    src: () => import("../../post/PostController")
  }
];
```

```
new Router({
  outlet: document.createElement("div"),
  routes: [new Route(), new Route()],
  onRouteChange: () => alert("hi")
})
```
