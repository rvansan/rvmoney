import Modal from "react-modal";
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import {Container, TransactionTypeContainer} from './styles';
import closeImg from '../../assets/close.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    return(
        <Modal 
			isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container>
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
                />
                <input 
                    placeholder="Valor"
                    type="number"
                />
                <TransactionTypeContainer>
                        <button type="button">
                            <img src={IncomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </button>
                    <button type="button">
                        <img src={OutcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </button>
                </TransactionTypeContainer>
                <input 
                    placeholder="Categoria"
                />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}