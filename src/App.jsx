import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./routes";
import Header from "./app/shared/Header/Header";
import { useSelector } from "react-redux";

const AuthenticatedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user) || {};
  console.log(user?.[0], user, {});
  if (Object.keys(user?.[0] || user || {}).length <= 1) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const createRoutes = (routes) =>
  routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        route.auth ? (
          <AuthenticatedRoute>
            <route.component />
          </AuthenticatedRoute>
        ) : (
          <route.component />
        )
      }
    >
      {route.children ? createRoutes(route.children) : ""}
    </Route>
  ));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });
  return (
    <div className="App h-full">
      <QueryClientProvider client={queryClient}>
        {/* <Suspense fallback={<FullScreenLoader />}> */}
        <BrowserRouter>
          <Header />
          <div className="h-[75px]"></div>
          <div className="h-[calc(100vh-75px)]">
            <Routes>{createRoutes(routes)}</Routes>
          </div>
        </BrowserRouter>
        {/* </Suspense> */}
      </QueryClientProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
