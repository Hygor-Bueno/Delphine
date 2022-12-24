export default class Util {
    calcTotal(valueArray) {
        let newTotal = 0;
        valueArray.forEach(item => {
            newTotal += parseFloat(item.value || 0) * parseFloat(item.quantities || 0);
        });
        return newTotal;
    }
    maskMoney(value) {
        let newValue = parseFloat(value ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return newValue;
    }
}
