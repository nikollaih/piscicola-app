import { FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { TaskLogItem } from "./Item";
import { TaskLogsServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const TaskLogsList = ({ navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [taskLogs, setTaskLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getTaskLogs();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getTaskLogs = async () => {
    const loggedUser = await getAuth();
    const productiveUnitID = loggedUser?.productive_unit?.id;
    try {
      setLoading(true);
      let response = await TaskLogsServices.get(loggedUser.token, productiveUnitID);
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setTaskLogs(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getTaskLogs();
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
    if (updatedScreen == "taskLogs") {
      getTaskLogs();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return <TaskLogItem onDelete={() => getTaskLogs()} taskLog={item} navigation={navigation} />;
  };

  if(loading)
    return <ActivityIndicator color={Constants.COLORS.PRIMARY} />

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={taskLogs}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
