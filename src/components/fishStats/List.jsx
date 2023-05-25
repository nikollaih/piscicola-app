import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { FishStatsItem } from "./Item";
import { useEffect, useState } from "react";
import { FishStatsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { NoDataFound } from "../noDataFound/noDataFound";
import { Constants, LocalStorage, Utilities } from "../../util";
import { Dropdown } from "react-native-element-dropdown";

export const FishStatsList = ({ navigation, fish = {} }) => {
  const { getAuth, refreshToken } = useAuth();
  const [fishStats, setFishStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getFishStats();
    return unsubscribe;
  }, [navigation]);

  // Get the fishStats listing
  const getFishStats = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await FishStatsServices.get(loggedUser, fish.id)
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setFishStats(jsonResponse.data);
        setLoading(false);
      } 
      else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken(true);
          getFishStats();
        } else
          Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
      }
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <FishStatsItem onDelete={() => {getFishStats()}} key={index} navigation={navigation} fishStats={item} />;
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "fishStats") {
      getFishStats();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : fishStats.length > 0 ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getFishStats} />
      }
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={fishStats}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  ) : (
    <NoDataFound />
  );
};
