import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './src/routes/auth';
import Routes from './src/routes/main';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {AuthProvider} from './src/context/AuthContext';
import {FormProvider} from './src/context/FormContext';

const Stack = createStackNavigator();

/* Loading the font for the icons. */
Ionicon.loadFont();

/* Concatenating the AuthRoutes and Routes arrays into one array. */
const concatedScreens = AuthRoutes.concat(Routes);

/**
 * It takes an array of objects, each object having a name, screen, and options property, and returns
 * an array of Stack.Screen components
 * @param {any} screensListing - This is an array of objects that contains the name of the screen, the
 * screen component, and the options for the screen.
 * @returns An array of Stack.Screen components
 */
const getRoutesScreens = (screensListing: any) => {
  return screensListing.map(
    (screen: {name: string; screen: any; options: {}}) => {
      return (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.screen}
          options={screen.options}
        />
      );
    },
  );
};

function Router() {
  return (
    <AuthProvider>
      <FormProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Switch">
            {getRoutesScreens(concatedScreens)}
          </Stack.Navigator>
        </NavigationContainer>
      </FormProvider>
    </AuthProvider>
  );
}

export default Router;
