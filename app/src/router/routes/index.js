import main from "./main";
import unauthorized from "./unauthorized";

export default [
  {
    path: '/',
    redirect: '/home'
  },
  ...main,
  ...unauthorized
];