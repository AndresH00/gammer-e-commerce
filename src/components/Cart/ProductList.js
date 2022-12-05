import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import Product from "./Product";
import { getProductApi } from "../../api/product";

export default function ProductList(props) {
  const { cart, products, setProducts, setReloadCart } = props;

  useEffect(() => {
    setProducts(null);
    (async () => {
      const productTemp = [];

      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
      }
      setProducts(productTemp);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Products:</Text>
      {!products ? (
        <ScreenLoading text="Loading Car" size="large" />
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
