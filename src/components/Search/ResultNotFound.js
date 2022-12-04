import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ResultNotFound(props) {
  const { search } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Result Not Found for {search}.</Text>
      <Text style={styles.otherText}>
        Check your spelling or use more specific terms
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  otherText: {
    fontSize: 14,
    paddingTop: 5,
  },
});
