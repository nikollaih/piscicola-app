import { FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { UserItem } from "./Item";
import { UsersServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { Constants, LocalStorage, Utilities } from "../../util";

export const UsersList = ({
  navigation,
  refresh,
  setFinishRefresh = () => {},
}) => {
  const { getAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getUsers();
    return unsubscribe;
  }, [navigation]);

  // Get the productive units listing
  const getUsers = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await UsersServices.get(loggedUser.token);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setUsers(jsonResponse.data);
        setLoading(false);
      }
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  const keyExtractor = ({ item }) => {
    return item?.id;
  };

  const renderRow = ({ item, index }) => {
    return <UserItem user={item} key={index} navigation={navigation} />;
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
    if (updatedScreen == "users") {
      getProductiveUnits();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={users}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
