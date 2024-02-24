import {View, Text, ScrollView} from 'react-native';
import {Layout} from '../Layout';
import {Breadcrumb} from '../../components/breadcrumb/Breadcrumb';
import { ChartsBiomassesList } from '../../components/biomasses/ChartsBiomassesList';
import Style from './style';

export const ChartsBiomasses = props => {
    const breadcrumb = {
        title: 'Biomasas',
        subtitle: 'Graficas',
        icon: 'ios-add',
        right_content: null
    };

    return (
        <Layout navigation={props.navigation} route={props.route}>
            <ScrollView style={Style.scrollview}>
                <View style={Style.main_page}>
                    <Breadcrumb
                        navigation={props.navigation}
                        data={breadcrumb}
                    />
                    <ChartsBiomassesList
                        sowing={props.route.params.sowing}
                        filter={{start_date: '2023-01-01', end_date: '2024-12-31'}}
                    />
                </View>
            </ScrollView>
        </Layout>
    );
};
