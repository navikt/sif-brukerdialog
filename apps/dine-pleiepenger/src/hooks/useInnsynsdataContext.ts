import { useContext } from 'react';
import { InnsynsdataContext } from '../context/InnsynsdataContextProvider';

export const useInnsynsdataContext = () => useContext(InnsynsdataContext);
