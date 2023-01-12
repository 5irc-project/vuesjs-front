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

      // match
      {
        path: "/match",
        name: "match",
        component: () => import("@/pages/Match.vue")
      },
      {
        path: "/discovery",
        name: "discovery",
        component: () => import("@/pages/Discovery.vue")
      },

      // playlist
      {
        path: "/playlists",
        name: "playlists",
        component: () => import("@/pages/Playlists.vue")
      },
      {
        path: "/profil",
        name: "profil",
        component: () => import("@/pages/Profil.vue")
      },
    ]
  },
]