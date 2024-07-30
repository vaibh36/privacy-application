import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";
import AccountDeletion from "./AccountDeletion";

const routeConfig = createBrowserRouter([
  {
    path: "/",
    element: <PrivacyPolicy />,
  },
  {
    path: "/account-deletion-request",
    element: <AccountDeletion />,
  },
]);

function App() {
  return <RouterProvider router={routeConfig} />;
}

export default App;
