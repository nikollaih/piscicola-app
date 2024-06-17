import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { GeneralExpenseDetails } from "./Details";
import { useState } from "react";
import { Constants } from "../../util";
import { CustomModal } from "../customModal/customModal";
import Theme from "../../theme/theme";
import moment from "moment";
const { height } = Dimensions.get("window");

export const GeneralExpenseItem = ({
  navigation,
  generalExpense,
  allowEdit = true,
  onDelete = () => {},
}) => {
  const [showModal, setShowModal] = useState(false);

  const onRemove = () => {
    setShowModal(false);
    onDelete();
  };

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={Style.container}
      onPress={() => {
        if (allowEdit) setShowModal(true);
      }}
    >
      <View>
        <View style={Style.inside}>
          <View>
            <Text style={Style.text_name}>{generalExpense.concept}</Text>
            <Text style={Style.text_generalExpense}>
              {moment(generalExpense.manual_created_at).format(Constants.DATETIME_FORMATS.DATETIME)}
            </Text>
          </View>
          <View>
            <Text style={[Style.text_generalExpense, Style.value]}>
              ${generalExpense.cost.toLocaleString("Es-es")}
            </Text>
          </View>
        </View>
      </View>
      <CustomModal
        height={height - 350}
        title={generalExpense.name}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <GeneralExpenseDetails
          onClose={() => setShowModal(false)}
          onDelete={() => onRemove()}
          navigation={navigation}
          generalExpense={generalExpense}
        />
      </CustomModal>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    marginBottom: 10,
  },
  text_generalExpense: {
    color: Constants.COLORS.DARK,
    fontSize: 14,
    fontFamily: "RobotoCondensed-Regular",
  },
  text_name: {
    color: Constants.COLORS.DARK,
    fontFamily: "RobotoCondensed-Bold",
    fontSize: 17,
  },
  inside: {
    ...Theme.row_between,
    backgroundColor: Constants.COLORS.WHITE,
    borderRadius: 20,
    padding: 15,
  },
  product_title: {
    color: Constants.COLORS.DARK,
    marginTop: 5,
    fontFamily: "RobotoCondensed-Regular",
  },
  fish: {
    width: 70,
    height: 70,
  },
  container_image: {
    backgroundColor: Constants.COLORS.WHITE,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginRight: 20,
  },
  value: {
    color: Constants.COLORS.RED,
    fontSize: 16
  }
});
