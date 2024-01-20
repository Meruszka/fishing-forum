import { ReactElement } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import LoginScreen from "./components/login/loginScreen.component";
import FishingSpots from "./components/fishingSpots/fishingSpots.component";
import { ApiProvider } from "./providers/api/apiContext.provider";
import UserProfile from "./components/userProfile/userProfile.component";
import NavBar from "./components/navBar/navBar.component";
import { CurrentUserProvider } from "./providers/currentUser/currentUser.provider";
import TopicList from "./components/forum/topicList/topicList";
import TopicPage from "./components/forum/topicPage/topicPage";
import PostPage from "./components/forum/postPage/postPage";
import { WebsocketProvider } from "./providers/websocket/websocket.provider";
import Chat from "./components/chat/chat";
import Contact from "./components/contact/Contact.component";

function Home(): ReactElement {
  return (
    <div className="h-full w-full">
      <NavBar />
      <Outlet />
      <Chat />
    </div>
  );
}

function ErrorBoundry(): ReactElement {
  return (
    <div className="h-screen flex items-center justify-center bg-red-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Error</h1>
        <p className="text-lg">Something went wrong. Please try again later.</p>
        {/* You can add additional information or a button to redirect users */}
      </div>
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} errorElement={<ErrorBoundry />}>
      <Route path="login" element={<LoginScreen />} />
      <Route path="fishing-spots" element={<FishingSpots />} />
      <Route path="" element={<TopicList />} />
      <Route path="forum/topics/:topicId" element={<TopicPage />} />
      <Route path="forum/topics/:topicId/post/:postId" element={<PostPage />} />
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<ErrorBoundry />} />
    </Route>
  )
);

function App(): ReactElement {
  return (
    <>
      <ApiProvider>
        <CurrentUserProvider>
          <WebsocketProvider>
            <RouterProvider router={router} />
          </WebsocketProvider>
        </CurrentUserProvider>
      </ApiProvider>
    </>
  );
}

export default App;
