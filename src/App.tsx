import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from './navigation/routes';
import {About} from './routes/About';
import {Rates} from './routes/Rates';

const Tab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Routes.ABOUT}
        tabBarOptions={{
          labelPosition: 'beside-icon',
        }}>
        <Tab.Screen name={Routes.ABOUT} component={About} />
        <Tab.Screen name={Routes.RATES} component={Rates} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
