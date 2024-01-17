import { ReactElement } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import LoginScreen from "./components/login/loginScreen.component";
import FishingSpots from "./components/fishingSpots/fishingSpots";
import TopicList from "./components/forum/topicList/topicList";
import TopicPage from "./components/forum/topicPage/topicPage";

function Home(): ReactElement {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="login" element={<LoginScreen />} />
      <Route path="fishing-spots" element={<FishingSpots />} />
      <Route path="forum" element={<TopicList />} />
      <Route path="forum/topics/:topicId" element={<TopicPage />} />
    </Route>
  )
);

function App(): ReactElement {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
