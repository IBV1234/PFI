import React, { useState, useEffect,useContext } from 'react';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput, FlatList } from 'react-native';
import { useLoadFont } from '../../hooks/fontLoaded';
import { translations } from '../../constants/DataLangages';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { UserNameContex } from './connexion';
import { db } from './index'
import { LangageToExport } from './langage';

const { height, width } = Dimensions.get('window');

const i18n = new I18n(translations);

export default function Admin() {
    const fontsLoaded = useLoadFont();
    const router = useRouter();
    const [foodData, setFoodData] = useState([{}]);
    const [isLoading, setLoading] = useState(false);
    const [issetFoodData, setIsSetFoodData] = useState({ lien: '', name: '', prix: 0, disponible: 0, description: '' });
    const [foodEmpty, setFoodEmpty] = useState(true);
    const {personne} = useContext(UserNameContex)
    console.log("Admin", personne.name);
    // console.log("fodd", issetFoodData);
    // console.log("foodEmpty", foodEmpty);
    i18n.locale = LangageToExport.langage ?? Localization.getLocales()[0].languageTag;

    useEffect(() => {
        FoodsData();
    }, [])


    const ViderPanier =()=>{

        let isDelete = false;
        try{
            db.withTransactionSync(()=>{
                isDelete = db.runSync("DELETE * FROM Panier" );
                console.log("Panier vidé");


            })

        }catch(error){
                console.log("ERREUR DANS LA SUPPRÉSION DES ITEMS DANS LE PANIER:",error);
                isDelete = false;
        }
    }
    // const BoolValideAdminInBd = (nom, mdp) => {

    //     let x = false;
    //     try {
    //         const isUserInBd = db.getAllSync('SELECT nom,password FROM User WHERE nom = ? AND password = ? AND Amdin = ?', [nom, mdp, 1]);
    //         if (isUserInBd.length > 0) {
    //             console.log("Utilisateur trouvé dans la base de données");
    //             x = true;
    //             userExist = true;

    //         } else {
    //             console.log("Utilisateur non trouvé dans la base de données");
    //             x = false;
    //         }
    //     } catch (error) {
    //         console.error("Erreur dans la validation de l'utilisateur", error);
    //         x = false;
    //     }
    //     return x;
    // };


    // const valideAmin = () => {

    //     if (personne.name.trim() && personne.password.trim()) {

    //         if (BoolValideAdminInBd(personne.name, personne.password)) {

    //             // aller à la page d'accueil
    //             router.push("/");

    //         } else {

    //             alert("Votre nom: " + personne.nom + " où mot de passe est invalide");
    //         }
    //     } else {

    //         alert("Veuillez entrer tous les champs");
    //     }
    // };

    const SupprimerItem = (id) => {
        console.log("id", id)
        try {
            db.withTransactionSync(() => {
                db.runSync("DELETE FROM Foods WHERE id=?", [id]);
                console.log("Supprimé ");
            })
        } catch (error) {
            console.log(error);
        }
    }


    const Liste = ({ item }) => {
        return (
            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 20, backgroundColor: 'white', padding: 10, width: 'auto'}}>
                <View style={{ marginRight: 20 }}>
                    <Image source={item.lien} style={{ width: 130, height: 170, borderRadius: 20 }} />
                </View>
                <View>
                    <View style={{ gap: 60 }}>
                        <Text style={[styles.text, { fontSize: 20 }]}>{item.nom}</Text>

                        <Text style={[styles.text, { fontSize: 15 }]}>{i18n.t("price")}:{item.prix}$</Text>
                    </View>
                </View>
                <View>
                    <Pressable style={styles.bouttonSupprimer} onPress={() => { SupprimerItem(item.id), FoodsData() }}>
                        <Text style={[styles.text, { fontSize: 16 }]}>{i18n.t("delete")}</Text>

                    </Pressable>
                </View>
            </View>
        )
    }



    const addLink = (Data) => {
        const imgages = {
            "food2.jpg": require("../../assets/images/food2.jpg"),
            "ChocolateSC.jpg": require("../../assets/images/ChocolateSC.jpg")
        }

        const newData = Data.map((_data) => {
            return {
                ..._data,
                lien: imgages[_data.lien],
            };
        });
        return newData;
    }



    const FoodsData = () => {

        try {
            db.withTransactionSync(() => {
                setLoading(true);
                const data = db.getAllSync('SELECT * FROM Foods WHERE disponible = ? ', [1]);
                console.log("data", data);

                if (data.length > 0) {
                    const trueData = addLink(data);
                    setFoodData(trueData);
                    console.log("trueData", trueData);
                    setFoodEmpty(false);
                } else {
                    console.log("Aucun aliment trouvé dans la base de données");
                    setLoading(false);
                    setFoodEmpty(true);
                }
            })
        } catch (error) {
            console.error("Erreur dans la récupération des données", error);
            setLoading(false);
            setFoodEmpty(true);
        }
    }



    const insertFoodInBd = ({ nom, lien, prix, dispo, desc }) => {
        let x = false;
        try {
            db.withTransactionSync(() => {
                db.runSync('INSERT INTO Foods (nom,lien,prix,disponible,description) VALUES (?,?,?,?,?)', [nom, lien, prix, dispo, desc]);
                console.log("Foods inséré dans la base de données");
                x = true;
                
            })

        } catch (error) {
            console.error("Erreur dans l'insertion du Foods dans la bd", error);
            x = false;
        }
        return x;
    }



    if (!fontsLoaded) {
        return (
            <Text style={{ alignSelf: 'center' }}>{i18n.t("loading")}...</Text>
        );
    }



    return (
        <View style={styles.containerConnexion}>

            <View style={{ position: 'relative',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:'5%', marginTop: 35, width: 'auto', height: 'auto' }}>

                <Link href={"/"} style={{ position: 'absolute', left: 20 }}>
                    <View style={styles.ContainerArrow}>
                        <FontAwesome name="arrow-left" size={30} color="black" />
                    </View>
                </Link>

                <Text style={[styles.text, { fontSize: 24 }]}>Admin</Text>

            </View>

            <View style={styles.ContainerUserName}>

                <FontAwesome name="user-circle-o" size={30} color="black" />
                <Text style={[styles.text, { fontSize: 20 }]}>{personne.name}</Text>

            </View>


            <View style={styles.containerFoodList}>

                {foodEmpty && (
                    <Text style={[styles.text, { fontSize: 20, marginBottom: '10%', marginLeft: '30%' }]}>{i18n.t("noItem")}  </Text>

                )}

                {!foodEmpty && (
                    <FlatList
                        data={foodData}
                        renderItem={Liste}
                        keyExtractor={(item) => item.id}
                        // refreshing={isLoading}
                        // onRefresh={() => FoodsData()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} // Masque la barre de défilement horizontal
                        ItemSeparatorComponent={()=> <View style={{width: 20 }} />}

                    />
                )}

            </View>

            <View style={styles.containerAddFood}>

                <View style={{ width: 300, height: 50 }}>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t("enterLink")}
                        placeholderTextColor="black"
                        value={issetFoodData.lien}
                        onChangeText={(link) => setIsSetFoodData({ ...issetFoodData, lien: link })}
                    />
                </View>

                <View style={{ width: 300, height: 50, marginTop: 5 }}>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t("enterNameFood")}
                        placeholderTextColor="black"
                        value={issetFoodData.name}
                        onChangeText={(nom) => setIsSetFoodData({ ...issetFoodData, name: nom })}
                    />
                </View>

                <View style={{ width: 300, height: 50, marginTop: 5 }}>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t("price")}
                        placeholderTextColor="black"
                        value={issetFoodData.prix}
                        onChangeText={(price) => setIsSetFoodData({ ...issetFoodData, prix: price })}
                    />
                </View>

                <View style={{ width: 300, height: 50, marginTop: 5 }}>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t("disponibilite")}
                        placeholderTextColor="black"
                        value={issetFoodData.disponible}
                        onChangeText={(dispo) => setIsSetFoodData({ ...issetFoodData, disponible: dispo })}
                    />
                </View>

                <View style={{ width: 300, height: 50, marginTop: 5 }}>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t("description")}
                        placeholderTextColor="black"
                        value={issetFoodData.description}
                        onChangeText={(des) => setIsSetFoodData({ ...issetFoodData, description: des })}
                    />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <Pressable style={[styles.boutton, { backgroundColor: '#EE6136' }]}
                        onPress={() => {
                            insertFoodInBd({
                                nom: issetFoodData.name,
                                lien: issetFoodData.lien,
                                prix: parseFloat(issetFoodData.prix, 10),
                                dispo: parseInt(issetFoodData.disponible, 10),
                                desc: issetFoodData.description,
                            })
                            FoodsData()
                        }}>

                        <Text style={styles.text}>{i18n.t("add")}</Text>
                        
                    </Pressable>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerConnexion: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        gap: 5,
    },

    containerFoodList: {
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        height: height * 0.28,
        width: width * 0.95,
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


