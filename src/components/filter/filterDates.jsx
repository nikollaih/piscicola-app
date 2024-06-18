import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicon from "react-native-vector-icons/Ionicons";
import { FillIconButton } from "../button/fillIconButton";
import moment from "moment";
import Theme from "../../theme/theme";
import { Constants, Utilities } from "../../util";
import { CustomModal } from "../customModal/customModal";
const { height } = Dimensions.get("window");

export const FilterDates = ({ onCancel = () => {}, onFilter = () => {} }) => {
  // Fecha de inicio
  let end_date = new Date();

// Crear una nueva fecha basada en start_date
  let start_date = new Date(end_date);

// Restar un mes a la fecha
  start_date.setDate(end_date.getDate() - 30);
  end_date.setDate(end_date.getDate() + 1);

// Si la nueva fecha es inválida, ajustar
  if (start_date.getDate() !== end_date.getDate()) {
    start_date.setDate(0); // Esto establecerá la fecha al último día del mes anterior
  }

  const [filterData, setFilterData] = useState({
    start_date: start_date,
    end_date: end_date,
  });
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <CustomModal
      height={height - 320}
      title="Filtrar"
      showModal={true}
      onClose={() => {
        onCancel();
      }}
    >
      <TouchableOpacity
        style={[Style.container]}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          setSelectedFilter("start_date");
          setOpen(true);
        }}
      >
        <View style={Style.row}>
          <Text style={Style.input_label}>{"Desde:"}</Text>
        </View>
        <View style={[Style.input_inside_container]}>
          <Ionicon
            name={"ios-calendar"}
            size={17}
            style={Style.icon_input}
            color={Constants.COLORS.GRAY}
          />
          <Text style={Style.text_datetime}>
            {moment(filterData.start_date).format(
              Constants.DATETIME_FORMATS.DATE
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Style.container]}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {
          setSelectedFilter("end_date");
          setOpen(true);
        }}
      >
        <View style={Style.row}>
          <Text style={Style.input_label}>{"Hasta:"}</Text>
        </View>
        <View style={[Style.input_inside_container]}>
          <Ionicon
            name={"ios-calendar"}
            size={17}
            style={Style.icon_input}
            color={Constants.COLORS.GRAY}
          />
          <Text style={Style.text_datetime}>
            {moment(filterData.end_date).format(
              Constants.DATETIME_FORMATS.DATE
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <FillIconButton
        style={{ marginTop: 20 }}
        icon="ios-filter"
        title={"Filtrar"}
        onPress={() => {
          let selectedFilters = {
            start_date: moment(filterData.start_date).format(
              Constants.DATETIME_FORMATS.DATE
            ),
            end_date: moment(filterData.end_date).format(
              Constants.DATETIME_FORMATS.DATE
            ),
          };

          if (
            moment(selectedFilters.start_date).isAfter(
              moment(selectedFilters.end_date)
            )
          )
            Utilities.showAlert({
              text: "La fecha inicial no puede ser mayor",
            });
          else onFilter(selectedFilters);
        }}
      />
      {open ? (
        <DatePicker
          style={[Style.input]}
          modal
          mode="date"
          open={open}
          date={filterData[selectedFilter]}
          onConfirm={(date) => {
            setFilterData({
              ...filterData,
              [selectedFilter]: date,
            });
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </CustomModal>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    height: 80,
  },
});
