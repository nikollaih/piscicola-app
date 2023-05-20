import { StyleSheet } from "react-native";
import Theme from '../../theme/theme';

export default StyleSheet.create({
    ...Theme,
    dropdown: {
        ...Theme.dropdown,
        marginBottom: 10
    }
})