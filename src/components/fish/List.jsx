import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { FishItem } from "./Item";
import { useEffect, useState } from "react";
import { FishServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { NoDataFound } from "../noDataFound/noDataFound";
import { Constants, LocalStorage, Utilities } from "../../util";
import { Dropdown } from "react-native-element-dropdown";

export const FishList = ({ navigation, productiveUnit = {}, filter }) => {
  const { getAuth, refreshToken } = useAuth();
  const [fish, setFish] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getFish();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getFish = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await FishServices.get(loggedUser, getUsersFilter())
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setFish(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getFish();
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
    return <FishItem onDelete={() => {getFish()}} key={index} navigation={navigation} fish={item} />;
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "fish") {
      getFish();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const getUsersFilter = () => {
    return productiveUnit?.id ? `?productiveUnitId=${productiveUnit.id}` : "";
  };

  const getFilteredData = () => {
    if(filter){
      return fish.filter(f => f.productive_unit.id == filter);
    }
    return fish;
  }

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : getFilteredData(fish).length > 0 ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getFish} />
      }
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={getFilteredData(fish)}
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
