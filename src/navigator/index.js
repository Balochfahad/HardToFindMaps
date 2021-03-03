import React, { forwardRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Home,
  Login,
  Splash,
  Registeration,
  SearchLocation,
  ForgotPassword,
  Dashboard,
  Profile,
  ChangePassword,
  Settings,
  History,
  Favorites,
  LocationList,
  LocationDetail,
} from "../containers";
import { createStackNavigator } from "@react-navigation/stack";
// import DrawerNav from './Drawer';
import { store, persistor } from "../store";
import { LoginContext } from "../";
import { reset } from "../services/NavigationService";
const Stack = createStackNavigator();

// const _homeStack = () => {
//   return <DrawerNav />;
// };

// const showLanguageScreen = () => {
//   return store.getState().changeLanguage.changeLanguage;
// };

// <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
const SplashStack = () => {
  <Stack.Navigator
    // initialRouteName="setPassword"
    // initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="splash" component={Splash} />
  </Stack.Navigator>;
};

const _loginStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="setPassword"
      // initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Registeration} />

      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const _customerStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="setPassword"
      // initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="profile" component={Profile} />

      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="favorites" component={Favorites} />
      <Stack.Screen name="locations" component={LocationList} />
      <Stack.Screen name="locationDetail" component={LocationDetail} />
    </Stack.Navigator>
  );
};

const rootNavigator = forwardRef((props, ref) => (
  <LoginContext.Consumer>
    {({ isLogin, role_id }) => {
      return (
        <NavigationContainer ref={ref}>
          {isLogin ? _customerStack() : _loginStack()}
        </NavigationContainer>
      );
    }}
  </LoginContext.Consumer>
));
export default rootNavigator;
