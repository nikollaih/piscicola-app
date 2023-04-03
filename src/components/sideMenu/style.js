import { Constants } from "../../util";
import { StyleSheet } from "react-native";
import Theme from '../../theme/theme';

export default StyleSheet.create({
    ...Theme,
    container: {
        flex: 1,
        backgroundColor: Constants.COLORS.WHITE,
        padding: 10,
    },
    top_container: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    text: {
        color: Constants.COLORS.DARK,
    },
    logo: {
        width: 60,
        height: 60,
    },
    logo_container: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
    },
    name: {
        color: Constants.COLORS.DARK,
        fontSize: 24,
        fontFamily: "PassionOne-Regular",
        marginRight: 10
    },
    name_container: {
        ...Theme.row,
        marginTop: 10
    },
    item_container: {
        ...Theme.row,
        padding: 20,
        borderLeftWidth: 2,
        borderLeftColor: Constants.COLORS.WHITE
    },
    item_icon: {
        width: 40
    },
    item_text: {
        color: Constants.COLORS.DARK,
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 16
    },
    bottom_container: {
        padding: 20,
        height: 90
    }
})