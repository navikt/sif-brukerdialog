import { useDeltaker } from '../../context/DeltakerContext';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';

const DeltakerPageHeader = () => {
    const { deltaker, closeDeltaker: lukkDeltaker } = useDeltaker();
    if (!deltaker) {
        return null;
    }
    return <DeltakerHeader deltaker={deltaker} onLukkDeltaker={() => lukkDeltaker()} />;
};

export default DeltakerPageHeader;
