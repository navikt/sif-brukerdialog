import { useDeltakerContext } from '../../context/DeltakerContext';
import DeltakerHeader from '../../components/deltaker-header/DeltakerHeader';

const DeltakerPageHeader = () => {
    const { deltaker, closeDeltaker } = useDeltakerContext();
    if (!deltaker) {
        return null;
    }
    return <DeltakerHeader deltaker={deltaker} onLukkDeltaker={() => closeDeltaker()} />;
};

export default DeltakerPageHeader;
