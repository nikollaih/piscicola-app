import React from "react";
import { LocalStorage, Constants } from "../util";
import { AuthServices, ProductiveUnitsServices } from "../services";
import moment from "moment";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = React.useState({});

  /**
   * It sets the user object in the local storage.
   * @param user - The user object that you want to store in the local storage.
   * @returns The user object is being returned.
   */
  const setAuth = (user, login) => {
    LocalStorage.setObject(Constants.LOCALSTORAGE.LOGIN, login);
    LocalStorage.setObject(Constants.LOCALSTORAGE.SESSION, user);
    return true;
  };

  /**
   * It gets the session from the local storage.
   * @returns the value of the promise.
   */
  const getAuth = async () => {
    await refreshToken();
    return await LocalStorage.getObject(Constants.LOCALSTORAGE.SESSION);
  };

  /**
   * This async function can be used to refresh the authentication token for the logged-in user.
   * It retrieves the user's session and login objects from local storage, and checks if the current time is past the token's expiration time.
   * If the token has expired, it calls the AuthServices.login function with the user's login credentials to obtain a new token, and updates the authentication credentials using the setAuth function.
   */
  const refreshToken = async (force = false) => {
    let loggedUser = await LocalStorage.getObject(
      Constants.LOCALSTORAGE.SESSION
    );
    let login = await LocalStorage.getObject(Constants.LOCALSTORAGE.LOGIN);
    let currentTime = moment().format(Constants.DATETIME_FORMATS.TIMEZONE);

    if (currentTime > loggedUser.expires_at || force) {
      let response = await AuthServices.login(login.email, login.password);
      if (response.status == 200) {
        let jsonResponse = await response.json();
        onSuccessLogin(jsonResponse, login)
      }
    }
  };

  const onSuccessLogin = async (user, login) => {
    if (user?.profile?.user_type_id != Constants.USERS_TYPES.ADMIN) {
      let productiveUnit = await getProductiveUnit(user);
      if (productiveUnit == false || productiveUnit?.data.length <= 0)
        logout();
      else {
        user["productive_unit"] = productiveUnit.data[0];
        setAuth(user, login);
      }
    } else {
      setAuth(user, login);
    }
  };

  const getProductiveUnit = async (user) => {
    try {
      let response = await ProductiveUnitsServices.get(user.token);
      let jsonResponse = await response.json();
      return response.status == 200 ? jsonResponse : false;
    } catch (error) {
      return false;
    }
  };

  const logout = (navigation) => {
    LocalStorage.removeAll();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        setAuth,
        getAuth,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
