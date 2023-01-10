export default [
  {
    path: "/",
    name: "main",
    component: () => import("@/layouts/main/AppLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/Home.vue")
      },

      // discovery
      {
        path: "/discovery/recommendation",
        name: "discovery_recommendation",
        component: () => import("@/pages/discovery/Recommendation.vue")
      },
    ]
  },
]