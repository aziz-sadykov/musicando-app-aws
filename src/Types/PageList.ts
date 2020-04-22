import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type PageParamList = {
  HomePage: undefined;
  EventsPage: undefined;
  MusiciansPage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
  ModalEvent: undefined;
  Modal: {
    screen: keyof PageParamList;
  };
};

export type Route = RouteProp<PageParamList, keyof PageParamList>;

export type PageNavProps<T extends keyof PageParamList> = {
  navigation: StackNavigationProp<PageParamList, T>;
  route: Route;
};
