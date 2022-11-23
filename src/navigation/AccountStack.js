import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Addresses from "../screens/Account/Addresses";
import AddAddress from "../screens/Account/AddAddress";
import colors from "../styles/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="account-settings"
        component={Account}
        options={{ title: "Account", headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{ title: "Change name and last name" }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{ title: "Change email" }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{ title: "Change username" }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{ title: "Change password" }}
      />
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{ title: "My Addresses" }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{ title: "New Address" }}
      />
    </Stack.Navigator>
  );
}
