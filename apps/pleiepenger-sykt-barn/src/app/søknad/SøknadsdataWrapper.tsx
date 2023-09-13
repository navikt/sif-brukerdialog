import React, { useState } from 'react';
import useEffectOnce from '../hooks/useEffectOnce';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { extractSøknadsdataFromFormValues } from '../utils/formValuesToSøknadsdata/extractSøknadsdataFromFormValues';
import { SøknadsdataContextProvider } from './SøknadsdataContext';

interface Props {
    initialValues: SøknadFormValues;
    children: React.ReactNode;
}

const SøknadsdataWrapper: React.FunctionComponent<Props> = ({ initialValues, children }) => {
    const [søknadsdata, setSøknadsdata] = useState<Søknadsdata>({ isInitialized: false });

    useEffectOnce(() => {
        setSøknadsdata(extractSøknadsdataFromFormValues(initialValues));
    });

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
