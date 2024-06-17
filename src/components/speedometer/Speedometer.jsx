import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
} from "react-native-cool-speedometer";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Constants } from "../../util";
import Theme from "../../theme/theme";
import Alarm from "../../assets/images/alarm.gif";

const { width } = Dimensions.get("screen");

export const CustomSpeedometer = ({ stat }) => {
  const min = stat.step_stat.value_minimun;
  const max = stat.step_stat.value_maximun;

  const getIndicatorColor = () => {
    const value = stat.value;

    if (stat.triggered_alarm || (value < min && min) || (value > max && max))
      return Constants.COLORS.RED;

    if ((value === min && min) || (value === max && max))
      return Constants.COLORS.SOFT_YELLOW;

    if (value && min && max) {
      var rangoVerde = (max - min) * 0.4; // 40% del rango total
      var rangoAmarillo = (max - min) * 0.2; // 20% del rango total
      if (value >= min && value < min + rangoAmarillo) {
        return Constants.COLORS.SECONDARY; // Valor cerca del mínimo, color naranja
      } else if (value <= max && value > max - rangoAmarillo) {
        return Constants.COLORS.SECONDARY; // Valor cerca del máximo, color naranja
      } else if (value >= min + rangoAmarillo && value < min + rangoVerde) {
        return Constants.COLORS.SOFT_YELLOW; // Valor en rango amarillo, color amarillo
      } else if (value <= max - rangoAmarillo && value > max - rangoVerde) {
        return Constants.COLORS.SOFT_YELLOW; // Valor en rango amarillo, color amarillo
      } else {
        return Constants.COLORS.LIVE_GREEN; // Valor en rango verde, color verde
      }
    }

    if (stat.value) return Constants.COLORS.LIVE_GREEN;
  };

  const getMinValue = () => {
    if (stat.value <= min)
      return stat.value - 5;
    if (min)
      return min;
    if (stat.value > 0) return 0;
    return stat.value;
  };

  const getMaxValue = () => {
    if (stat.value >= max)
      return stat.value + 5;
    if (max)
      return max;
    if (stat.value > 0) return stat.value + 5;
    return stat.value;
  };

  const getTitle = () => {
    return stat.step_stat.name ? stat.step_stat.name : stat.step_stat.key;
  };

  return (
    <View style={[Style.container]}>
      {stat.triggered_alarm ? (
        <Image source={Alarm} style={Style.alarm} />
      ) : null}
      <Text style={Style.title}>{getTitle()}</Text>
      <View style={Style.container_value}>
        <Text style={Style.value}>{stat.value}</Text>
      </View>

      <View style={Style.min_max_container}>
        {min ? (
          <Text
            style={Style.min_max_text}
          >{`Min: ${min}`}</Text>
        ) : null}
        {max ? (
          <Text
            style={Style.min_max_text}
          >{`Max: ${max}`}</Text>
        ) : null}
      </View>
      <Speedometer
        height={width / 2 - 30}
        width={width / 2 - 40}
        value={stat.value}
        min={getMinValue()}
        max={getMaxValue()}
        angle={170}
      >
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
        <Progress arcWidth={10} color={getIndicatorColor()} />
        <Marks fontSize={13} step={(getMaxValue() - getMinValue()) / 10} />
      </Speedometer>
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  container: {
    backgroundColor: Constants.COLORS.WHITE,
    flex: 0.49,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: (width / 2 - 30) / 2,
    borderRadius: 10,
    height: width / 2 - 20,
    marginBottom: 10,
  },
  title: {
    ...Theme.font_roboto_bold,
    fontSize: 17,
  },
  value: {
    ...Theme.font_roboto_bold,
    fontSize: 20,
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  alarm: {
    height: 15,
    width: 15,
    marginRight: 10,
    position: "absolute",
    left: 10,
    top: 10,
  },
  container_value: {
    ...Theme.row,
  },
  min_max_container: {
    marginBottom: 10,
  },
  min_max_text: {
    ...Theme.font_roboto_regular,
    textAlign: "center",
    fontSize: 13,
  },
});
