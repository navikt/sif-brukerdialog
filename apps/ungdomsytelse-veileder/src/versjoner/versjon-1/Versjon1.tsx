import { Page } from '@navikt/ds-react';
import AppHeader from './components/AppHeader';
import { DeltakerProvider } from './context/DeltakerContext';
import MainContent from './MainContent';

const Versjon1 = () => {
    return (
        <Page>
            <AppHeader />
            <DeltakerProvider>
                <MainContent />
            </DeltakerProvider>
        </Page>
    );
};

export default Versjon1;
