import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {  useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Loading from '../../Components/Loading/Loading';
import MovementsEdit from '../../Components/MovementsEdit';
import Select from '../../Components/Select/Select.js'

export default function Historic(props) {
    const month = [
        { value: '1', label: 'Janeiro' },
        { value: '2', label: 'Fevereiro' },
        { value: '3', label: 'Março' },
        { value: '4', label: 'Abril' },
        { value: '5', label: 'Maio' },
        { value: '6', label: 'Junho' },
        { value: '7', label: 'Julhl' },
        { value: '8', label: 'Agosto' },
        { value: '9', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' }
    ];
    const [monthSelected, setMonthSelected] = useState('');
    const [yar, setYar] = useState(0);
    const [load, setLoad] = useState(false);
    const [listData, setListData] = useState([]);

    return (
        <View style={styles.container}>
            {load && <Loading />}
            <View style={styles.contentDatas}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Mês:</Text>
                    <View style={styles.SelectListView}>
                        <Select value={monthSelected} setValue={setMonthSelected} list={month}/>
                    </View>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Ano:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        keyboardType="numeric"
                        value={yar}
                        onChangeText={async (text) => setYar(text)}
                    />
                </View>
                <View style={styles.subContentBtn}>
                    <TouchableOpacity
                        style={styles.buttonInput}
                        activeOpacity={0.5}
                        onPress={async () => {
                            let response = validateItem();
                            if (response.error) {
                                alert(response.message);
                            } else {
                                setLoad(true);
                                let arrayList = props.movements.releasesList || [];
                                let validate = `${monthSelected.padStart(2, '0')}/${yar}`;
                                let newList = [];
                                arrayList.forEach(item => {
                                    if (item.date.includes(validate)) { newList.push(item); }
                                });
                                setListData([...newList]);
                                setLoad(false);

                            }
                        }}
                    >
                        <FontAwesomeIcon color='white' size={22} icon="search" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listData}>
                <FlatList
                    style={styles.list}
                    data={listData}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <MovementsEdit spending={props.spending} balances={props.balances} setBalances={props.setBalances} setSpending={props.setSpending} setLoad={setLoad} listData={listData} setListData={setListData} movements={props.movements} setMovements={props.setMovements} data={item} />}
                />
            </View>
        </View>
    );
    function validateItem() {
        let message = 'Atenção: \n';
        let result = { error: false };
        if (monthSelected === '' || yar === 0) {
            message += "Os campo mês e ano são obrigatórios. \n";
            result.error = true;
        }
        if (parseInt(yar) < 1000) {
            message += "O ano deve conter 4 dígitos. \n";
            result.error = true;
        }
        result.message = message;
        return result;
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#3a3b3c',
    },
    contentDatas: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subContent: {
        justifyContent: 'space-between',
        padding: 2,
        height: 75,
        zIndex: 1
    },
    subContentBtn: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        color: '#CACACA',
    },
    SelectListView: {
        width: 150
    },
    textValue: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 100,
        height: 46,
        fontSize: 22,
        borderRadius: 12,
        color: '#808080',
        backgroundColor: 'white',
    },
    buttonInput: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#218838',
    },
    buttonIcon: {
        color: 'white',
        fontSize: 30,
    },
    list: {
        backgroundColor: '#1B1E23',
        margin: 12,
        padding: 12,
        height: '65%',
        borderRadius: 12
    }
})