import DeltaksleHeader from './components/DeltakelseHeader';
import HentDeltakerPage from './pages/HentDeltakerPage';

import { useDeltaker } from './context/DeltakerContext';
import RegistrertDeltaker from './pages/DeltakerPage';
import { Deltaker } from './types/Deltaker';

const MainContent = () => {
    const { deltaker, setDeltaker } = useDeltaker();

    const onDeltakerHentet = (deltaker: Deltaker) => {
        setDeltaker(deltaker);
    };

    const onByttDeltaker = () => {
        setDeltaker();
    };
    return (
        <main>
            {deltaker ? (
                <>
                    <DeltaksleHeader deltaker={deltaker} onByttDeltaker={onByttDeltaker} />
                    <RegistrertDeltaker />
                </>
            ) : (
                <HentDeltakerPage onDeltakerHentet={onDeltakerHentet} />
            )}
        </main>
    );
};

export default MainContent;
