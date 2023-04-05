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
import { Constants } from "../../util";
import { CustomModal } from "../customModal/customModal";
const { height } = Dimensions.get("window");

export const FilterDates = ({ onCancel = () => {}, onFilter = () => {} }) => {
  const [filterData, setFilterData] = useState({
    start_date: new Date(),
    end_date: new Date(),
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
          onFilter(selectedFilters);
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
