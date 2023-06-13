import { View, FlatList, ActivityIndicator } from "react-native";
import { ProductHistoryItem } from "./historyItem";
import { SowingsServices } from "../../services";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Constants, Utilities } from "../../util";
import moment from "moment";
import { NoDataFound } from "../noDataFound/noDataFound";

export const ProductHistoryList = ({
  navigation,
  sowing,
  filter,
  setFilter,
}) => {
  const { getAuth, refreshToken } = useAuth();
  const [statsHistory, setStatsHistory] = useState({});
  const [loading, setLoading] = useState(false)

  const keyExtractor = ({ index }) => {
    return index;
  };

  useEffect(() => {
    getStatsHistory();
  }, [setFilter]);

  const getFilters = (stats) => {
    return {
      sowing_id: sowing.id,
      keys: stats,
      start_date: moment(filter.start_date).format(
        `${Constants.DATETIME_FORMATS.DATE} 00:00:00`
      ),
      end_date: moment(filter.end_date).format(
        `${Constants.DATETIME_FORMATS.DATE} 23:59:59`
      ),
    };
  }

  const getStatsHistory = async () => {
    try {
      setLoading(true);
      setStatsHistory([]);
      const loggedUser = await getAuth();
      const stats = await getStats();
      const filters = getFilters(stats);

      if (filters.keys.length > 0 && moment(filter.start_date).isBefore(moment(filter.end_date))) {
        let response = await SowingsServices.getStatsHistory(
          loggedUser.token,
          filters
        );
        let jsonResponse = await response.json();
        if (response.status == 200) {
          setStatsHistory(jsonResponse.stats);
        } else {
          if (
            jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN
          ) {
            refreshToken(true);
            getStatsHistory();
          } else Utilities.showErrorFecth(jsonResponse);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getStats = async () => {
    try {
      let statsKeys = [];
      const loggedUser = await getAuth();
      let response = await SowingsServices.getSowingCurrentStats(
        loggedUser.token,
        sowing.id
      );
      let jsonResponse = await response.json();
      if (response.status == 200) {
        jsonResponse.map((stat) => {
          statsKeys.push(stat.key);
        });
        return statsKeys;
      } else {
        if (jsonResponse?.error_code == Constants.CONFIG.CODES.INVALID_TOKEN) {
          refreshToken(true);
          getStats();
        } else Utilities.showErrorFecth(jsonResponse);
      }
    } catch (error) {
      console.log(error)
      Utilities.showAlert();
    }
  };

  const renderRow = ({ item, index }) => {
    return (
      <ProductHistoryItem
        data={{ key: item, data: statsHistory[item] }}
        key={item.id}
        navigation={navigation}
      />
    );
  };

  if(loading)
    return <ActivityIndicator color={Constants.COLORS.PRIMARY} />

  if(!loading && Object.keys(statsHistory).length <= 0)
    return <NoDataFound />

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      data={Object.keys(statsHistory)}
      initialNumToRender={5}
      windowSize={10}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
    />
  );
};
