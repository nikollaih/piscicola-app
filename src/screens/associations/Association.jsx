import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Layout } from "../Layout";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { LabelButton } from "../../components/button/labelButton";
import { AssociationsServices } from "../../services";
import Style from "./style";
import { Constants, Utilities, LocalStorage, Texts } from "../../util";
import { showMessage } from "react-native-flash-message";
import { useAuth } from "../../hooks/useAuth";

export const Association = (props) => {
    const { getAuth, refreshToken } = useAuth();
    const association = props.route.params.association;
    const breadcrumb = {
        title: association.name,
        subtitle: "Asociación",
        icon: "ios-create",
        screen: "EditAssociation",
        right_content: null,
    };

    const onDelete = async () => {
        try {
            let confirmDelete = await Utilities.confirmDelete("Desea eliminar la asociación");
            if (confirmDelete.status) {
                const loggedUser = await getAuth();
                let response = await AssociationsServices.remove(
                    loggedUser.token,
                    association.id
                );
                let jsonResponse = await response.json();
                if (response.status === 200) {
                    onSuccessDelete();
                } else {
                    if (jsonResponse?.message === Constants.CONFIG.CODES.INVALID_TOKEN) {
                        refreshToken({force:true, navigation: props.navigation});
                        await onDelete();
                    } else Utilities.showErrorFecth(jsonResponse);
                }
            }
        } catch (error) {}
    };

    const onSuccessDelete = () => {
        LocalStorage.set(Constants.LOCALSTORAGE.UPDATED, "home");
        showMessage({
            message: Texts.success.title,
            description: Texts.success.porductive_unit.delete,
            duration: 3000,
            type: "success",
        });
        props.navigation.goBack();
    };

    return (
        <Layout navigation={props.navigation} route={props.route}>
            <ScrollView style={Style.main_page}>
                <Breadcrumb navigation={props.navigation} data={breadcrumb} />
                <View style={Style.container_buttons}>
                    <LabelButton
                        onPress={() => {
                            props.navigation.navigate("ProductiveUnits", {
                                association: association,
                            });
                        }}
                        fill={Constants.COLORS.SECONDARY}
                        icon="ios-business"
                        title={"U. productivas (" + association.productive_units.length + ")"}
                        style={{minWidth: 70}}
                    />
                    <LabelButton
                        onPress={() => {
                            props.navigation.replace("EditAssociation", {
                                association: association,
                            });
                        }}
                        icon="ios-create"
                        style={{ marginHorizontal: 5 }}
                        title="Modificar"
                    />
                    <LabelButton
                        onPress={() => {
                            onDelete();
                        }}
                        fill={Constants.COLORS.RED}
                        icon="ios-trash"
                        title="Eliminar"
                    />
                </View>
                <View style={Style.white_container}>
                    <View style={Style.list_container}>
                        <Text style={Style.inside_subtitle}>Correo Electrónico</Text>
                        <Text style={Style.text}>{(association.email) ? association.email : "Sin registro"}</Text>
                    </View>
                    <View style={Style.list_container}>
                        <Text style={Style.inside_subtitle}>Teléfono</Text>
                        <Text style={Style.text}>{(association.phone) ? association.phone : "Sin registro"}</Text>
                    </View>
                    <View style={Style.list_container}>
                        <Text style={Style.inside_subtitle}>Celular</Text>
                        <Text style={Style.text}>{(association.mobile_phone) ? association.mobile_phone : "Sin registro"}</Text>
                    </View>
                    <View style={Style.list_container}>
                        <Text style={Style.inside_subtitle}>Ubicación</Text>
                        <Text style={Style.text}>{association.address}</Text>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
};
