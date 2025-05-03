import  { useState,useEffect } from 'react';
import * as Font from 'expo-font';
//mettre useLoadFont pour le nom de la fonction car react l'associe à un  hook
 export const useLoadFont = () => { 
    const [fontsLoaded, setFontsLoaded] = useState(false);
    
   useEffect(()=>{
    Font.loadAsync({
        'Inknut Antiqua': require('../assets/fonts/Inknut_Antiqua/InknutAntiqua-Regular.ttf'),
    }).then(()=>{
        setFontsLoaded(true);
    }).catch((error)=>{
        console.error('Erreur dans le téléchargement', error);
    });
   },[])
   return fontsLoaded
}