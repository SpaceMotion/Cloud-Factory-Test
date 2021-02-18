import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from './navigation/routes';
import {Home} from './routes/Home';
import {Rates} from './routes/Rates';

const Tab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={Routes.HOME} component={Home} />
        <Tab.Screen name={Routes.RATES} component={Rates} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
