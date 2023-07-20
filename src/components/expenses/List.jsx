import { FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { PaymentTypeItem } from "./Item";
import { GeneralExpensesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const GeneralExpensesList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [generalExpenses, setGeneralExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getGeneralExpenses();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getGeneralExpenses = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await GeneralExpensesServices.get(loggedUser.token, productiveUnitID);
      let jsonResponse = await response.json();
      console.log(jsonResponse)
      if (response.status == 200) {
        setGeneralExpenses(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getGeneralExpenses();
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
    if (updatedScreen == "generalExpenses") {
      getGeneralExpenses();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <PaymentTypeItem onDelete={() => getGeneralExpenses()} paymentType={item} navigation={navigation} />;
  };

  if(loading)
    return <ActivityIndicator color={Constants.COLORS.PRIMARY} />

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={generalExpenses}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
