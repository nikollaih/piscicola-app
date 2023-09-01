import { StyleSheet } from "react-native";
import { Constants } from "../../util";
import Theme from '../../theme/theme';

export default StyleSheet.create({
    ...Theme,
    text_user: {
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Regular"
    },
    name_user: {
        color: Constants.COLORS.DARK,
        fontSize: 28,
        fontFamily: "PassionOne-Regular"
    },
    avatar: {
        width: 50,
        height: 50
    },
    user_container: {
        ...Theme.row_between,
        marginBottom: 20
    },
    refresh_container: {
        alignItems: "center",
        marginBottom: 15
    },
    last_refresh: {
        color: Constants.COLORS.GRAY,
        fontFamily: "RobotoCondensed-Regular"
    },
    refresh_text_button: {
        color: Constants.COLORS.BLUE,
        fontFamily: "RobotoCondensed-Bold",
        fontSize: 16,
        textDecorationLine: "underline",
        marginTop: 5,
        marginHorizontal: 10
    },
    subtitle: {
        ...Theme.subtitle,
        textAlign: "center"
    },
    sell_button: {
        marginTop: 10
    }
})