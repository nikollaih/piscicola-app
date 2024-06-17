import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../../customModal/customModal";
import { SupplyStockDetails } from "./Details";
import { useState } from "react";
import Theme from "../../../theme/theme";
import { Constants } from "../../../util";
import moment from "moment";
const { height } = Dimensions.get("window");

export const SupplyStockItem = ({ supplyStock, navigation, supply, onDelete = () => {} }) => {
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
        setShowModal(true);
      }}
    >
      <View>
        <Text style={Style.inside_subtitle}>{`Cantidad: ${supplyStock?.quantity}`}</Text>
        <Text
          style={Style.text}
        >{`Precio: $${supplyStock?.price.toLocaleString("es-CO")}`}</Text>
      </View>
      <Text style={[Style.text_red, Style.font_roboto_bold]}>
        {moment(supplyStock?.manual_created_at).format(Constants.DATETIME_FORMATS.DATE)}
      </Text>
      <CustomModal
        height={height - 380}
        title={supply.name}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <SupplyStockDetails
          onClose={() => setShowModal(false)}
          onDelete={() => onRemove()}
          supplyStock={supplyStock}
          navigation={navigation}
          supply={supply}
        />
      </CustomModal>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    ...Theme.row_between,
    ...Theme.list_container,
    backgroundColor: Constants.COLORS.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
});
