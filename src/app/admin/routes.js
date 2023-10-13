import CoursesScreen from "./courses";
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
    path: "/dashboard",
    component: DashboardScreen,
  },
];
