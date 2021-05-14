import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

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
    createTransaction: (transaction: transactionInput) => void
}

type transactionInput = Omit<Transaction, 'id'| 'createdAt'>;

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionProviderProps){

    const[transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    function createTransaction(transaction: transactionInput) {
        api.post('/transactions', transaction);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider >
    );

}





