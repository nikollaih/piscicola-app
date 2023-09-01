import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Theme from "../../../theme/theme";
import Ionicon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { Constants } from "../../../util";
import { useForm } from "../../../hooks/useForm";
import DatePicker from "react-native-date-picker";

export const GeneralDateInput = ({ data, style, onDateChange = () => {} }) => {
  const { dataForm, setDataForm, checkRequired } = useForm();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(data.date);

  useEffect(() => {}, []);

  /**
   * If the required field is not filled out, return a red border color. Otherwise, return a light gray
   * border color
   * @returns A function that returns a color.
   */

  return (
    <TouchableOpacity
      style={[{ marginBottom: 10, flex: 1, ...style }]}
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      onPress={() => {
        setOpen(true);
      }}
    >
      <View style={[Style.input_inside_container]}>
        <Ionicon
          name={"ios-calendar"}
          size={17}
          style={Style.icon_input}
          color={Constants.COLORS.GRAY}
        />
        {open ? (
          <DatePicker
            style={Style.input}
            modal
            open={open}
            mode="date"
            date={data?.date}
            onConfirm={(date) => {
              onDateChange(date);
              setDate(date);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        ) : null}
        <Text style={Style.text_datetime}>
          {moment(date).format(data.format)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  text_datetime: {
    color: Constants.COLORS.DARK,
    flex: 1,
    paddingVertical: 10,
  },
});