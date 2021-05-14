import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface TransactionProviderProps {
    children: ReactNode
}

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: transactionInput) => Promise<void>
}

type transactionInput = Omit<Transaction, 'id'| 'createdAt'>;

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);


export function useTransactions(){
    const context = useContext(TransactionsContext);
    return context;
}

export function TransactionsProvider({children}: TransactionProviderProps){

    const[transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: transactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const {transaction} = response.data;
        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider >
    );

}





