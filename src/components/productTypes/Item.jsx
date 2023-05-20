import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CustomModal } from "../customModal/customModal";
import { useState } from "react";
import { ProductTypeDetails } from "./Details";
import Theme from "../../theme/theme";
import { Constants, Utilities } from "../../util";
import moment from "moment";
const { height } = Dimensions.get("window");

export const ProductTypeItem = ({
  productType,
  navigation,
  onDelete = () => {}
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
        setShowModal(true);
      }}
    >
      <View>
        <Text style={Style.inside_subtitle}>
          {Utilities.capitalize(productType.name)}
        </Text>
        <Text style={Style.text}>
          {productType.description
            ? productType.description
            : "Sin descripción"}
        </Text>
      </View>
      <CustomModal
        height={height - 300}
        title={Utilities.capitalize(productType.name)}
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ProductTypeDetails
          onClose={() => {
            setShowModal(false);
          }}
          onDelete={() => {
            onRemove();
          }}
          productType={productType}
          navigation={navigation}
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
