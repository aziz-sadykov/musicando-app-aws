import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PageParamList, Route } from './Types/PageList';
import 'react-native-gesture-handler';
import ConfigStackTag from './config/configStackTag';
import { withTheme } from 'styled-components';
import { Theme } from '../providers/Theme/styled';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faGuitar,
  faGlassCheers,
} from '@fortawesome/free-solid-svg-icons';

import HomePage from '~/pages/HomePage/HomePage';
import EventsPage from '~/pages/EventsPage/EventsPage';
import EventModal from './components/Modals/EventModal';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const Stack = createStackNavigator<PageParamList>();
const StackTab = createBottomTabNavigator<PageParamList>();

interface RoutesProps {
  theme: Theme;
}

const Modal: React.FunctionComponent = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
    <Stack.Screen name="ModalEvent" component={EventModal} />
  </Stack.Navigator>
);

const EventPage: React.FunctionComponent<RoutesProps> = ({ theme }) => (
  <StackTab.Navigator
    initialRouteName="EventsPage"
    tabBarOptions={{
      activeTintColor: theme.colors.light,
      inactiveTintColor: 'gray',
    }}>
    <StackTab.Screen
      name="HomePage"
      component={HomePage}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ size, color }) => (
          <FontAwesomeIcon icon={faHome} size={size} color={color} />
        ),
      }}
    />
    <StackTab.Screen
      name="EventsPage"
      component={EventsPage}
      options={{
        tabBarLabel: 'Events',
        tabBarIcon: ({ size, color }) => (
          <FontAwesomeIcon icon={faGlassCheers} size={size} color={color} />
        ),
      }}
    />
    <StackTab.Screen
      name="MusiciansPage"
      component={EventsPage}
      options={{
        tabBarLabel: 'Musicians',
        tabBarIcon: ({ size, color }) => (
          <FontAwesomeIcon icon={faGuitar} size={size} color={color} />
        ),
      }}
    />
  </StackTab.Navigator>
);

const Routes: React.FunctionComponent<RoutesProps> = ({ theme }) => (
  <NavigationContainer
    theme={{
      dark: false,
      colors: {
        background: theme.colors.backgroundLight,
        border: '#fff',
        card: theme.colors.primary,
        text: theme.colors.light,
        primary: theme.colors.primary,
      },
    }}>
    <Stack.Navigator
      initialRouteName="LoginPage"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />

      <Stack.Screen name="EventsPage" options={{ headerShown: false }}>
        {({ ...props }) => <EventPage {...props} theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default withTheme(Routes);
