import { FlatList, ActivityIndicator } from "react-native";
import { AssociationItem } from "./Item";
import { useEffect, useState } from "react";
import { AssociationsServices } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import {Constants, LocalStorage, Utilities} from "../../util";

export const AssociationsList = ({
    navigation,
    refresh,
    setFinishRefresh = () => {},
}) => {
    const { getAuth, refreshToken } = useAuth();
    const [associations, setAssociations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            checkChanges();
        });

        // Return the function to unsubscribe from the event, so it gets removed on unmount
        getAssociations();
        return unsubscribe;
    }, [navigation]);

    // Get the productive units listing
    const getAssociations = async () => {
        const loggedUser = await getAuth();
        try {
            setLoading(true);
            let response = await AssociationsServices.get(loggedUser.token);
            let jsonResponse = await response.json();

            if (response.status === 200) {
                setAssociations(jsonResponse.payload.data);
                setLoading(false);
            } else {
                if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
                    refreshToken({force:true, navigation: navigation});
                    await getAssociations();
                } else Utilities.showErrorFecth(jsonResponse);
                setLoading(false);
            }
        } catch (error) {
            Utilities.showAlert({});
            setLoading(false);
        }
    };

    const keyExtractor = ({ index }) => {
        return index;
    };

    // Render a PU row
    const renderRow = ({ item }) => {
        return (
            <AssociationItem
                key={item.id}
                navigation={navigation}
                association={item}
            />
        );
    };

    // Refresh the listing
    if (refresh) {
        setFinishRefresh();
        getAssociations();
    }

    // Check if it's neccessary to get the listing again
    const checkChanges = async () => {
        const updatedScreen = await LocalStorage.get(
            Constants.LOCALSTORAGE.UPDATED
        );
        if (updatedScreen == "home") {
            getAssociations();
            LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "");
        }
    };

    return loading ? (
        <ActivityIndicator color={Constants.COLORS.PRIMARY} />
    ) : (
        <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            data={associations}
            initialNumToRender={5}
            numColumns={2}
            windowSize={10}
            removeClippedSubviews={false}
            keyExtractor={keyExtractor}
            renderItem={renderRow}
        />
    );
};
