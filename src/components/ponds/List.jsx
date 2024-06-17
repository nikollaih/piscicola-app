import {ActivityIndicator, FlatList} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { PondItem } from "./Item";
import { PondsServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const PondsList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getPonds();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getPonds = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await PondsServices.get(loggedUser.token);
      let jsonResponse = await response.json();
      if (response.status === 200) {
        setPonds(jsonResponse.payload.data);
        setLoading(false);
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getPonds();
        } else Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
      }
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  // Check if it's necessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen === "ponds") {
      getPonds();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <PondItem onDelete={() => getPonds()} pond={item} navigation={navigation} />;
  };

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={ponds}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
