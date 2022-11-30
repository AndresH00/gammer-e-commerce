import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function Buy(props) {
  const { product, quantity } = props;

  const addProductCart = () => {
    console.log("Add to Cart");
    console.log(product.title + " " + quantity);
  };

  return (
    <Button
      mode="contained"
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={addProductCart}
    >
      Add to cart
    </Button>
  );
}

const styles = StyleSheet.create({
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
