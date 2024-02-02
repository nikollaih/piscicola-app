import { ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SaleItem } from "./Item";
import { SaleServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const SalesList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getSales();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getSales = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await SaleServices.get(loggedUser, loggedUser.productive_unit.id);
      let jsonResponse = await response.json();

      if (response.status == 200) {
        setSales(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: navigation });
          getSales();
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
    if (updatedScreen == "sale") {
      getSales();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <SaleItem
        onDelete={() => getSales()}
        sale={item}
        navigation={navigation}
      />
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={sales}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
