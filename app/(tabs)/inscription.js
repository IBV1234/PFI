
import React, { useState} from 'react';
import { useRouter } from 'expo-router';
import { Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { useLoadFont } from '../../hooks/fontLoaded';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from '../../constants/DataLangages';
import { LangageToExport } from './langage';
import {db} from'./index'

const { height, width } = Dimensions.get('window');

const i18n = new I18n(translations);

export default function Connexion() {
    i18n.locale = LangageToExport.langage ?? Localization.getLocales()[0].languageTag;
    const [personne, setPersonne] = useState({ name: '', password: '' ,passwordConfirm: ''});
    console.log("personne", personne);
    const fontsLoaded = useLoadFont();
    const router = useRouter();


const BoolValideUserInBd = (nom,mdp) => {

        let  x = false;
        try{
            const isUserInBd = db.getAllSync('SELECT nom,password FROM User WHERE nom = ? AND password = ?', [nom, mdp]);
            if(isUserInBd.length > 0){
                console.log("Utilisateur trouvé dans la base de données");
                x= true;

            }else{
                console.log("Utilisateur non trouvé dans la base de données");
                x= false;
            }
        }catch(error){
            console.error("Erreur dans la validation de l'utilisateur", error);
            x= false;
        }
        return x;
      };


    const BoolInsertUserInBd = (nom,mdp) => {

        let x = false;
        if(!BoolValideUserInBd(nom,mdp)){
            try{
                db.withTransactionSync(()=>{
                    db.runSync('INSERT INTO User (nom,password,admin) VALUES (?,?,?)', [nom, mdp,1]);
                    console.log("user inséré dans la base de données");
                    x= true;
                })
               
            }catch(error){
                console.error("Erreur dans l'insertion du user dans la bd", error);
                x= false;
            }
        }else{
            x = false
        }
        return x;
      };

    //   const y=()=> {
    //     try {
    //         db.withTransactionSync( () => {  
    //           db.runSync("DELETE FROM User WHERE nom=?", ["Isaac"]);
    //           console.log("Supprimé ");
    //         })      
    //       } catch (error) {
    //           console.log(error);
    //       }
    //   }
      

  const valideUser = () => {

    if (personne.name.trim() && personne.password.trim() && personne.passwordConfirm.trim()) {
        if(personne.password.trim() === personne.passwordConfirm.trim()){
            if (BoolInsertUserInBd(personne.name,personne.password)) {

                // aller à la page d'accueil
                router.push("/langage");
        
              } else {
        
                alert(i18n.t("invalidCredentials"));
              }
        }else{
            alert(i18n.t("invalideMdp"));
        }
    } else {

      alert(i18n.t("fillFields"));
    }
  };
  

    if (!fontsLoaded) {
        return (
            <Text style={{ alignSelf: 'center' }}>{i18n.t("loading")}...</Text>
        );
    }

    return (
        <View style={styles.containerConnexion}>
              <Link href={"/"} style={{ marginTop: 40,marginLeft: 20 }}>
            <View style={styles.ContainerArrow}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
            </View>
            </Link>
            <View style={styles.containerImageConnexion}>
                <FontAwesome name="user-circle-o" size={40} color="black" />
                <Text style={[styles.text, { fontSize: 20 }]}>Inscription</Text>
            </View>

            <View style={styles.containerConnexion2}>

                <View style={styles.containerInput}>
                    <View style={{ width: 300, height: 50 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={i18n.t("enterName")}
                            placeholderTextColor="black"
                            value={personne.name}
                            onChangeText={(nom) => setPersonne({ ...personne, name: nom })}
                        />
                    </View>
                    <View style={{ width: 300, height: 50, marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={i18n.t("enterPassword")}
                            placeholderTextColor="black"
                            value={personne.password}
                            onChangeText={(mdp) => setPersonne({ ...personne, password: mdp })}
                        />
                    </View>

                    <View style={{ width: 300, height: 50, marginTop: 40 }}>
                        <TextInput
                            style={styles.input}
                            placeholder={i18n.t("confirmMdp")}
                            placeholderTextColor="black"
                            value={personne.passwordConfirm}
                            onChangeText={(mdp) => setPersonne({ ...personne, passwordConfirm: mdp })}
                        />
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={[styles.boutton, { backgroundColor: '#EE6136', marginTop: 20 }]} onPress={() => { console.log('inscription') ,valideUser()}}>
                    <Text style={styles.text}>{i18n.t("inscription")}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerConnexion: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        gap: 20,
    },

    containerConnexion2: {
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        height: height * 0.44,
        width: width*0.95,
        marginLeft: 10,
    },
    boutton: {
        marginTop: 20,
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
    }, containerImageConnexion: {
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
    }
});


