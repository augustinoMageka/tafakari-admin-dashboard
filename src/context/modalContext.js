import { createContext, useState, useContext } from "react";
const ModalContext = createContext();
const UpdateModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const useUpdateModalContext = () => {
  return useContext(UpdateModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false);
  return (
    <ModalContext.Provider value={modalState}>
      <UpdateModalContext.Provider value={setModalState}>
        {children}
      </UpdateModalContext.Provider>
    </ModalContext.Provider>
  );
};
