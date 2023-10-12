import CoursesScreen from "./courses";
import LeaderboardScreen from "./leaderboard";
import PWStoreScreen from "./pw-store";
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
    component: PWStoreScreen,
  },
  {
    path: "/leaderboard",
    component: LeaderboardScreen,
  },
];
