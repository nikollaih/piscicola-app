import {View} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { ActuatorsList } from '../../components/actuators/List';
import FormFields from '../../json/forms/Actuator';
import actuatorStructure from '../../json/formsStructure/actuatorStructure';
import {useForm} from '../../hooks/useForm';
import Style from './style';

export const Actuators = props => {
    const {dataForm, setDataForm} = useForm();

    const breadcrumb = {
        title: 'Actuadores',
        subtitle: 'Lista',
        icon: 'ios-add'
    };

    /**
     * It opens the AddActuator screen.
     */
    const openAddActuator = () => {
        FormFields['structure'] = actuatorStructure;
        setDataForm({...dataForm, [FormFields.form_name]: FormFields});
        props.navigation.navigate('AddActuator', {sowing: props.route.params.sowing});
    };

    return (
        <Layout navigation={props.navigation} route={props.route}>
            <View style={Style.main_page}>
                <Breadcrumb
                    onPressRight={() => {
                        openAddActuator();
                    }}
                    navigation={props.navigation}
                    data={breadcrumb}
                />
                <ActuatorsList navigation={props.navigation} sowing={props.route.params.sowing}/>
            </View>
        </Layout>
    );
};
