import logo from "./logo.svg";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import SearchInput from "./components/Search/SearchInput";
import AppContent from "./components/AppContent/AppContent";
import Content from "./components/Content/Content";
import Player from "./components/Player/Player";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
  useLoaderData,
} from "react-router-dom";

import MusicController from "./screens/MusicController/MusicController";
import CurrentlyPlaying from "./screens/CurrentlyPlaying/CurrentlyPlaying";

// function RootApp() {
//   const params = useLoaderData();
//   console.log("RootApp, params");
//   console.log(params);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     // const params=searchParams.get("__firebase_request_key")
//     console.log("searchParams");
//     console.log(searchParams);
//     const token = "params";
//     console.log("token");
//     console.log(token);
//     setToken(token);
//   }, []);

//   console.log("token");
//   console.log(token);

//   return (
//     <div>
//       <AppContent>
//         <SearchInput />
//         <Content />
//         {token ? <Player token={token} /> : <></>}
//       </AppContent>
//     </div>
//   );
// }

const router = createBrowserRouter([
  {
    path: "/music",
    element: <CurrentlyPlaying />,
  },
  {
    path: "/*",
    element: <MusicController />,
  },
]);

function App() {
  // useEffect(() => {

  // }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
