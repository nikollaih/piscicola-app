import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { ProductTypeItem } from "./Item";
import { useEffect, useState } from "react";
import { ProductTypesServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { Constants, LocalStorage, Utilities } from "../../util";
import { NoDataFound } from "../noDataFound/noDataFound";

export const ProductTypeList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getProductTypes();
    return unsubscribe;
  }, [navigation]);

  // Get the productType listing
  const getProductTypes = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let filter = getFilters(loggedUser);
      let response = await ProductTypesServices.get(loggedUser.token, filter);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setProductTypes(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getProductTypes();
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

  const renderRow = ({ item, index }) => {
    return (
      <ProductTypeItem
        onDelete={() => {
          getProductTypes();
        }}
        key={index}
        navigation={navigation}
        productType={item}
      />
    );
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "productTypes") {
      getProductTypes();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const getFilters = (loggedUser) => {
    return loggedUser.productive_unit?.id ? loggedUser.productive_unit.id : "";
  };

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : productTypes.length > 0 ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getProductTypes} />
      }
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={productTypes}
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
