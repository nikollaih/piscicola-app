import { StyleSheet } from "react-native";
import { Constants } from "../../util";
import Theme from '../../theme/theme';

export default StyleSheet.create({
    ...Theme,
    avatar: {
        width: 50,
        height: 50
    },
    container_products: {
        backgroundColor: Constants.COLORS.WHITE,
        marginHorizontal: -10,
        padding: 10
    }
})