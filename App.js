import { useState, useMemo, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";
import AppNavigation from "./src/navigation/AppNavigation";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token";

export default function App() {
  const [auth, sethAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        console.log("Estoy Logeado");
        console.log(token);
        console.log(jwtDecode(token).id);
        sethAuth(token);
      } else {
        sethAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    console.log("LOGIN APP.JS");
    setTokenApi(user.jwt);
    sethAuth({
      token: user.jwt,
      user: user.user._id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      sethAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      {auth ? (
        <View
          style={{
            flex: 1,
            marginTop: 40,
            justifyContent: "flex-start",
          }}
        >
          <Button title="Log out" onPress={authData.logout} />
        </View>
      ) : null}
      <PaperProvider>{auth ? <AppNavigation /> : <AuthScreen />}</PaperProvider>
    </AuthContext.Provider>
  );
}
