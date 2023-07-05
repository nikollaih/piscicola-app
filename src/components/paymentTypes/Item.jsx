import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
  import { PaymentTypeDetails } from "./Details";
  import { useState } from "react";
  import { Constants } from "../../util";
  import { CustomModal } from "../customModal/customModal";
  import Theme from "../../theme/theme";
  const { height } = Dimensions.get("window");
  
  export const PaymentTypeItem = ({ navigation, paymentType, onDelete = () => {} }) => {
    const [showModal, setShowModal] = useState(false);
  
    const onRemove = () => {
      setShowModal(false);
      onDelete()
    }
  
    return (
      <TouchableOpacity
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        style={Style.container}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <View>
          <View style={Style.inside}>
            <View>
              <Text style={Style.text_name}>{paymentType.name}</Text>
              <Text style={Style.text_paymentType}>{paymentType.description}</Text>
            </View>
          </View>
        </View>
        <CustomModal
          height={height - 350}
          title={paymentType.name}
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <PaymentTypeDetails
            onClose={() => setShowModal(false)}
            onDelete={() => onRemove()}
            navigation={navigation}
            paymentType={paymentType}
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
    text_paymentType: {
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
      ...Theme.row,
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
  });
  