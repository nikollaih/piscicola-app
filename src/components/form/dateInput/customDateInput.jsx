import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import Theme from '../../../theme/theme';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Constants} from '../../../util';
import {useForm} from '../../../hooks/useForm';
import DatePicker from 'react-native-date-picker';

export const CustomDateInput = ({data, formName}) => {
  const {dataForm, setDataForm, checkRequired} = useForm();
  const [open, setOpen] = useState(false);

  useEffect(() => {
  }, []);

  /**
   * If the required field is not filled out, return a red border color. Otherwise, return a light gray
   * border color
   * @returns A function that returns a color.
   */
  const getBorderColor = () => {
    return checkRequiredField()
      ? Constants.COLORS.RED
      : Constants.COLORS.LIGHT_GRAY;
  };

  /**
   * It checks if the field is required and if the field is empty or null and if the form is required
   */
  const checkRequiredField = () => {
    return (
      data?.validate?.required &&
      (dataForm[formName].structure[data.name] == '' ||
        dataForm[formName].structure[data.name] == null) &&
      checkRequired[formName]
    );
  };

  return (
    <TouchableOpacity 
        style={[{marginBottom: data?.bottom ? data.bottom : 20}]}
        activeOpacity={Constants.CONFIG.BUTTON_OPACITY}
        onPress={() => {setOpen(true)}}
    >
      <View style={Style.row}>
        <Text style={Style.input_label}>{data.title}</Text>
        {data?.validate?.required ? <Text style={Style.text_red}> *</Text> : null}
      </View>
      <View
        style={[Style.input_inside_container, {borderColor: getBorderColor()}]}>
        {data?.icon ? (
          <Ionicon
            name={data.icon}
            size={17}
            style={Style.icon_input}
            color={Constants.COLORS.GRAY}
          />
        ) : null}
        {open ? (
          <DatePicker
            modal
            open={open}
            date={dataForm[formName].structure[data.name]}
            onConfirm={date => {
              setDataForm({
                [formName]: {
                  ...dataForm[formName],
                  structure: {
                    ...dataForm[formName].structure,
                    [data.name]: date,
                  },
                },
              });
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        ) : null}
        <Text style={Style.text_datetime}>
          {moment(dataForm[formName].structure[data.name]).format(data.format)}
        </Text>
      </View>
      {checkRequiredField() ? (
        <Text style={Style.text_red}>Por favor complete este campo</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ...Theme,
  text_datetime: {
    color: Constants.COLORS.DARK,
    flex: 1,
  },
});
