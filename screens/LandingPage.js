import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ImageBackground, Animated } from "react-native";
import { COLORS, FONTS } from "../styles/theme";
import splashImg from "../assets/Logo_Bull.png";

const LandingPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Delay before starting fade out
      setTimeout(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          navigation.navigate("Home");
        });
      }, 3000); // 3 seconds delay before starting fade out
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.imageContainer, opacity: fadeAnim }}>
        <ImageBackground source={splashImg} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 450,
    height: 700,
    resizeMode: "contain",
  },
  imageContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingPage;
