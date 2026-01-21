import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import axiosInstance from "./apis/axios";

export default function App() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    axiosInstance.defaults.headers.common["x-user-id"] = "user1";
    setMount(true);
  }, []);

  if (!mount) {
    return <div>Loading...</div>;
  }
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Home />,
        },
      ])}
    />
  );
}
