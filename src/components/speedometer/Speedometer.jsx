import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
} from 'react-native-cool-speedometer';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Constants} from '../../util';
import Theme from '../../theme/theme';

const {width} = Dimensions.get('screen');

const randomColor = () => {
    const colors = [
        Constants.COLORS.WHATSAPP,
        Constants.COLORS.RED,
        Constants.COLORS.SECONDARY,
        Constants.COLORS.SOFT_YELLOW,
        Constants.COLORS.GREEN
    ]

    return colors[Math.floor(Math.random() * 5)];
}

export const CustomSpeedometer = ({data}) => {
    let color = randomColor();
  return (
    <View style={[Style.container]}>
      <View style={Style.indicator} />
      <Text style={Style.title}>Temperatura</Text>
      <Text style={Style.value}>{data.value + "°"}</Text>
      <Speedometer
        height={width / 2 - 30}
        width={width / 2 - 40}
        value={data.value}
        min={data.min}
        max={data.max}
        angle={170}>
        <Background color={Constants.COLORS.DARK} opacity={1} angle={180} />
        <Arc arcWidth={10} />
        <Needle
          color="white"
          baseWidth={1}
          offset={20}
          baseOffset={0}
          circleRadius={7}
          circleColor={Constants.COLORS.WHITE}
        />
        <Progress arcWidth={10} color={color} />
        <Marks fontSize={13} step={(data.max - data.min) / 10} />
      </Speedometer>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: Constants.COLORS.WHITE,
    flex: 0.49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (width / 2 - 30) / 2,
    borderRadius: 10,
    height: width / 2 - 30,
    marginBottom: 10,
  },
  title: {

  },
  value: {
    ...Theme.font_roboto_bold,
    fontSize: 20,
    marginBottom: 10
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: Constants.COLORS.RED
  }
});
