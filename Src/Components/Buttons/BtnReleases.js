import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function BtnReleases({focused,size,color}){
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon="plus" color={focused ? color : '#f1f2f3'} size={size}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height:60,
        borderRadius:30,
        backgroundColor: '#3eccf5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
});
