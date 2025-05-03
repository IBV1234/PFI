import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable ,ImageBackground} from 'react-native';
import { Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useLoadFont } from '../../hooks/fontLoaded';
import * as Localization from 'expo-localization';
import {I18n} from 'i18n-js';
import { translations } from '../../constants/DataLangages';
import { LangageToExport } from './langage';

const { height, width } = Dimensions.get('window');

const i18n = new I18n(translations);

export default function Apropo() {
    const fontsLoaded = useLoadFont();
    i18n.locale = LangageToExport.langage ?? Localization.getLocales()[0].languageTag;


 if (!fontsLoaded) {
         return (
             <Text style={{ alignSelf: 'center' }}>{i18n.t("loading")}...</Text>
         );
    }

    return(
     <ImageBackground  source={require('../../assets/images/bg-apropo.jpg')} style={{flex: 1}} resizeMode='cover' >
           <View style={styles.container}>
               <Link href={"/acceuil"} style={{ marginTop: 40, marginLeft: 20 }}>
                <View style={styles.ContainerArrow}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </View>
            </Link>
            <View style={{alignSelf:'center'}}>
                     <Text style={{fontWeight:'bold',fontSize:25}}>{i18n.t("aPropoTitle")}</Text>

            </View>
            <View style={styles.containerApropo}>
                <Text style={{fontWeight:'bold'}}>
                    {i18n.t("aPropoContain")}
                </Text>
            </View>
        </View>
     </ImageBackground>
    )
        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: '5%',

    },

    containerApropo: {
        justifyContent:'flex-start',
        padding:10,
        textAlign:'center',
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        borderRadius: 30,
        height: height * 0.25,
        width: 'auto',
        marginLeft: 10,
        
    },
    containerAddFood: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#E8C051',
        borderRadius: 30,
        height: height * 0.48,
        width: width * 0.95,
        marginLeft: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    boutton: {
        marginTop: 45,
        marginBottom: 20,
        borderRadius: 20,
        width: 250,
        height: 50,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,

    },
    bouttonSupprimer: {
        marginTop: 45,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: 'red',
        width: 110,
        height: 55,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    text: {
        alignContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Inknut Antiqua',
    },
    ContainerUserName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginLeft: '40%',
        width: 60,
        height: 60,
    },
    containerImageConnexion: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 20,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 'auto',
    },

    containerInput: {
        marginTop: '20%',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        borderColorBottom: 'black',
        borderBottomWidth: 1.5,
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    ContainerArrow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        borderRadius: 40,
        backgroundColor: '#F3F0E8',
        width: 50,
        height: 50,
    }
});