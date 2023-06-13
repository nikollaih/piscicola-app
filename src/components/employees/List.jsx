import { FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { EmployeeItem } from "./Item";
import { EmployeesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const EmployeesList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getEmployees();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getEmployees = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await EmployeesServices.get(loggedUser.token, productiveUnitID);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setEmployees(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken(true);
          getEmployees();
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
    if (updatedScreen == "employees") {
      getEmployees();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <EmployeeItem onDelete={() => getEmployees()} employee={item} navigation={navigation} />;
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={employees}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
