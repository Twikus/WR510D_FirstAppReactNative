import { View, Text, StyleSheet } from "react-native";

const AccountViews = () => {
  return (
    <View style={styles.body}>
      <Text>AccountViews</Text>
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

export default AccountViews;
