import { FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SowingItem } from "./Item";
import { SowingsServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";
import { NoDataFound } from "../noDataFound/noDataFound";

export const SowingsList = ({ navigation, orientation = "vertical" }) => {
  const { getAuth, refreshToken } = useAuth();
  const [sowings, setSowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getSowings();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getSowings = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await SowingsServices.get(
        loggedUser.token,
        productiveUnitID
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setSowings(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: navigation });
          //getSowings();
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
    if (updatedScreen == "sowings" || updatedScreen == "sale") {
      getSowings();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <SowingItem
        onDelete={() => getSowings()}
        sowing={item}
        navigation={navigation}
        orientation={orientation}
      />
    );
  };

  if (loading) return <ActivityIndicator color={Constants.COLORS.PRIMARY} />;

  return sowings.length > 0 ? (
    <FlatList
      horizontal={orientation == "horizontal"}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={sowings}
      initialNumToRender={5}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
    />
  ) : (
    <NoDataFound />
  );
};
