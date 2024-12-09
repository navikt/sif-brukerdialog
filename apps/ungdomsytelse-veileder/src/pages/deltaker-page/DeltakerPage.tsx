import { useParams } from 'react-router-dom';
import DeltakerPageHeader from '../../components/DeltakerPageHeader';
import DeltakerPageContent from '../../components/DeltakerPageContent';
import { DeltakerProvider } from '../../context/DeltakerContext';

type DeltakerPageParams = {
    deltakerId: string;
};

const DeltakerPage = () => {
    const { deltakerId } = useParams<DeltakerPageParams>();

    return (
        <DeltakerProvider deltakerId={deltakerId}>
            <DeltakerPageHeader />
            <DeltakerPageContent />
        </DeltakerProvider>
    );
};

export default DeltakerPage;
