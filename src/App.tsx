import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { NewTransactionModal } from "./components/NewTransactionalModal";
import { TransactionsContext } from "./TransactionsContext";

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true);
  } 

  function handleCloseNewTransactionModal(){
  setIsNewTransactionModalOpen(false);
  }


  return (
    <TransactionsContext.Provider value={[]}>
      <Header 
          onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      ></NewTransactionModal>
  
      <GlobalStyle />
    </TransactionsContext.Provider>
  );
}