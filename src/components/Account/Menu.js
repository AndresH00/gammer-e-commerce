import { Alert } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Log out",
      "Confirm that you want to log out",
      [
        {
          text: "NO",
        },
        {
          text: "YES",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>
        <List.Item
          title="Change Name"
          description="Change the name account"
          left={(props) => <List.Icon {...props} icon="alien" />}
          onPress={() => navigation.navigate("change-name")}
        />
        <List.Item
          title="Change Email"
          description="Change the email account"
          left={(props) => <List.Icon {...props} icon="at" />}
          onPress={() => navigation.navigate("change-email")}
        />
        <List.Item
          title="Change Username"
          description="Change the username account"
          left={(props) => <List.Icon {...props} icon="sim" />}
          onPress={() => navigation.navigate("change-username")}
        />
        <List.Item
          title="Change Password"
          description="Change the password account"
          left={(props) => <List.Icon {...props} icon="key" />}
          onPress={() => navigation.navigate("change-password")}
        />
        <List.Item
          title="My Addresses"
          description="Manage shipping addresses"
          left={(props) => <List.Icon {...props} icon="map" />}
          onPress={() => navigation.navigate("addresses")}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title="My Orders"
          description="List of all my orders"
          left={(props) => <List.Icon {...props} icon="clipboard-list" />}
          onPress={() => console.log("My orders")}
        />
        <List.Item
          title="My Favorites"
          description="List of all my favorites"
          left={(props) => <List.Icon {...props} icon="clipboard-list" />}
          onPress={() => navigation.navigate("favorites")}
        />
        <List.Item
          title="Log Out"
          description="Exit this account and log in to a new one"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logoutAccount}
        />
      </List.Section>
    </>
  );
}
