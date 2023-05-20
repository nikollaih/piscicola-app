import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { UserItem } from "./Item";
import { UsersServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { NoDataFound } from "../noDataFound/noDataFound";
import { Constants, LocalStorage, Texts, Utilities } from "../../util";

export const UsersList = ({ navigation, productiveUnit = {} }) => {
  const { getAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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
      let filter = getUsersFilter();
      let response = await UsersServices.get(loggedUser, filter);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setUsers(jsonResponse.data);
        setLoading(false);
        setRefresh(false);
      } else {
        Utilities.showErrorFecth(jsonResponse);
        setLoading(false);
        setRefresh(false);
      }
    } catch (error) {
      Utilities.showAlert({});
    }
  };

  const getUsersFilter = () => {
    return productiveUnit?.id ? `?productiveUnitId=${productiveUnit.id}` : "";
  };

  const keyExtractor = ({ item }) => {
    return item?.id;
  };

  const renderRow = ({ item, index }) => {
    return (
      <UserItem
        onDelete={() => getUsers()}
        user={(item?.user) ? item.user : item}
        key={index}
        navigation={navigation}
      />
    );
  };

  // Check if it's neccessary to get the listing again
  const checkChanges = async () => {
    const updatedScreen = await LocalStorage.get(
      Constants.LOCALSTORAGE.UPDATED
    );
    if (updatedScreen == "users") {
      getUsers();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  return loading ? (
    <ActivityIndicator color={Constants.COLORS.PRIMARY} />
  ) : users.length > 0 ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getUsers} />
      }
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
  ) : (
    <NoDataFound />
  );
};
