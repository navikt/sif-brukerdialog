import { useEffect, useState } from 'react';
import { DeltakerInfo, fetchDeltakerInfo } from './api/fetchers/fetchDeltakerInfo';
import HentDeltakerErrorPage from './components/pages/HentDeltakerErrorPage';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';
import InnsynApp from './apps/innsyn/InnsynApp';
import SøknadApp from './apps/søknad/SøknadApp';
import { DeltakerContextProvider } from './context/DeltakerContext';
import FlereDeltakelserPage from './components/pages/FlereDeltakelserPage';
import IngenDeltakelsePage from './components/pages/IngenDeltakelsePage';

const DeltakerInfoLoader = () => {
    const [deltakerInfo, setDeltakerInfo] = useState<DeltakerInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const hentDeltakerInfo = async () => {
        try {
            const info = await fetchDeltakerInfo();
            setDeltakerInfo(info);
            setLoading(false);
        } catch (err) {
            setError('Kunne ikke laste data.');
        }
    };

    useEffect(() => {
        hentDeltakerInfo();
    });

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <HentDeltakerErrorPage error={error} />;
    }

    if (!deltakerInfo) {
        return <HentDeltakerErrorPage error="Ingen data lastet" />;
    }

    const { deltakelser } = deltakerInfo;

    if (deltakelser.length === 0) {
        return <IngenDeltakelsePage />;
    }

    if (deltakelser.length > 1) {
        return <FlereDeltakelserPage />;
    }

    const deltakelse = deltakerInfo.deltakelser[0];
    return (
        <DeltakerContextProvider søker={deltakerInfo.søker} deltakelse={deltakelse}>
            {deltakelse.harSøkt ? <InnsynApp /> : <SøknadApp />}
        </DeltakerContextProvider>
    );
};

export default DeltakerInfoLoader;
