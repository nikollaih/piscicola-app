import { StyleSheet } from "react-native";
import Theme from '../../theme/theme';
import { Constants } from '../../util';

export default StyleSheet.create({
    ...Theme,
    scrollview: {
        alignSelf: "stretch",
        backgroundColor: Constants.COLORS.WHITE,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    padding_container: {
        padding: 40
    },
    title: {
        color: Constants.COLORS.PRIMARY,
        fontSize: 25,
        fontFamily: "PassionOne-Regular"
    },
    subtitle: {
        marginBottom: 30,
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 16
    },
    main_container: {
        flex: 1,
        backgroundColor: Constants.COLORS.PRIMARY,
        paddingTop: 80
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: Constants.COLORS.SOFT_YELLOW,
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 50,
        position: "relative",
    },
    inside_circle: {
        position: "absolute"
    },
    primary_circle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Constants.COLORS.PRIMARY,
        top: -10,
        left: 20
    },
    green_circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Constants.COLORS.GREEN,
        top: 50,
        left: -35
    },
    yellow_circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Constants.COLORS.YELLOW,
        top: 110,
        left: 10
    },
    red_circle: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: Constants.COLORS.RED,
        top: 5,
        right: -30
    },
    blue_circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Constants.COLORS.BLUE,
        bottom: 20,
        right: 0
    },
    button_signin: {
        width: 65,
        height: 65,
        borderRadius: 33,
        alignItems: "center",
        justifyContent: "center"
    },
    button_container: {
        marginTop: 30
    },
    text_signin: {
        color: Constants.COLORS.PRIMARY,
        fontWeight: "bold"
    },
    logo: {
        width: 60,
        height: 60
    },
    text_forgot_password: {
        color: Constants.COLORS.PRIMARY,
        alignSelf: "flex-end",
        marginBottom: 10,
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 16,
        marginBottom: 20
    },
    recover_password_item: {
        padding: 20,
        backgroundColor: Constants.COLORS.IOS_BACKGROUND_GRAY,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    recover_password_item_text: {
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 18,
        color: Constants.COLORS.DARK,
        marginTop: 10
    },
    recover_password_item_value: {
        fontFamily: "RobotoCondensed-Bold",
        fontSize: 20,
        color: Constants.COLORS.YELLOW
    }
})