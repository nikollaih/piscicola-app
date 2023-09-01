import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SupplyStockItem } from "./Item";
import { SuppliesStockServices } from "../../../services";
import { LocalStorage, Constants, Utilities } from "../../../util";
import moment from "moment";

export const SuppliesStockList = ({
  supply,
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

  // Get the fish listing
  const getSupplies = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await SuppliesStockServices.get(
        loggedUser.token,
        supply?.id
      );

      console.log("Supplies: ", response)

      let jsonResponse = await response.json();
      if (response.status == 200) {
        setSupplies(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          console.log("numero: ", countAPICalls)
          if(countAPICalls < 3){
            countAPICalls++;
            await refreshToken({ force: true, navigation: navigation });
            getSupplies();
          }
          else {
            console.log("Usuario inválido: ", loggedUser);
          }
        } else Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      Utilities.showAlert({});
    }
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "supplyStock") {
      getSupplies();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <SupplyStockItem
        supply={supply}
        onDelete={() => getSupplies()}
        supplyStock={item}
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
