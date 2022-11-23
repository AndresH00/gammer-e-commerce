import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { map } from "lodash";
import colors from "../../styles/colors";

export default function AddressList(props) {
  const { addresses } = props;
  console.log(addresses);
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
            <Button mode="contained" color={colors.primary}>
              Edit
            </Button>
            <Button mode="contained" color={colors.primary}>
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
