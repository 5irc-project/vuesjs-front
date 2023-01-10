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
      {
        path: "/profil",
        name: "profil",
        component: () => import("@/pages/Profil.vue")
      },
    ]
  },
]