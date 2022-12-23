export default class Util {
    calcTotal(valueArray) {
        let newTotal = 0;
        valueArray.forEach(item => {
            newTotal += parseFloat(item.value) * parseFloat(item.quantities);
        });
        return newTotal;
    }
    maskMoney(value) {
        let newValue = parseFloat(value ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return newValue;
    }
}
