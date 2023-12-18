import { View, Text, StyleSheet } from "react-native";
import OnBoardingViews from "../views/Home/OnBoardingViews";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <OnBoardingViews />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
