import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function Cart() {
  return (
    <View style={styles.container}>
      <Text>Estamos en Cart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
