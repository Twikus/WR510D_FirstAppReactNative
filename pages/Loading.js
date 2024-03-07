import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate('Home');
  }, 1000);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/img/logo-pokedex.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000029',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
