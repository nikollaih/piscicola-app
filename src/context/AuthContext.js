import React from 'react';
import { LocalStorage, Constants } from '../util';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = React.useState({});

    /**
     * It sets the user object in the local storage.
     * @param user - The user object that you want to store in the local storage.
     * @returns The user object is being returned.
     */
    const setAuth = (user) => {
        LocalStorage.setObject(Constants.LOCALSTORAGE.SESSION, user);
        return true
    };

    /**
     * It gets the session from the local storage.
     * @returns the value of the promise.
     */
    const getAuth = async () => {
        return await LocalStorage.getObject(Constants.LOCALSTORAGE.SESSION);
    }

    const logout = (navigation) => {
        LocalStorage.removeAll();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <AuthContext.Provider value={{ loggedUser, setLoggedUser, setAuth, getAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };