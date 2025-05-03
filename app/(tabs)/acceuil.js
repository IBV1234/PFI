import React, { useContext, useState,useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useLoadFont } from '../../hooks/fontLoaded';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserNameContex } from './connexion';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from '../../constants/DataLangages';
import { db } from './index'
import { LangageToExport } from './langage';


// const offres = [
//   {
//     id: '1',
//     title: 'Offre 1',
//     description: 'Description 1',
//     image: require('../../assets/images/food-acceuil.jpg'),
//   },
//   {
//     id: '2',
//     title: 'Offre 2',
//     description: 'Description 2',
//     image: require('../../assets/images/ChocolateSC.jpg'),
//   },
// ]
const { height, width } = Dimensions.get('window');
const i18n = new I18n(translations);

export let showBarAcceuil = false
export default function Acceuil() {

  useFocusEffect(() => {
    showBarAcceuil = true;
  })

  const fontsLoaded = useLoadFont();
  const [foodData, setFoodData] = useState([]);
  const [foodEmpty, setFoodEmpty] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const { personne } = useContext(UserNameContex)

// const testData = db.getAllSync("SELECT * FROM Foods");
//   console.log("OFFRES", foodData);


  const addLink = (Data) => {
    const imgages = {
        "food2.jpg": require("../../assets/images/food2.jpg"),
        "ChocolateSC.jpg": require("../../assets/images/ChocolateSC.jpg")
    }

    const newData = Data.map((_data) => { //ok
        return {
            ..._data,
            lien: imgages[_data.lien],
        };
    });
    return newData;
}


  const afficherOffres = () => {
    try {
      db.withTransactionSync(() => {

        setLoading(true);

        const dataFoods = db.getAllSync("SELECT * FROM Foods  WHERE disponible = ? ", [1]);

        if (dataFoods.length > 0) {

          const trueData = addLink(dataFoods);

          setFoodData(trueData)
          setLoading(false);
          console.log("foods", trueData);
          setFoodEmpty(false);

        } else {

          console.log("Aucun aliment trouvé dans la base de données");
          setLoading(false);
          setFoodEmpty(true);
        }
      })
    } 
    catch (error) {

      console.log("ERREUR dans l'affichage des items", error);
      setLoading(false);
      setFoodEmpty(true);

    }
  }
  
  useEffect(() => {
    afficherOffres(); 
  }, []);
  

  if (!fontsLoaded) {
    return (
      <Text style={{ alignSelf: 'center' }}>{i18n.t("loading")}...</Text>
    );
  }

  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topRow}>
        <FontAwesome name="map-marker" style={styles.icon} />
        <Text style={styles.locationText}>Quebec, Canada</Text> {/*do button for panier*/}
      </View>

      <View style={styles.profile}>
        <Text style={styles.profileName}>{personne.name}</Text> {/*arranger profil top row*/}
      </View>

      <View style={styles.promoCard}>
        <View style={styles.promoText}>
          <Text style={styles.promoTitle}>Promo</Text>
          <Text>Profitez de 20% de rabais d&apos;ouverture!!!</Text>
        </View>
        <Image source={require('../../assets/images/food2.jpg')} style={styles.promoImage} />
      </View>

      <View style={styles.offersContainer}>
        <Text style={styles.offersTitle}>Nos offres</Text>
        {foodEmpty && (
                  <Text style={[styles.text, { fontSize: 20, marginBottom: '10%', marginLeft: '30%',textAlign:'center' }]}>aucun offres pour le moment </Text>

        )}

        {!foodEmpty && (
          <FlatList
            data={foodData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.offerCard}>
                <Image source={item.lien} style={styles.offerImage} />
                <View style={styles.offerInfo}>
                  <Text style={styles.offerName}>{item.title}</Text>
                  <Text style={styles.offerPrice}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6f0',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  iconLarge: {
    fontSize: 36,
    color: '#333',
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  profile: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileName: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  promoCard: {
    flexDirection: 'row',
    backgroundColor: '#f4d06f',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 16,
    height: 120,
  },
  promoText: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  promoImage: {
    width: 140,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  offersContainer: {
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    margin: 16,
    paddingTop: 16,
    height: height * 0.40
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 12,
    color: '#333',
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  offerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  offerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  offerPrice: {
    fontSize: 12,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 8,
  },
  plus: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 16,
    textAlign: 'center',
  },
});