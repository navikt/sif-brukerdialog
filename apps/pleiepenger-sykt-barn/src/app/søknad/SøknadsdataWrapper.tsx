import React, { useState } from 'react';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { SøknadsdataContextProvider } from './SøknadsdataContext';

interface Props {
    initialSøknadsdata: Søknadsdata;
    children: React.ReactNode;
}

const SøknadsdataWrapper: React.FunctionComponent<Props> = ({ initialSøknadsdata, children }) => {
    const [søknadsdata, setSøknadsdata] = useState<Søknadsdata>(initialSøknadsdata);
    return (
        <SøknadsdataContextProvider
            value={{
                søknadsdata,
                setSøknadsdata: (søknadsdata) => setSøknadsdata(søknadsdata),
            }}>
            {children}
        </SøknadsdataContextProvider>
    );
};

export default SøknadsdataWrapper;
