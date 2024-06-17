import { FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { PaymentTypeItem } from "./Item";
import { PaymentTypesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const PaymentTypesList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getPaymentTypes();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getPaymentTypes = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await PaymentTypesServices.get(loggedUser.token, productiveUnitID);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setPaymentTypes(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getPaymentTypes();
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
    if (updatedScreen == "paymentTypes") {
      getPaymentTypes();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <PaymentTypeItem onDelete={() => getPaymentTypes()} paymentType={item} navigation={navigation} />;
  };

  if(loading)
    return <ActivityIndicator color={Constants.COLORS.PRIMARY} />

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={paymentTypes}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
