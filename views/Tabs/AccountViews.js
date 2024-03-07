import { View, Text, TextInput, Button, StyleSheet, Image, Animated, Easing, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useRef, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';

const AccountViews = () => {
  const style = styles;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = React.useState(false);
  
  const onToggleSnackBar = () => {
    setVisible(true);
    setTimeout(onDismissSnackBar, 3000);
  };
  const onDismissSnackBar = () => setVisible(false);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Nous avons besoin de la permission pour accéder à votre galerie');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets[0] && result.assets[0].uri) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    // Stocker les données du formulaire dans AsyncStorage
    try {
      if (firstName !== '') {
        await AsyncStorage.setItem('firstName', firstName);
      }
      if (lastName !== '') {
        await AsyncStorage.setItem('lastName', lastName);
      }
      if (age !== '') {
        await AsyncStorage.setItem('age', age);
      }
      if (photo) {
        await AsyncStorage.setItem('photo', photo);
      }

      onToggleSnackBar();
    } catch (error) {
      console.error(error);
    }

    Keyboard.dismiss(); // Masquer le clavier
  };

  const pokeball = require("../../assets/img/navbar/pokedex-active.png");

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();

    const loadData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedLastName = await AsyncStorage.getItem('lastName');
        const storedAge = await AsyncStorage.getItem('age');
        const storedPhoto = await AsyncStorage.getItem('photo');

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedAge) setAge(storedAge);
        if (storedPhoto) setPhoto(storedPhoto);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={style.body}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={style.snackbar}
      >
        <Text style={style.snackbar.text} >Informations mises à jour</Text>
      </Snackbar>

      <View style={style.body.containerTitle}>
        <Text style={style.body.containerTitle.title}>Informations Dresseur</Text>
        <Animated.Image
          style={{ ...styles.body.containerTitle.image, transform: [{rotate: spin}] }}
          source={pokeball}
        />
      </View>
      <View style={style.body.containerBody}>
        <View style={style.body.containerBody.avatar}>
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{ width: '100%', height: '100%', borderRadius: 100 }}
            />
          )}
        </View>
        <Button title="Choisir une photo" onPress={handleChoosePhoto} />
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Prénom"
          style={style.body.containerBody.textInput}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nom"
          style={style.body.containerBody.textInput}
        />
        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          keyboardType="numeric"
          onSubmitEditing={Keyboard.dismiss} 
          style={style.body.containerBody.textInput}
        />
        <TouchableOpacity
          style={style.body.containerBody.submit}
          title="Suivant"
          onPress={() => handleSubmit()}
        >
          <Text style={style.body.containerBody.submit.text}>Mettre à jour les informations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#173EA5',

    text: {
      textAlign: 'center',
      fontFamily: "poppins-semi-bold",
      color: '#FFF',
    },
  },
  body: {
    height: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",

    containerTitle: {
      position: "absolute",
      top: 0,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
      width: "100%",
      paddingTop: 70,
      paddingBottom: 30,
      paddingLeft: 20,
      display: "flex",
      flexDirection: "row",

      title: {
        fontSize: 24,
        fontFamily: "poppins-semi-bold",
      },

      image: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginTop: 5,
      },
    },

    containerBody: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        backgroundColor: 'lightgray', // Ajoutez cette ligne
      },

      textInput: { // Ajoutez ce style pour les TextInput
        height: 40,
        minWidth: 200,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
      },

      submit: {
        width: 342,
        height: 50,
        backgroundColor: "#173EA5",
        borderRadius: 50,
        color: "#FFF",
        textAlign: "center",
        fontFamily: "poppins-medium",
        fontSize: 16,
        paddingTop: 14,
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto",

        text: {
          color: "#FFF",
          textAlign: "center",
          fontFamily: "poppins-medium",
          fontSize: 16,
        },
      }
    }
  },
});

export default AccountViews;
