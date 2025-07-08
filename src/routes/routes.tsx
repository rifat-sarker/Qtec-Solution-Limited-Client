import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../error-page";
import HomePage from "../pages/Home/Home";
import { ProductDetailPage } from "../components/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export default router;
