import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import FishTank from '../../assets/images/fish_tank.png';
import {PondDetails} from './Details';
import {useState} from 'react';
import {Constants} from '../../util';
import {CustomModal} from '../customModal/customModal';
import Theme from '../../theme/theme';
const {height} = Dimensions.get('window');

export const PondItem = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
      style={Style.container}
      onPress={() => {
        setShowModal(true);
      }}>
      <View>
        <View style={Style.inside}>
          <View style={Style.container_image}>
            <Image source={FishTank} style={Style.fish} />
          </View>
          <View>
            <Text style={Style.text_name}>Estanque 1</Text>
            <Text style={Style.text_pond}>Tamaño: 2.000L</Text>
            <Text style={Style.text_pond}>Medidad: 3x5 mts</Text>
            <Text style={Style.text_pond}>Estado: Mantenimiento</Text>
            <Text style={Style.text_pond}>Producto: Cosecha 1</Text>
          </View>
        </View>
      </View>
      <CustomModal
        height={height - 400}
        title="Estanque 1"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <PondDetails />
      </CustomModal>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    marginBottom: 10,
  },
  text_pond: {
    color: Constants.COLORS.DARK,
    fontSize: 14,
    fontFamily: 'RobotoCondensed-Regular',
  },
  text_name: {
    color: Constants.COLORS.DARK,
    fontFamily: 'RobotoCondensed-Bold',
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
    fontFamily: 'RobotoCondensed-Regular',
  },
  fish: {
    width: 70,
    height: 70,
  },
  container_image: {
    backgroundColor: Constants.COLORS.WHITE,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginRight: 20,
  },
});
