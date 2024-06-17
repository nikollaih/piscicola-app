import { ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { MortalityItem } from "./Item";
import { MortalitiesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const MortalitiesList = ({ navigation, sowing }) => {
  const { getAuth, refreshToken } = useAuth();
  const [mortalities, setMortalities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getMortalities();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getMortalities = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let filters = { sowing };
      let response = await MortalitiesServices.get(loggedUser, filters);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setMortalities(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: navigation });
          getMortalities();
        } else Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
      }
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "mortalities") {
      getMortalities();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <MortalityItem
        onDelete={() => getMortalities()}
        mortality={item}
        navigation={navigation}
      />
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={mortalities}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
