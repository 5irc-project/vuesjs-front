export default [
  {
    path: "/",
    name: "main",
    component: () => import("@/layouts/main/AppLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/pages/Home.vue")
      }
    ]
  },
]