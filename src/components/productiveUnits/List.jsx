import { FlatList, ActivityIndicator } from "react-native";
import { ProductiveUnitItem } from "./Item";
import { useEffect, useState } from "react";
import { ProductiveUnitsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { Constants, LocalStorage } from "../../util";

export const ProductiveUnitsList = ({
  navigation,
  refresh,
  setFinishRefresh = () => {},
}) => {
  const { getAuth, refreshToken } = useAuth();
  const [productiveUnits, setProductiveUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getProductiveUnits();
    return unsubscribe;
  }, [navigation]);

  // Get the productive units listing
  const getProductiveUnits = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await ProductiveUnitsServices.get(loggedUser.token);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setProductiveUnits(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken(true);
          getProductiveUnits();
        } else Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
      }
    } catch (error) {
      Utilities.showAlert({});
      setLoading(false);
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  // Render a PU row
  const renderRow = ({ item }) => {
    return (
      <ProductiveUnitItem
        key={item.id}
        navigation={navigation}
        productiveUnit={item}
      />
    );
  };

  // Refresh the listing
  if (refresh) {
    setFinishRefresh();
    getProductiveUnits();
  }

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "home") {
      getProductiveUnits();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={productiveUnits}
      initialNumToRender={5}
      numColumns={2}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
    />
  );
};
