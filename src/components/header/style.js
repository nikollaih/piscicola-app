import { Constants } from "../../util";
import { StyleSheet } from "react-native";
import Theme from '../../theme/theme';

export default StyleSheet.create({
    container: {
        alignSelf: "stretch",
        padding: 10,
        backgroundColor: Constants.COLORS.IOS_BACKGROUND_GRAY,
        ...Theme.row_between
    }
})