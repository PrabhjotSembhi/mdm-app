import { useEffect, useContext } from "react";
import "./App.css";
import FBLogin from "./components/FBLogin";
import PostAnalytics from "./PostAnalytics";
import { UserContext } from "./context/user.context";


function App() {
  const { userAuth } =
  useContext(UserContext);
  useEffect(() => {
    window.FB.init({
      appId: "232913756100489",
      cookie: true,
      xfbml: true,
      version: "v16.0",
    });
  }, []);
  return (
    <div className="App">
      <FBLogin />
{   userAuth?(<PostAnalytics/>):""}
    </div>
  );
}

export default App;
