import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SupplyItem } from "./Item";
import { SuppliesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";
import moment from "moment";
import { Text } from "react-native-animatable";

export const SuppliesList = ({
  navigation,
  filters = false,
}) => {
  let countAPICalls = 0;
  const { getAuth, refreshToken } = useAuth();
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getSupplies();
    return unsubscribe;
  }, [navigation, filters]);

  const getDefaultDateFilter = () => {
    return filters
      ? filters
      : "?page=1&perPage=100&includeDeletes=false";
  };

  // Get the fish listing
  const getSupplies = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await SuppliesServices.get(
        loggedUser.token
      );

      let jsonResponse = await response.json();

      if (response.status === 200) {
        setSupplies(jsonResponse.payload.data);
        setLoading(false);
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          if(countAPICalls < 3){
            countAPICalls++;
            await refreshToken({ force: true, navigation: navigation });
            getSupplies();
          }
          else {}
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
    if (updatedScreen == "supply") {
      getSupplies();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <SupplyItem
        onDelete={() => getSupplies()}
        supply={item}
        navigation={navigation}
      />
    );
  };

  if (loading) return <ActivityIndicator color={Constants.COLORS.PRIMARY} />;

  return (
    <View>
      <FlatList
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        data={supplies}
        initialNumToRender={10}
        windowSize={10}
        removeClippedSubviews={false}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
        style={{ borderRadius: 10, overflow: "hidden" }}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  title_filter: {
    fontFamily: "RobotoCondensed-Bold",
    textAlign: "center",
    fontSize: 16,
  },
  dates_filter: {
    fontFamily: "RobotoCondensed-Regular",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
});
