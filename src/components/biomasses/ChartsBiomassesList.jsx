import { FlatList, ActivityIndicator } from "react-native";
import { ProductHistoryItem } from "../products/historyItem";
import {BiomassesServices, SowingsServices} from "../../services";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Constants, Texts, Utilities } from "../../util";
import moment from "moment";
import { NoDataFound } from "../noDataFound/noDataFound";

export const ChartsBiomassesList = ({
                                       navigation,
                                       sowing,
                                       filter,
                                       setFilter,
                                   }) => {
    const { getAuth, refreshToken } = useAuth();
    const [statsHistory, setStatsHistory] = useState({});
    const [biomasses, setBiomasses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(biomasses.length > 0){ getStatsHistory(); }
        else { getBiomasses();}
    }, [setFilter, biomasses]);

    // Get the fish listing
    const getBiomasses = async () => {
        const loggedUser = await getAuth();
        try {
            setLoading(true);
            let filters = { sowing };
            let response = await BiomassesServices.get(loggedUser, filters);
            let jsonResponse = await response.json();
            if (response.status === 200) {
                setBiomasses(transformBiomasses(jsonResponse.data.reverse()));
            } else {
                if (jsonResponse?.error_code === Constants.CONFIG.CODES.INVALID_TOKEN) {
                    await refreshToken({ force: true, navigation: navigation });
                    await getBiomasses();
                } else Utilities.showErrorFecth(jsonResponse);
            }
        } catch (error) {
            Utilities.showAlert({});
        }
    };

    const transformBiomasses = (biomassesJson) => {
        let tempBiomasses = [];
        if(biomassesJson.length > 0){
            for (let i = 0; i < biomassesJson.length; i++){
                tempBiomasses.push({value: biomassesJson[i]["approximate_weight"], created_at: biomassesJson[i]["created_at"]});
            }
        }
        return tempBiomasses;
    }

    const getFilters = (stats = []) => {
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
    };

    const keyExtractor = ({ index }) => {
        return index;
    };

    const getStatsHistory = async () => {
        try {
            setLoading(true);
            setStatsHistory([]);
            const loggedUser = await getAuth();
            const statsKeys = await getStatsKeys();
            const filters = getFilters(statsKeys);
            const HAS_VALID_FILTERS = hasValidFilters(filters);

            if (HAS_VALID_FILTERS.status) {
                let response = await SowingsServices.getStatsHistory(
                    loggedUser.token,
                    filters
                );
                let jsonResponse = await response.json();


                if (response.status === 200) {
                    let stats = jsonResponse.stats;
                    let biomassesStats = {"Biomasas": biomasses}

                    setStatsHistory({...biomassesStats, ...stats});
                }
                else if (
                    jsonResponse?.error_code === Constants.CONFIG.CODES.INVALID_TOKEN
                ) {
                    refreshToken({ force: true, navigation: navigation });
                    getStatsHistory();
                } else Utilities.showErrorFecth(jsonResponse);
            }
            else
                Utilities.showAlert({ text: HAS_VALID_FILTERS.text, title: "Error" })
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const hasValidFilters = (filters) => {
        const { keys, start_date, end_date } = filters;
        if (keys.length <= 0) return { status: false, text: Texts.error.stats_history_no_keys };
        if (moment(end_date).isBefore(moment(start_date))) return { status: false, text: Texts.error.stats_history_date_mismatch };
        return { status: true };
    };

    const getStatsKeys = async () => {
        try {
            let statsKeys = [];
            const loggedUser = await getAuth();
            let response = await SowingsServices.getSowingCurrentStats(
                loggedUser.token,
                sowing.id
            );
            let jsonResponse = await response.json();
            if (response.status === 200)
                return (statsKeys = jsonResponse.map((stat) => stat.key));
            else {
                if (jsonResponse?.error_code === Constants.CONFIG.CODES.INVALID_TOKEN) {
                    refreshToken({ force: true, navigation: navigation });
                    getStatsKeys();
                } else Utilities.showErrorFecth(jsonResponse);
            }
        } catch (error) {
            Utilities.showAlert();
        }
    };

    const renderRow = ({ item }) => {
        return (
            <ProductHistoryItem
                data={{ key: item, data: statsHistory[item] }}
                key={item.id}
                navigation={navigation}
            />
        );
    };

    if (loading) return <ActivityIndicator color={Constants.COLORS.PRIMARY} />;
    if (!loading && Object.keys(statsHistory).length <= 0) return <NoDataFound />;
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
