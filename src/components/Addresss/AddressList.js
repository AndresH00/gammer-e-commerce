import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import colors from "../../styles/colors";
import { deleteAddressApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";

export default function AddressList(props) {
  const { addresses, setReloadAddress } = props;
  const { auth } = useAuth();
  const navigation = useNavigation();
  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Deleting address",
      `Are you sure you want to delete this address ${address.title}?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => deleteAddress(address._id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAddress(true);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress });
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Text style={styles.title}>{address.name_lastname}</Text>
          <Text style={styles.title}>{address.address}</Text>
          <View style={styles.blockline}>
            <Text style={styles.title}>{address.state}, </Text>
            <Text style={styles.title}>{address.city}, </Text>
            <Text style={styles.title}>{address.postal_code}, </Text>
          </View>
          <Text style={styles.title}>{address.country}</Text>
          <Text style={styles.title}>Phone: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              color={colors.primary}
              onPress={() => goToUpdateAddress(address._id)}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              color={colors.primary}
              onPress={() => deleteAddressAlert(address)}
            >
              Delete
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  address: {
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    paddingBottom: 5,
    fontWeight: "bold",
  },
  blockline: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
