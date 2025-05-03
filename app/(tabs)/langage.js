import React, { useState ,useContext} from 'react';
import { useRouter } from 'expo-router';
import { Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { useLoadFont } from '../../hooks/fontLoaded';
import { UserNameContex } from './connexion';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from '../../constants/DataLangages';
const { height, width } = Dimensions.get('window');

 
const i18n = new I18n(translations);
i18n.locale = Localization.getLocales()[0].languageTag;
export const LangageToExport ={langage:null}

export default function Langage() {
    const [Langage, setLangage] = useState({ langage: i18n.locale });
    const {personne} = useContext(UserNameContex)
    const fontsLoaded = useLoadFont();
    const router = useRouter();

    i18n.locale = Langage.langage;
    LangageToExport.langage= Langage.langage;

    if (!fontsLoaded) {
        return (
            <Text style={{ alignSelf: 'center' }}>{i18n.t("loading")}...</Text>
        );
    }

    return (
        <View style={styles.container1}>

            <Link href={"/"} style={{ marginTop: 40, marginLeft: 20 }}>
                <View style={styles.ContainerArrow}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </View>
            </Link>

            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Text style={[styles.text, { fontSize: 20, position: 'absolute', top: -40 }]}>
                    {i18n.t('chooseLanguage')}
                </Text>
            </View>

            <View style={styles.ContainerUserName}>
                <FontAwesome name="user-circle-o" size={30} color="black" />
                <Text style={[styles.text, { fontSize: 20 }]}>{personne.name}</Text>
            </View>

            <View style={styles.container2}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Pressable
                        style={[styles.boutton, { backgroundColor: '#FFFFFF' }]}
                        onPress={() => { setLangage({ ...Langage, langage: 'fr-CA' }); }}
                    >
                        <Text style={styles.text}>{i18n.t('french')}</Text>
                    </Pressable>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable
                        style={[styles.boutton, { backgroundColor: '#FFFFFF' }]}
                        onPress={() => { setLangage({ ...Langage, langage: 'en-US' }); }}
                    >
                        <Text style={styles.text}>{i18n.t('anglais')}</Text>
                    </Pressable>
                </View>
            </View>

            <Link
                href={"/acceuil"}
                style={[styles.boutton, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#7C726B', marginLeft: width * 0.20 }]}
                asChild
            >
                <Pressable onPress={() => { console.log("Aller à l'accueil"); }}>
                    <Text style={styles.text}>{i18n.t('continue')}</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        gap: '5%',
    },

    container2: {
        flexDirection: 'column',
        gap: '30%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 30,
        height: height * 0.44,
        width: width * 0.95,
        marginLeft: 10,
    },
    boutton: {
        borderRadius: 20,
        width: 230,
        height: 50,
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
    ContainerArrow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 20,
        borderRadius: 40,
        backgroundColor: '#F3F0E8',
        width: 60,
        height: 60,
    },
    ContainerUserName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        width: 'auto',
        height: 60,
    },
});