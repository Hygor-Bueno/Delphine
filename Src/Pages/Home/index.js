import React, {useState, useEffect} from 'react';
import { StyleSheet, View,Text , FlatList} from 'react-native';
import Header from '../../Components/Header';
import Balance from '../../Components/Balance';
import Movements from '../../Components/Movements';
import AsyncStorage from '@react-native-community/async-storage';
// import Actions from '../../Components/Actions';

export default function Home({navigation, route}) {
  const [movements,setMovements]=useState();
  useEffect(() => {
    const getStorange = async (key) =>{
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setMovements(value);
        }
      } catch (error) {
        console.log(error );
      }
    };
    getStorange('user');
  },[]);

  useEffect(() => {console.log(movements)},[movements]);
  return (
    <View style={styles.container}>
      <Header name={'Hygor A. Bueno '}/>
      <Balance saldo="9250,90" gastos="-2.2570,00"/>
      {/* <Actions /> */}
      <Text style={styles.title}> Últimas movimentações</Text>
      <FlatList
        style={styles.list}
        data={[]}
        keyExtractor={(item)=>String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=><Movements data={item}/>}
      />
    </View>
  );
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
  }
});