export default [
  {
    path: '/',
    name: "unauthorized",
    component: () => import("@/layouts/unauthorized/AppLayout.vue"),
    meta: {
      public: true,
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/pages/Login.vue")
      }
    ]
  },
];