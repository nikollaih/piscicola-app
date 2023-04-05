import { StyleSheet, Dimensions } from "react-native";
import { Constants } from "../util";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    main_page: {
        flex: 1,
        padding: 10,
        marginBottom: 10,
        alignSelf: "stretch",
    },
    scrollview: {
        flex: 1
    },
    row_between: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    row_around: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around"
    },
    row_evenly: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
    },
    safe_area_view: {
        flex: 1
    },
    text_input: {
        flex: 1,
        paddingVertical: 15,
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 16
    },
    container_input: {
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Constants.COLORS.LIGHT_GRAY,
        borderRadius: 5,
        paddingHorizontal: 12,
        marginBottom: 10
    },
    icon_input: {
        width: 30
    },
    icon_show_password: {
        textAlign: "right"
    },
    subtitle: {
        color: Constants.COLORS.DARK,
        marginVertical: 15,
        fontSize: 18,
        fontFamily: "RobotoCondensed-Bold"
    },
    font_roboto_regular: {
        fontSize: 15,
        fontFamily: "RobotoCondensed-Regular",
        color: Constants.COLORS.DARK
    },
    font_roboto_bold: {
        fontSize: 15,
        fontFamily: "RobotoCondensed-Bold",
        color: Constants.COLORS.DARK
    },
    white_container: {
        backgroundColor: Constants.COLORS.WHITE,
        padding: 15,
        borderRadius: 10
    },
    user_container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
    },
    name_user: {
        color: Constants.COLORS.DARK,
        fontSize: 28,
        fontFamily: "PassionOne-Regular"
    },
    text_user: {
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Regular"
    },
    input_label: {
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Regular",
        marginBottom: 5,
        fontSize: 15
    },
    input_inside_container: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: Constants.COLORS.IOS_BACKGROUND_GRAY,
        borderRadius: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Constants.COLORS.LIGHT_GRAY
    },
    input: {
        flex: 1,
        fontFamily: "RobotoCondensed-Regular",
        height: 40
    },
    buttons_container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 40,
        marginBottom: 60
    },
    dropdown: {
        backgroundColor: Constants.COLORS.IOS_BACKGROUND_GRAY,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Constants.COLORS.LIGHT_GRAY,
        height: 40,
    },
    dropdown_item_text: {
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Regular",
    },
    left_button: {
        marginRight: 5
    },
    right_button: {
        marginLeft: 5
    },
    text_red: {
        color: Constants.COLORS.RED,
        fontFamily: "RobotoCondensed-Regular"
    },
    text: {
        fontFamily: "RobotoCondensed-Regular",
        color: Constants.COLORS.DARK,
        fontSize: 15
    },
    inside_subtitle: {
        fontFamily: "RobotoCondensed-Bold",
        fontSize: 18,
        fontWeight: "bold",
        color: Constants.COLORS.DARK,
        marginBottom: 0
    },
    list_container: {
        paddingVertical: 7
    },
    modal: {
        width: width,
        backgroundColor: Constants.COLORS.WHITE,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    },
    modal_buttons: {
        color: Constants.COLORS.PRIMARY,
        fontSize: 15,
        fontWeight: "700"
    },
    modal_header: {
        alignSelf: "stretch",
        borderBottomWidth: 1,
        borderColor: Constants.COLORS.LIGHT_GRAY,
        marginHorizontal: -15,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: "center",
        textAlign: "center"
    },
    title_modal: {
        fontSize: 20,
        color: Constants.COLORS.DARK,
        marginBottom: 15,
        marginTop: 5,
        textAlign: "center",
        fontFamily: "RobotoCondensed-Bold",
    },
    text_datetime: {
        color: Constants.COLORS.DARK,
        paddingVertical: 13
    }
})