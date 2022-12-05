/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { Button, StyleSheet, Text, View } from 'react-native';
 import Home from './Src/Pages/Home/';
 
 import AsyncStorage from '@react-native-community/async-storage';
 
 //Biblioteca de estilos para utilização de icones personalizados em todo o código.
 import { library } from '@fortawesome/fontawesome-svg-core'
 import { fab } from '@fortawesome/free-brands-svg-icons'
 import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
 import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
 import { faHomeUser } from '@fortawesome/free-solid-svg-icons/faHomeUser';
 library.add(fab, faSquareCheck, faMugSaucer,faHomeUser);
 
 
 
 export default function App() {
   const [curso,setCurso]=useState(null);
 
   function postStorange(key,value) {
     AsyncStorage.setItem(key,value);
   }
 
   const getStorange = async (key) =>{
     const value = await AsyncStorage.getItem(key);
     setCurso(value);
   };
 
   // postStorange('01',"React Native");
   // postStorange('02',"Java");
   // postStorange('03',"C#");
 
 
   return (
       // <Home />
       <View style={styles.container}>
         <Text style={styles.title}> Armazenamento Local / Async-Storange</Text>
         <Text>Curso de {curso}</Text>
         <Button title="React Native" onPress={()=>getStorange('01')}/>
         <Button title="Java" onPress={()=>getStorange('02')}/>
         <Button title="C#" onPress={()=>getStorange('03')}/>
       </View>
   )
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fbfafb',
   },
   title:{
     fontSize:18,
     fontWeight:'bold',
     margin:14
   },
   list:{
     marginStart:14,
     marginEnd:14,
   },
   username: {
     fontSize: 18,
     color: '#000',
     fontWeight: 'bold'
 },
 
 });