import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Fish from '../../assets/images/fish.png';
import {Constants} from '../../util';

export const ProductItem = ({navigation, orientation}) => {
  const getCustomStyle = () => {
    return {
      width: orientation == 'horizontal' ? 160 : undefined,
      marginRight: orientation == 'horizontal' ? 10 : 0,
      marginBottom: orientation == 'horizontal' ? 0 : 10,
    };
  };

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={[{...getCustomStyle()}]}
      onPress={() => {navigation.navigate("ProductDetail")}}>
      <View>
        <View style={Style.inside}>
          <View style={Style.container_image}>
            <Image source={Fish} style={Style.fish} />
          </View>
          <Text style={Style.text_pond}>Estanque 1</Text>
          <Text style={Style.text_name}>Mojarra Roja</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  text_pond: {
    color: Constants.COLORS.WHITE,
    fontSize: 12,
    fontFamily: 'RobotoCondensed-Regular',
  },
  text_name: {
    color: Constants.COLORS.WHITE,
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 17
  },
  inside: {
    backgroundColor: Constants.COLORS.SOFT_YELLOW,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  product_title: {
    color: Constants.COLORS.DARK,
    marginTop: 5,
    fontFamily: 'RobotoCondensed-Regular',
  },
  fish: {
    width: 40,
    height: 40,
  },
  container_image: {
    backgroundColor: Constants.COLORS.WHITE,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 15
  }
});
