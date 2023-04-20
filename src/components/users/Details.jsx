import {ScrollView, Text, View, StyleSheet} from 'react-native';
import { Utilities } from '../../util';
import Theme from '../../theme/theme';

export const UserDetails = ({user}) => {
  return (
    <ScrollView>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Email</Text>
        <Text style={Style.text}>{Utilities.capitalize(user?.email)}</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Rol</Text>
        <Text style={Style.text}>{Utilities.capitalize(user?.user_type.key)}</Text>
      </View>
      <View style={Style.list_container}>
        <Text style={Style.inside_subtitle}>Fecha de registro</Text>
        <Text style={Style.text}>17/03/2023</Text>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
