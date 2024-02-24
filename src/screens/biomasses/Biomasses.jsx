import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { BiomassesList } from '../../components/biomasses/List';
import {RightButtonsBiomasses} from '../../components/biomasses/rightButtons'
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Biomasses = props => {
  const breadcrumb = {
    title: 'Biomasas',
    subtitle: 'Lista',
    icon: 'ios-add',
    right_content: (
        <RightButtonsBiomasses
            navigation={props.navigation}
            sowing={props.route.params.sowing}
        />
    ),
  };

  return (
    <Layout navigation={props.navigation} route={props.route}>
      <View style={Style.main_page}>
        <Breadcrumb
          navigation={props.navigation}
          data={breadcrumb}
        />
        <BiomassesList navigation={props.navigation} sowing={props.route.params.sowing}/>
      </View>
    </Layout>
  );
};
