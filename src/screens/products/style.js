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
    }
})