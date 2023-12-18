import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import PokedexViews from "../views/Tabs/PokedexViews";
import RegionViews from "../views/Tabs/RegionViews";
import FavoritesViews from "../views/Tabs/FavoritesViews";
import AccountViews from "../views/Tabs/AccountViews";

const DefaultScreen = () => {
  const images = {
    pokedex: require("../assets/img/navbar/pokedex.png"),
    region: require("../assets/img/navbar/region.png"),
    favorites: require("../assets/img/navbar/favorites.png"),
    account: require("../assets/img/navbar/account.png"),
    pokedexActive: require("../assets/img/navbar/pokedex-active.png"),
    regionActive: require("../assets/img/navbar/region-active.png"),
    favoritesActive: require("../assets/img/navbar/favorites-active.png"),
    accountActive: require("../assets/img/navbar/account-active.png"),
  };

  const navigationItems = [
    {
      id: 1,
      label: "Pokedex",

      image: images.pokedex,
      activeImage: images.pokedexActive,
    },
    {
      id: 2,
      label: "Region",
      image: images.region,
      activeImage: images.regionActive,
    },
    {
      id: 3,
      label: "Favorites",
      image: images.favorites,
      activeImage: images.favoritesActive,
    },
    {
      id: 4,
      label: "Account",
      image: images.account,
      activeImage: images.accountActive,
    },
  ];

  const [isActive, setIsActive] = useState(1);

  return (
    <View style={styles}>
      <View style={styles.body}>
        {isActive === 1 ? <PokedexViews /> : null}
        {isActive === 2 ? <RegionViews /> : null}
        {isActive === 3 ? <FavoritesViews /> : null}
        {isActive === 4 ? <AccountViews /> : null}
      </View>

      <View style={styles.footer}>
        {navigationItems.map((item) => (
          <View key={item.id}>
            <TouchableOpacity
              style={styles.footer.once}
              onPress={() => setIsActive(item.id)}
            >
              <Image
                style={styles.footer.image}
                source={isActive === item.id ? item.activeImage : item.image}
              />
              <Text style={isActive === item.id ? styles.footer.active : null}>
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "90%",
  },
  footer: {
    height: "10%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    justifyContent: "space-around",

    active: {
      color: "#173EA5",
      fontFamily: "poppins-medium",
    },

    once: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
      width: 65,
      height: 60,
    },

    image: {
      width: 25,
      height: 25,
    },
  },
});

export default DefaultScreen;
