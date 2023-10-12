import AdminHomeScreen from "./app/admin";
import StudentHomeScreen from "./app/students";

export const routes = [
  {
    path: "/",
    component: () => {
      return <>Home Screen</>;
    },
  },
  {
    path: "/students/*",
    component: StudentHomeScreen,
  },
  {
    path: "/admin/*",
    component: AdminHomeScreen,
  },
];
