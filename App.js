import "react-native-gesture-handler";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import Home from "./src/screens/Home";
import CocktailPage from "./src/screens/CocktailPage";
import AdaptiveText from "./src/components/AdaptiveText";
import PeraltaRegular from "./src/assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "./src/assets/fonts/Lato-Regular.ttf";
import LatoBold from "./src/assets/fonts/Lato-Bold.ttf";
import Ionicons from "@expo/vector-icons/Ionicons";
// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootStack = createStackNavigator();

const App = () => {
  // const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });

  const loadSplashScreen = useCallback(async () => {
    if (fontsLoaded) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    loadSplashScreen();
  }, [loadSplashScreen]);

  if (!fontsLoaded) {
    return null;
  }

  const screenWidth = Dimensions.get("window").width;

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            accessibilityLabel: "Home Screen",
          }}
        />
        <RootStack.Screen
          name="CocktailPage"
          component={CocktailPage}
          options={({ navigation, route }) => ({
            headerTitle: () => (
              <AdaptiveText
                style={{
                  flex: 1,
                  fontFamily: "Peralta-Regular",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  maxWidth: screenWidth - 120,
                  textAlign: "center",
                  lineHeight: 32,
                  paddingVertical: 0,
                }}
                minFontSize={16}
                maxFontSize={32}
              >
                {route.params.cocktail.name}
              </AdaptiveText>
            ),
            headerBackTitleVisible: false,
            headerStyle: {
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTitleStyle: {
              fontSize: 32,
              lineHeight: 32,
              textAlign: "center",
            },
            headerLeft: () => (
              <View style={{ paddingLeft: 24 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
            accessibilityLabel: `Cocktail Page for ${route.params.cocktail.name}`,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
