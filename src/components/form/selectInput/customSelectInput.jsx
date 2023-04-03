import {View, Text, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import Theme from '../../../theme/theme';
import {Constants} from '../../../util';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {useForm} from '../../../hooks/useForm';

export const CustomSelectInput = ({data, formName}) => {
  const {dataForm, setDataForm, checkRequired} = useForm();

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
    <View style={[{marginBottom: data?.bottom ? data.bottom : 20}]}>
      <View style={Style.row}>
        <Text style={Style.input_label}>{data.title}</Text>
        {data?.validate?.required ? <Text style={Style.text_red}> *</Text> : null}
      </View>
      <Dropdown
        style={[Style.dropdown, {borderColor: getBorderColor()}]}
        selectedTextStyle={Style.font_roboto_regular}
        placeholderStyle={Style.font_roboto_regular}
        data={data.items}
        search
        value={dataForm[formName].structure[data.name]}
        labelField={data.item_label}
        valueField={data.item_id}
        placeholder={data.placeholder}
        searchPlaceholder="Buscar..."
        renderLeftIcon={() => {
          return data?.icon ? (
            <Ionicon
              name={data.icon}
              size={17}
              style={Style.icon_input}
              color={Constants.COLORS.GRAY}
            />
          ) : null;
        }}
        onChange={item => {
          setDataForm({
            [formName]: {
              ...dataForm[formName],
              structure: {
                ...dataForm[formName].structure,
                [data.name]: item.id,
              },
            },
          });
        }}
      />
      {checkRequiredField() ? (
        <Text style={Style.text_red}>Por favor complete este campo</Text>
      ) : null}
    </View>
  );
};

const Style = StyleSheet.create({
  ...Theme,
});
