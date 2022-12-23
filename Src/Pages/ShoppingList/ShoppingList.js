import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import Loading from '../../Components/Loading/Loading';
import ShoppItem from '../../Components/ShoppItem';
import Util from '../../Components/Utils/Util';

export default function ShoppingList(props) {
    const utilGlobal = new Util();
    const listSession = [
        { key: '1', value: 'Doce' },
        { key: '2', value: 'Salgada' },
        { key: '3', value: 'Padaria' },
        { key: '4', value: 'Frio e laticíonios' },
        { key: '5', value: 'Líquida' },
        { key: '6', value: 'Higieno' },
        { key: '7', value: 'Hortifruti' },
        { key: '8', value: 'Bazar' },
        { key: '9', value: 'Açougue' },
        { key: '10', value: 'Outros' }
    ];
    const maskItem = {
        id: '',
        description: '',
        value: '',
        quantities: '',
        session: ''
    }
    const [session, setSession] = useState('');
    const [item, setItem] = useState(maskItem)
    const [load, setLoad] = useState(false);
    const [total, setTotal] = useState(0);
    const [shoppList, setShoppList] = useState({});
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        const getStorange = async (key) => {
            const util = new Util();
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    let convert = JSON.parse(value);
                    setShoppList(convert || {});
                    setTotal(util.calcTotal(convert.list))
                }
            } catch (error) {
                console.log(error);
            }
        };
        getStorange('shoppingList');
    }, []);

    function calcTotal() {
        let newTotal = 0;
        shoppList.list.forEach();
    }
    useEffect(() => { console.log(balance) }, [balance]);

    return (
        <View style={styles.container}>
            {load && <Loading />}
            <View style={styles.contentDatas}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Descrição:</Text>
                    <TextInput style={styles.textValueDesc}
                        multiline={false}
                        value={item.description}
                        onChangeText={async (text) => captureItems(text, 'description')}
                    />
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Valor:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        keyboardType="numeric"
                        value={item.value}
                        onChangeText={async (text) => captureItems(text, 'value')}
                    />
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Quantidade:</Text>
                    <TextInput style={styles.textValue}
                        multiline={false}
                        keyboardType="numeric"
                        value={item.quantities}
                        onChangeText={async (text) => captureItems(text, 'quantities')}
                    />
                </View>
            </View>
            <View style={styles.contentDatasSession}>
                <View style={styles.subContent}>
                    <Text style={styles.titleText}>Setor:</Text>
                    <View style={styles.SelectListView}>
                        <SelectList
                            data={listSession}
                            setSelected={setSessionItem}
                            boxStyles={{ backgroundColor: 'white' }}
                            inputStyles={{ fontSize: 14, color: '#555', zIndex: 200 }}
                            dropdownTextStyles={{ color: '#555' }}
                            placeholder="Categorias"
                            dropdownStyles={{ backgroundColor: 'white' }}
                        />
                    </View>
                </View>
                <View style={styles.subContentBtn}>
                    <TouchableOpacity
                        style={styles.buttonInput}
                        activeOpacity={0.5}
                        onPress={async () => {
                            setLoad(true);
                            let response = validateItem();
                            if (response.error) {
                                window.alert(response.message);
                            } else {
                                let newID = parseInt(shoppList.lastId) + 1;
                                let add = shoppList;
                                captureItems(newID, 'id');
                                add.list.push(item);
                                add.lastId = newID;
                                setShoppList({ ...add });
                                clearForm();
                                await updateShoppingList();
                            }
                            setLoad(false);
                        }}
                    >
                        <FontAwesomeIcon color='white' size={22} icon="plus" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, }}>
                <FlatList
                    style={styles.list}
                    data={shoppList.list}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ShoppItem data={item} setLoad={setLoad} />}
                />
                <View style={styles.listFooterContent}>
                    <View style={styles.viewInput}>
                        <Text style={styles.inputBalance}>Limite:</Text>
                        <TextInput style={styles.textInputBalance}
                            multiline={false}
                            keyboardType="numeric"
                            value={balance}
                            onChangeText={async (text) =>{let newValue = balance; newValue = text; setBalance(newValue)}}
                        />
                    </View>
                    <Text style={styles.listTotal}>{balance !== '0'?'Saldo':'Total:'} {utilGlobal.maskMoney(total)}</Text>
                </View>
            </View>
        </View>
    );
    function validateItem() {
        let message = 'Atenção: \n';
        let result = { error: false };
        if (item.description === '' || session === '') {
            message += 'Os campos "Descrição" e "Setor" são obrigatórios.';
            result.error = true;
        }
        result.message = message;
        return result;
    }
    function captureItems(value, key) {
        let newValue = item;
        newValue[key] = value;
        setItem({ ...newValue });
    }
    function setSessionItem(value) {
        setSession(value);
        captureItems(value, 'session');
    }
    function clearForm() {
        setItem({ ...maskItem });
    }
    async function updateShoppingList() {
        try {
            await AsyncStorage.setItem('shoppingList', JSON.stringify(shoppList));
        } catch (e) {
            console.log(e);
        }
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
    contentDatasSession: {
        padding: 4,
        flexDirection: 'row',

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
    listFooterContent: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listTotal: {
        color: 'white'
    },
    SelectListView: {
        width: 150,
        zIndex: 2
    },
    textValue: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 70,
        height: 46,
        fontSize: 22,
        borderRadius: 12,
        color: '#808080',
        backgroundColor: 'white',
    },
    textValueDesc: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 150,
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
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        backgroundColor: '#218838',
        marginLeft: 10
    },
    buttonIcon: {
        color: 'white',
        fontSize: 30,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        backgroundColor: '#1B1E23',
        margin: 12,
        padding: 12,
        height: '65%',
        borderRadius: 12
    },
    viewInput: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    inputBalance:{
        color: '#FFFFFF',
    },
    textInputBalance:{
        backgroundColor:'white',
        height:20,
        marginLeft:8,
        width:100,
        borderRadius:8,
        alignItems:'center',
        justifyContent: 'center',
        color: 'black',
        padding:0,
        paddingLeft:4
    }
})