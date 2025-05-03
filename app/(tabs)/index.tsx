import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { Link } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useLoadFont } from '../../hooks/fontLoaded';
import * as Localization from 'expo-localization';
import {I18n} from 'i18n-js';
import { translations } from '../../constants/DataLangages';
import { LangageToExport } from './langage';

const { height, width } = Dimensions.get('window'); //obtenir les dimensions de l'écran.


 export const db = SQLite.openDatabaseSync('PFI.db');

    const createTableUsers=() => db.withTransactionSync(()=> db.runSync("CREATE TABLE IF NOT EXISTS " +
    "User (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, password TEXT,admin INTEGER);" ))


    const createTableFoods=() => db.withTransactionSync(()=> db.runSync("CREATE TABLE IF NOT EXISTS " +
        "Foods (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, lien TEXT,prix INTEGER,disponible INTEGER,description TEXT);" ))

        const createPanierUser=() => db.withTransactionSync(()=> db.runSync("CREATE TABLE IF NOT EXISTS " +
            "Panier (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, lien TEXT,prix INTEGER,description TEXT);" ))

        const DELETEtABLE = () => db.withTransactionSync(() => db.runSync("DROP TABLE IF EXISTS User"));    


     function createTables(){
        createTableUsers();
        createTableFoods();
        createPanierUser();
        console.log("Les tables on été créés");
    }

    
const i18n = new I18n(translations);

export default function Acceuil() {
    i18n.locale = LangageToExport.langage ?? Localization.getLocales()[0].languageTag;

    const fontsLoaded =  useLoadFont();
    useEffect(() => {

        createTables();
     //DELETEtABLE();
    },[]);


    if (!fontsLoaded) {
        return (
            <Text style={{alignSelf:'center'}}>{i18n.t("loading")}...</Text>
          );
    }

    return (
        <View style={styles.containerAcceuil}>

            <View >
                <Image style={styles.image} source={require('../../assets/images/food-acceuil.jpg')} />
            </View>

            <View style={styles.containerAcceuil2}>

                <View style={{ marginTop: 40, alignItems: 'center' }}>

                    <Text style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Inknut Antiqua', color: 'black' }}>{i18n.t("indexTitle")}</Text>

                   <Link href={"/connexion"} asChild style={[styles.boutton ,{backgroundColor:'#EE6136',marginTop:20}]}>

                         <Pressable  onPress={() => { console.log('connexion') }}>
                                 <Text style={styles.text}>{i18n.t("connection")}</Text>
                        </Pressable>

                   </Link>

                      <Link href={"/inscription"} asChild style={[styles.boutton ,{backgroundColor:'#EDA36E',marginTop:25}]} >

                            <Pressable  onPress={() => { console.log('Inscription') }}>
                                <Text style={styles.text}>{i18n.t("inscription")}</Text>
                         </Pressable>

                      </Link>
                      
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerAcceuil: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    image: {
        borderBlockColor: 'black',
        borderWidth: 4,
        height: height * 0.55, // 50% de la hauteur de l'écran
        width: width,
    },
    containerAcceuil2: {
        alignItems: 'center',
        backgroundColor: '#F3F0E8',
        height: height,
        width: width
      },
    boutton:{
        marginTop: 20, 
         borderRadius: 20,  
         width: 230, 
         height: 50,
         alignItems: 'center' ,
         shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
         
    },
    text:{
      alignContent:'center',
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'Inknut Antiqua',
    }
});


