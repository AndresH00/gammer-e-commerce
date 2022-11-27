import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import { getAddressesApi } from "../../api/address";
import AddressList from "../../components/Addresss/AddressList";
import useAuth from "../../hooks/useAuth";

export default function Addresses() {
  const [addresses, setAddresses] = useState(null);
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [reloadAddress, setReloadAddress] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
        setReloadAddress(false);
      })();
    }, [reloadAddress])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tittle}>My Addresses</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("add-address")}
      >
        <View style={styles.addAdress}>
          <Text style={styles.addAddressText}>Add address</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </TouchableWithoutFeedback>
      {!addresses ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}> Create your first Address</Text>
      ) : (
        <AddressList
          addresses={addresses}
          setReloadAddress={setReloadAddress}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tittle: {
    fontSize: 20,
  },
  addAdress: {
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
