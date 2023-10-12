import CoursesScreen from "./courses";
import PwStoreScreen from "./pw-store";
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
];
