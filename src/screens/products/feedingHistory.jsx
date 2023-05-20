import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { FeedList } from '../../components/feedHistory/List';
import FormFields from '../../json/forms/Feed';
import feedStructure from '../../json/formsStructure/feedStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const FeedHistory = props => {
  const productiveUnit = props.route.params?.productive_unit;
  const {dataForm, setDataForm} = useForm();

  const breadcrumb = {
    title: 'Historial de alimentación',
    subtitle: 'Mojarra Roja',
    icon: 'ios-add'
  };

  /**
   * It opens the AddFeed screen.
   */
  const openAddFeed = () => {
    FormFields['structure'] = feedStructure;
    setDataForm({...dataForm, [FormFields.form_name]: FormFields});
    props.navigation.navigate('AddFeed');
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          onPressRight={() => {
            openAddFeed();
          }}
          navigation={props.navigation}
          data={breadcrumb}
        />
        <FeedList productiveUnit={productiveUnit} navigation={props.navigation} />
      </View>
    </Layout>
  );
};
