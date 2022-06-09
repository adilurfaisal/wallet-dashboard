const routes = [
  {
    path: "/",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },
  {
    path: "/dashboard",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },
  {
    path: "/receive-crypto",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },
  {
    path: "/storage",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },
  {
    path: "/dapp-store",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },
  {
    path: "/messenger",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },
  {
    path: "/wallet",
    component: () => import("src/layouts/Main-Dashboard.vue"),
    children: [{ path: "", component: () => import("pages/Assets-Page.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
