import NativeModal from './nativeModal/nativeModal';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';

export const CustomModal = ({
  height,
  children,
  title,
  showModal = false,
  onClose = () => {},
}) => {
  return (
    <NativeModal
      hideOnBack={true}
      animationIn={'slideInUp'}
      animationInTiming={200}
      animationOutTiming={400}
      isVisible={showModal}
      callBack={() => {
        onClose();
      }}
      style={{marginTop: 0, marginBottom: 0}}>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onClose();
          }}
          style={{height: height}}
        />
        <View style={Style.modal}>
          <Text style={Style.title_modal}>{title}</Text>
          {children}
        </View>
      </View>
    </NativeModal>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
