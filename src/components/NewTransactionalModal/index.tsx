import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";

import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    const[title, setTitle] = useState('');
    const[amount, setAmount] = useState(0);
    const[type, setType] = useState('deposit');
    const[category, setCategory] = useState('');

    const { createTransaction } = useTransactions();

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setType('deposit');
        setCategory('');

        onRequestClose();
    }

    return(
        <Modal 
			isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container onSubmit={handleCreateNewTransaction}>
                <button 
                    type="button" 
                    onClick={onRequestClose}
                    className="react-modal-close" 
                >
                    <img src={closeImg} alt="Fechar modal" />    
                </button>   
                <h2>Cadastrar Transação</h2>
                <input 
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={ type === 'deposit' }
                        activeColor='green'
                    >
                        <img src={IncomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={ type === 'withdraw' }
                        activeColor='red'
                    >
                        <img src={OutcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input 
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}