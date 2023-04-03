import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import {CustomModal} from '../customModal/customModal';
  import {EquipmentDetails} from './Details';
  import {useState} from 'react';
  import Theme from '../../theme/theme';
  import {Constants} from '../../util';
  const {height} = Dimensions.get('window');
  
  export const EquipmentItem = props => {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <TouchableOpacity
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        style={Style.container}
        onPress={() => {
          setShowModal(true);
        }}>
        <View>
          <Text style={Style.inside_subtitle}>Sensor de temperatura</Text>
          <Text style={Style.text}>2023/03/21</Text>
        </View>
        <Text style={[Style.text_red, Style.font_roboto_bold]}>$2.000.000</Text>
        <CustomModal
          height={height - 600}
          title="Sensor de temperatura"
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <EquipmentDetails />
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
  