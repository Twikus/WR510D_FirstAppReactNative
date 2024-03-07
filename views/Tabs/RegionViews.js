import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Regions from "../../components/Regions";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegionViews = () => {

  const style = styles;

  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_ENDPOINT = "https://pokeapi.co/api/v2"

  const fetchGenerations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_ENDPOINT}/generation`);
      return response.data.results;
    } catch (error) {
      setError(error);
      console.log('generations :' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegion = async () => {
    let storedRegions = await AsyncStorage.getItem('regionsData');
    if (storedRegions) {
      setRegions(JSON.parse(storedRegions));
      return;
    }

    const generations = await fetchGenerations();

    let newRegions = [];

    for (const generation of generations) {
      try {
        setIsLoading(true);
        const response = await axios.get(generation.url);

        if (response.data.main_region) {
          newRegions.push({
            region: response.data.main_region,
            generation: {
              name: generation.name,
              url: generation.url
            }
          });
        }
      } catch (error) {
        setError(error);
        console.log('regions :' + error);
      } finally {
        setIsLoading(false);
      }
    }

    newRegions = newRegions.map(({ region, generation }) => {
      return {
        name: region.name.charAt(0).toUpperCase() + region.name.slice(1),
        generation: {
          name: generation.name,
          url: generation.url
        },
      };
    });

    setRegions(newRegions);
    await AsyncStorage.setItem('regionsData', JSON.stringify(newRegions));
  };
  
  useEffect(() => {
    fetchRegion();
  }, []);

  if (isLoading) {
    return (
      <View style={style.body}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.body}>
        <Text>Error...</Text>
      </View>
    );
  }

  return (
    <View style={style.body}>
      <View style={style.containerTitle}>
        <Text style={style.containerTitle.title}>Regions</Text>
      </View>
      <FlatList
        style={style.body.list}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={1}
        data={regions}
        renderItem={({ item }) => (
          <Regions style={style.body.list.item} name={item.name} generation={item.generation} />
        )}
        keyExtractor={(item) => item.name}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    paddingBottom: 30,
    paddingLeft: 20,

    title: {
      marginTop: 70,
      fontSize: 24,
      fontFamily: "poppins-semi-bold",
    },
  },

  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
    list: {
      marginTop: 10,
      width: "100%",
    }
  },
});

export default RegionViews;
