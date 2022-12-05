import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { addProductCartApi } from "../../api/cart";
import Toast from "react-native-root-toast";

export default function Buy(props) {
  const { product, quantity } = props;

  const addProductCart = async () => {
    const response = await addProductCartApi(product._id, quantity);
    if (response) {
      Toast.show("Product added to cart", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("Error while adding product to cart", {
        position: Toast.positions.CENTER,
      });
    }
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
