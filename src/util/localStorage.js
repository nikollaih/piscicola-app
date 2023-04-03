import AsyncStorage from '@react-native-async-storage/async-storage'
import { encrypt, decrypt } from 'react-native-simple-encryption'
import Constants from './constants'

export default class LocalStorage {
    /* Encrypting the key and value using the same key. */
    static set = async (key, value) => {
        const cipherKey = encrypt(Constants.CHIPER.KEY, key)
        const cipherValue = encrypt(Constants.CHIPER.KEY, value)
        return await AsyncStorage.setItem(cipherKey, cipherValue);
    }
 
    /* Encrypting the key and then getting the value from the AsyncStorage. */
    static get = async (key) => {
        const cipherkey = encrypt(Constants.CHIPER.KEY, key);
        return await AsyncStorage.getItem(cipherkey);
    }

    /* Encrypting the key and value using the same key. */
    static setObject = async (key, value) => {
        const cipherKey = encrypt(Constants.CHIPER.KEY, key)
        const cipherValue = encrypt(Constants.CHIPER.KEY, encodeURIComponent(JSON.stringify(value).replace(/’/g, Constants.CONFIG.JSON.SIMPLE_QUOTE)))
        return await AsyncStorage.setItem(cipherKey, cipherValue);
    }

    /* Encrypting and decrypting the data. */
    static getObject = async (key) => {
        const cipherkey = encrypt(Constants.CHIPER.KEY, key)
        let response = await AsyncStorage.getItem(cipherkey);
        return response != null ? JSON.parse(decodeURIComponent(decrypt(Constants.CHIPER.KEY, response))) : false;
    }

   /* Removing the key from the AsyncStorage. */
    static remove = async (key) => {
        const cipherKey = encrypt(Constants.CHIPER.KEY, key)
        return await AsyncStorage.removeItem(cipherKey);
    }

    /**
     * It removes all the data from the AsyncStorage.
     */
    static removeAll () {
        AsyncStorage.clear()
    }
}
