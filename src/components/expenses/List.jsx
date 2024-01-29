import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { GeneralExpenseItem } from "./Item";
import { GeneralExpensesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";
import moment from "moment";
import { Text } from "react-native-animatable";

export const GeneralExpensesList = ({
  navigation,
  allowEdit = true,
  filters = false,
  refresh,
  setFinishRefresh = () => {}
}) => {
  let countAPICalls = 0;
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
  }, [navigation, filters]);

  const getDefaultDateFilter = () => {
    return filters?.manualCreatedAtStart
      ? filters
      : {
          manualCreatedAtStart:
            moment(
              Utilities.changeDateFormatForAPI({
                date: new Date(),
                format: Constants.DATETIME_FORMATS.DATE,
              }),
              Constants.DATETIME_FORMATS.DATETIME
            )
              .subtract(1, "month")
              .format(Constants.DATETIME_FORMATS.DATE) + " 00:00:00",
          manualCreatedAtEnd:
            Utilities.changeDateFormatForAPI({
              date: new Date(),
              format: Constants.DATETIME_FORMATS.DATE,
            }) + " 23:59:59",
        };
  };

  // Get the fish listing
  const getGeneralExpenses = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await GeneralExpensesServices.get(
        loggedUser.token,
        productiveUnitID,
        getDefaultDateFilter()
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setGeneralExpenses(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          if(countAPICalls < 3){
            countAPICalls++;
            await refreshToken({ force: true, navigation: navigation });
            getGeneralExpenses();
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
    if (updatedScreen == "generalExpenses") {
      getGeneralExpenses();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <GeneralExpenseItem
        allowEdit={allowEdit}
        onDelete={() => getGeneralExpenses()}
        generalExpense={item}
        navigation={navigation}
      />
    );
  };

  // Refresh the listing
  if (refresh) {
    setFinishRefresh();
    getGeneralExpenses();
  }

  if (loading) return <ActivityIndicator color={Constants.COLORS.PRIMARY} />;

  return (
    <View>
      {allowEdit ? (
        <View>
          <Text style={Style.title_filter}>{`Mostrando gastos`}</Text>
          <Text style={Style.dates_filter}>{`Desde: ${moment(
            getDefaultDateFilter().manualCreatedAtStart
          ).format(Constants.DATETIME_FORMATS.DATE)}    Hasta: ${moment(
            getDefaultDateFilter().manualCreatedAtEnd
          ).format(Constants.DATETIME_FORMATS.DATE)}`}</Text>
        </View>
      ) : null}
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
