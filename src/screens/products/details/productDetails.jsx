import {View, Text, ScrollView, FlatList} from 'react-native';
import {Layout} from '../../Layout';
import Avatar from '../../../assets/images/avatar.png';
import Style from './style';
import {CustomSpeedometer} from '../../../components/speedometer/Speedometer';
import {Constants} from '../../../util';
import {RoundIconButton} from '../../../components/button/roundIconButton';

const data = [
  {
    min: 10,
    max: 30,
    value: 15,
  },
  {
    min: 0,
    max: 100,
    value: 65,
  },
  {
    min: 40,
    max: 60,
    value: 58,
  },
  {
    min: 0,
    max: 100,
    value: 65,
  },
  {
    min: 10,
    max: 80,
    value: 34,
  },
  {
    min: 35,
    max: 70,
    value: 69,
  },
];

export const ProductDetail = props => {
  const keyExtractor = ({index}) => {
    return index;
  };

  const renderRow = ({item, index}) => {
    return <CustomSpeedometer key={index} data={item} />;
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <ScrollView style={Style.scrollview}>
        <View style={Style.main_page}>
          <View style={Style.user_container}>
            <View>
              <Text style={Style.text_user}>Estanque 1</Text>
              <Text style={Style.name_user}>Mojarra Roja</Text>
            </View>
          </View>
          <View style={Style.actions}>
            <RoundIconButton
              title="Vender"
              icon="ios-cart"
              fill={Constants.COLORS.WHATSAPP}
            />
            <RoundIconButton
              title="Alimento"
              icon="md-fast-food"
              fill={Constants.COLORS.SOFT_YELLOW}
            />
            <RoundIconButton
              title="Medicamento"
              icon="ios-medkit"
              fill={Constants.COLORS.RED}
            />
            <RoundIconButton
              title="Insumo"
              icon="ios-flask"
              fill={Constants.COLORS.BLUE}
            />
          </View>
          <Text style={Style.subtitle}>Mediciones</Text>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            data={data}
            initialNumToRender={5}
            windowSize={10}
            removeClippedSubviews={false}
            numColumns={2}
            keyExtractor={keyExtractor}
            renderItem={renderRow}
          />
          <Text style={Style.subtitle}>Detalles</Text>
          <View style={Style.white_container}>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Etapa</Text>
              <Text style={Style.text}>Alevinaje</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Cantidad de peces</Text>
              <Text style={Style.text}>2000</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Estanque</Text>
              <Text style={Style.text}>Estanque 1</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Producto</Text>
              <Text style={Style.text}>Mojarra Roja</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Fecha de creación</Text>
              <Text style={Style.text}>2023/02/21 04:35 PM</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Días de producción (Hasta hoy)</Text>
              <Text style={Style.text}>32</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Última Alimentación</Text>
              <Text style={Style.text}>2023/02/21 04:35 PM</Text>
            </View>
            <View style={Style.list_container}>
              <Text style={Style.inside_subtitle}>Último Medicamento</Text>
              <Text style={Style.text}>2023/02/21 04:35 PM - Acetaminofen</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
