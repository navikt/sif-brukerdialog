import InnsynApp from './apps/innsyn/InnsynApp';
import SøknadApp from './apps/søknad/SøknadApp';
import HentDeltakerErrorPage from './components/pages/HentDeltakerErrorPage';
import IkkeTilgangPage from './components/pages/IkkeTilgangPage';
import LoadingPage from './components/pages/LoadingPage';
import { useDeltaker } from './context/DeltakerContext';

const Deltaker = () => {
    const { deltaker, ikkeTilgangÅrsak, error, loading } = useDeltaker();

    if (error) {
        return <HentDeltakerErrorPage error={error} />;
    }
    if (loading) {
        return <LoadingPage />;
    }
    if (ikkeTilgangÅrsak || !deltaker) {
        return <IkkeTilgangPage årsak={ikkeTilgangÅrsak} />;
    }

    const { deltakelser } = deltaker;

    const deltakelse = deltakelser[0];

    return deltakelse.harSøkt ? <InnsynApp /> : <SøknadApp />;
};

export default Deltaker;
