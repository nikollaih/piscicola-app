import { ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FoodItem } from "./Item";
import { FoodServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const FoodList = ({ navigation, sowing }) => {
  const { getAuth, refreshToken } = useAuth();
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getFood();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getFood = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await FoodServices.get(loggedUser.token, sowing.id);
      let jsonResponse = await response.json();

      if (response.status == 200) {
        setFood(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: navigation });
          getFood();
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
    if (updatedScreen == "food") {
      getFood();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <FoodItem
        onDelete={() => getFood()}
        food={item}
        sowing={sowing}
        navigation={navigation}
      />
    );
  };

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={food}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
