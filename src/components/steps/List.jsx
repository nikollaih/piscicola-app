import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { StepItem } from "./Item";
import { useEffect, useState } from "react";
import { StepsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { Constants, LocalStorage } from "../../util";
import { NoDataFound } from "../noDataFound/noDataFound";

export const StepList = ({ navigation }) => {
  const { getAuth } = useAuth();
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getSteps();
    return unsubscribe;
  }, [navigation]);

  // Get the step listing
  const getSteps = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let filter = getFilters(loggedUser);
      let response = await StepsServices.get(loggedUser.token, filter);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setSteps(jsonResponse.data);
        setLoading(false);
      }
    } catch (error) {

    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <StepItem key={index} navigation={navigation} step={item} />;
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "steps") {
      getSteps();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const getFilters = (loggedUser) => {
    return (loggedUser.productive_unit?.id) ? `?productiveUnitId=${loggedUser.productive_unit.id}` : "";
  }

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : (steps.length > 0) ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getSteps} />
      }
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={steps}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  ) : <NoDataFound />;
};
