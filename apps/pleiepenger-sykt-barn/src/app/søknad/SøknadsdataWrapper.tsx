import React, { useState } from 'react';
import { ImportertSøknadMetadata } from '../types/ImportertSøknad';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { SøknadsdataContextProvider } from './SøknadsdataContext';

interface Props {
    initialSøknadsdata: Søknadsdata;
    children: React.ReactNode;
}

const SøknadsdataWrapper: React.FunctionComponent<Props> = ({ initialSøknadsdata, children }) => {
    const [søknadsdata, setSøknadsdata] = useState<Søknadsdata>(initialSøknadsdata);
    const [importertSøknadMetadata, setImportertSøknadMetadata] = useState<ImportertSøknadMetadata | undefined>();
    return (
        <SøknadsdataContextProvider
            value={{
                søknadsdata,
                importertSøknadMetadata,
                setSøknadsdata: (søknadsdata) => setSøknadsdata(søknadsdata),
                setImportertSøknadMetadata: (metadata: ImportertSøknadMetadata) => setImportertSøknadMetadata(metadata),
            }}>
            {children}
        </SøknadsdataContextProvider>
    );
};

export default SøknadsdataWrapper;
