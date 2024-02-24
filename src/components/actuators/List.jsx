import { ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { ActuatorItem } from "./Item";
import { BiomassesServices } from "../../services";
import { LocalStorage, Constants, Utilities } from "../../util";

export const ActuatorsList = ({ navigation, sowing }) => {
    const { getAuth, refreshToken } = useAuth();
    const [actuators, setActuators] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            checkChanges();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        getActuators();
        return unsubscribe;
    }, [navigation]);

    // Get the fish listing
    const getActuators = async () => {
        const loggedUser = await getAuth();
        try {
            setLoading(true);
            let filters = { sowing };
            let response = await BiomassesServices.get(loggedUser, filters);
            let jsonResponse = await response.json();
            if (response.status === 200) {
                setActuators(jsonResponse.data);
                setLoading(false);
            } else {
                if (jsonResponse?.error_code === Constants.CONFIG.CODES.INVALID_TOKEN) {
                    await refreshToken({ force: true, navigation: navigation });
                    await getActuators();
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
        if (updatedScreen === "actuators") {
            await getActuators();
            await LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
        }
    };

    const onChangeState = (state) => {
        alert(state)
    }

    const keyExtractor = ({ index }) => {
        return index;
    };

    const renderRow = ({ item, index }) => {
        return (
            <ActuatorItem
                onDelete={() => getActuators()}
                onChangeState={(state) => onChangeState(state)}
                actuator={item}
                navigation={navigation}
            />
        );
    };

    if (loading) return <ActivityIndicator />;

    return (
        <FlatList
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            data={actuators}
            initialNumToRender={10}
            windowSize={10}
            removeClippedSubviews={false}
            keyExtractor={keyExtractor}
            renderItem={renderRow}
            style={{ borderRadius: 10, overflow: "hidden" }}
        />
    );
};
