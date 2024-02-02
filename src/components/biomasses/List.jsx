import { ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { BiomasseItem } from "./Item";
import { BiomassesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const BiomassesList = ({ navigation, sowing }) => {
  const { getAuth, refreshToken } = useAuth();
  const [biomasses, setBiomasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getBiomasses();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getBiomasses = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let filters = { sowing };
      let response = await BiomassesServices.get(loggedUser, filters);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setBiomasses(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: navigation });
          getBiomasses();
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
    if (updatedScreen == "biomasses") {
      getBiomasses();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <BiomasseItem
        onDelete={() => getBiomasses()}
        biomasse={item}
        navigation={navigation}
      />
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={biomasses}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
