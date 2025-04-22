import { useContext, useState, createContext } from 'react';

interface ToDoContextType {
    isToDosVisible: boolean;
    setIsToDosVisible: (visible: boolean) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isToDosVisible, setIsToDosVisibleState] = useState<boolean>(getIsToDosVisible());

    const setIsToDosVisible = (visible: boolean) => {
        setIsToDosVisibleState(visible);
        saveToDosVisible(visible);
    };

    return <ToDoContext.Provider value={{ isToDosVisible, setIsToDosVisible }}>{children}</ToDoContext.Provider>;
};

export const useToDoContext = (): ToDoContextType => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error('useToDoContext must be used within a ToDoProvider');
    }
    return context;
};

const StorageKey = 'toDoToggle';

export const getIsToDosVisible = (): boolean => {
    return localStorage.getItem(StorageKey) === 'on';
};

export const saveToDosVisible = (visible: boolean) => {
    localStorage.setItem(StorageKey, visible ? 'on' : 'off');
};
