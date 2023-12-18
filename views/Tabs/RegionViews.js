import { View, Text, StyleSheet } from "react-native";

const RegionViews = () => {
  return (
    <View style={styles.body}>
      <Text>RegionViews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegionViews;
