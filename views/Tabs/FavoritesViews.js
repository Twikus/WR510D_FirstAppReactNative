import { View, Text, StyleSheet } from "react-native";

const FavoritesViews = () => {
  return (
    <View style={styles.body}>
      <Text>FavoritesViews</Text>
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

export default FavoritesViews;
