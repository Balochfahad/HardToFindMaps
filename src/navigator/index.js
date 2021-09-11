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
  Settings,
  History,
  Favorites,
  LocationList,
  LocationDetail,
} from "../containers";
import { createStackNavigator } from "@react-navigation/stack";
// import DrawerNav from './Drawer';
import { store, persistor } from "../store";
import { backImage } from "./navigatorHelper";
import { LoginContext } from "../";
import { reset } from "../services/NavigationService";
import BottomTab from "./Tabs";
import { Colors, Metrics, Fonts, AppStyles, Images } from "../theme";
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
      initialRouteName="login"
    >
      {/*<Stack.Screen name="splash" component={Splash} />*/}
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Registeration}
        options={{ title: "", ...backImage(), headerTransparent: true }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const _customerStack = () => {
  return (
    <Stack.Navigator
    // initialRouteName="setPassword"
    // initialRouteName="SignIn"
    // screenOptions={{}}
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="locations"
        component={LocationList}
        options={{
          title: "Hard to Find Maps",
          ...backImage(),
          headerTitleStyle: {
            fontSize: Metrics.generatedFontSize(20),
            fontFamily: Fonts.Type.Bold,
            color: Colors.primary.white,
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.primary.theme },
        }}
      />
      <Stack.Screen
        name="locationDetail"
        component={LocationDetail}
        options={{
          title: "Details",
          ...backImage(),
          headerTitleStyle: {
            fontSize: Metrics.generatedFontSize(20),
            fontFamily: Fonts.Type.Bold,
            color: Colors.primary.white,
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.primary.theme },
        }}
      />
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
