import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function Favorite(props) {
  const { product } = props;

  const addProductFavorite = () => {
    console.log("Add to Favorite");
    console.log(product.title);
  };

  return (
    <Button
      mode="contained"
      contentStyle={styles.btnAddFavoritesContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={addProductFavorite}
    >
      Add to Favorite
    </Button>
  );
}

const styles = StyleSheet.create({
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
