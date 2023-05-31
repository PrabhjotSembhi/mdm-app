import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/user.context";
const FBLogin = () => {
  const { userAuth, setUserAuth, setBusinessAccountId } =
    useContext(UserContext);

  const getIGBusinessAccID = () => {

    axios
      .get(
        `https://graph.facebook.com/v16.0/me/accounts?fields=instagram_business_account&access_token=${userAuth.authResponse.accessToken}`
      )
      .then((response) => {
        const accounts = response.data.data;
        setBusinessAccountId(accounts[0].instagram_business_account.id); // Retrieve the Business Account ID of the first account
        console.log(userAuth);

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin =  () => {
    window.FB.login(
      function (response) {
        setUserAuth(response);
      },
      {
        scope:
          "user_posts, instagram_basic,instagram_manage_insights,pages_show_list",
      }
    );

  };

  return (
    <>
      <button onClick={handleLogin}>LOGIN</button>
      {
        userAuth? (<button onClick={getIGBusinessAccID}>GET IG ID</button>): ""
      }
    </>
  );
};

export default FBLogin;
