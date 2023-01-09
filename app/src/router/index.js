import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

// import { useUserStore } from '@/store/modules/user';
// import { ROLES } from "./utils/enums";

// const appUserAuthentication = !!document.env.VUE_APP_USER_AUTHENTICATION && document.env.VUE_APP_USER_AUTHENTICATION === "true";

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// TODO: add directy inside routes
/*router.beforeEach((to, from, next) => {
  if(appUserAuthentication === false) {
    next();
    return;
  }

  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  if(!to.meta.public && !isLoggedIn) {
    next('/login');
    return;
  }

  if(to.meta.authorize) {
    if(!userStore.isAuthorized(to.meta.authorize)) {
      next('/login');
      return;
    }
  }

  next();
});*/

export default router;
