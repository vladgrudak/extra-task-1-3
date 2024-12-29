import React, {useState} from 'react';
import './App.css';
import {Country} from "./Country";
import {v1} from "uuid";

export type BanknotsType = 'USD' | 'RUB' | 'All'

export type MoneyType = {
    banknote: BanknotsType
    nominal: number
    id: string
}

const defaultMoney: MoneyType[] = [
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
]


export const moneyFilter = (money: MoneyType[], filter: BanknotsType): MoneyType[] => {
    if(filter === 'All') return money
    return money.filter(el => el.banknote === filter)
}


function App() {
    const [money, setMoney] = useState<MoneyType[]>(defaultMoney)
    const [filterValue, setFilterValue] = useState<BanknotsType>('All')   // по умолчанию указываем все банкноты

    // а вот сейчас притормаживаем. И вдумчиво: константа filteredMoney получает результат функции moneyFilter
    // в функцию передаем деньги и фильтр, по которому их будем выдавать(ретёрнуть)
    const filteredMoney = moneyFilter(money, filterValue)

    const addMoney = (banknote: BanknotsType) => {
        // Добавление денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
        const newBanknote = {banknote, nominal: 100, id: v1()}
        setMoney([...money, newBanknote])
    }

    const removeMoney = (banknote: BanknotsType) => {

       const index = money.findIndex(el => el.banknote === banknote)
        if (index !== -1) {
            setMoney(money.filter( (el, i) => i !== index));
       }
    }

    return (
        <div className="App">
            <Country
                data={filteredMoney}   //отрисовать будем деньги после фильтрации
                setFilterValue={setFilterValue}
                addMoney={addMoney}
                removeMoney={removeMoney}
            />
        </div>
    );
}

export default App;
