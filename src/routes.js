import AdminHomeScreen from "./app/admin";
import Login from "./app/login/Login";
import StudentHomeScreen from "./app/students";

export const routes = [
  {
    path: "/",
    component: () => {
      return <>Home Screen</>;
    },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/students/*",
    component: StudentHomeScreen,
    auth: true,
  },
  {
    path: "/admin/*",
    auth: true,
    component: AdminHomeScreen,
  },
];
