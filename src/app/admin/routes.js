import CoursesScreen from "./courses";
import PwStoreScreen from "./pw-store";
import DashboardScreen from "./dashboard";
import QuickLearningScreen from "./quick-learning";

export const routes = [
  {
    path: "/quick-learning",
    component: QuickLearningScreen,
  },
  {
    path: "/courses",
    component: CoursesScreen,
  },
  {
    path: "/pw-store",
    component: PwStoreScreen,
  },
  {
    path: "/dashboard",
    component: DashboardScreen,
  },
];
