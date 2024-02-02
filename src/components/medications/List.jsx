import { ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { MedicationItem } from "./Item";
import { MedicationServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const MedicationsList = ({ navigation, sowing }) => {
  const { getAuth, refreshToken } = useAuth();
  const [medication, setMedication] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkChanges();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    getMedications();
    return unsubscribe;
  }, [navigation]);

  // Get the fish listing
  const getMedications = async () => {
    const loggedUser = await getAuth();
    try {
      setLoading(true);
      let response = await MedicationServices.get(loggedUser.token, sowing.id);
      let jsonResponse = await response.json();

      if (response.status == 200) {
        setMedication(jsonResponse.data);
        setLoading(false);
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          await refreshToken({ force: true, navigation: navigation });
          getMedications();
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
    if (updatedScreen == "medication") {
      getMedications();
      LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
    }
  };

  const keyExtractor = ({ index }) => {
    return index;
  };

  const renderRow = ({ item, index }) => {
    return (
      <MedicationItem
        onDelete={() => getMedications()}
        medication={item}
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
      data={medication}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
