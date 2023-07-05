import { FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { CustomSpeedometer } from "../speedometer/Speedometer";
import { SowingsServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";
import { NoDataFound } from "../noDataFound/noDataFound";

export const StatsList = ({ sowing, reload = false, navigation }) => {
  const { getAuth, refreshToken } = useAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Return the function to unsubscribe from the event so it gets removed on unmount
    getStats();
  }, [reload]);

  // Get the fish listing
  const getStats = async () => {
    setLoading(true);
    const loggedUser = await getAuth();
    try {
      let response = await SowingsServices.getSowingCurrentStats(
        loggedUser.token,
        sowing.id
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        setLoading(false);
        setStats(jsonResponse);
      } else {
        setLoading(false);
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken({force:true, navigation: navigation});
          getStats();
        } else Utilities.showErrorFecth(jsonResponse);
      }
    } catch (error) {
      setLoading(false);
      Utilities.showAlert({});
    }
  };

  const keyExtractor = (sowing) => {
    return sowing.id;
  };

  const renderRow = ({ item }) => {
    return <CustomSpeedometer key={item.id} stat={item} />;
  };

  if(loading)
    return <ActivityIndicator color={Constants.COLORS.PRIMARY} />;

  return stats.length <= 0 ? (
    <NoDataFound />
  ) : (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={stats}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      numColumns={2}
      style={{ borderRadius: 10, overflow: "hidden" }}
    />
  );
};
