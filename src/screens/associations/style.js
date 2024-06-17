import { StyleSheet } from "react-native";
import Theme from '../../theme/theme';

export default StyleSheet.create({
    ...Theme,
    container_buttons: {
        ...Theme.row,
        marginBottom: 20
    }
})