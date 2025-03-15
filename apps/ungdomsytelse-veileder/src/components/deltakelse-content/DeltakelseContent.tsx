import { Alert, Box, VStack } from '@navikt/ds-react';
import DeltakelsePeriodeInfo from './parts/DeltakelsePeriodeInfo';
import DeltakelseHandlinger from './parts/DeltakelseHandlinger';
import DeltakelseEndringerOgVarsler from './parts/DeltakelseEndringerOgVarsler';
import { useDeltakelse } from '../../context/DeltakelseContext';
import ArticleViewer from '../article-viewer/ArticleViewer';

const DeltakelseContent = () => {
    const { deltakelse, deltaker } = useDeltakelse();
    return (
        <Box className="pb-8 pt-4">
            <VStack gap="8">
                {deltakelse.harSøkt === false ? (
                    <Alert variant="warning">Søknad om ungdomsytelse er ikke mottatt fra deltaker</Alert>
                ) : null}

                <ArticleViewer />

                <DeltakelsePeriodeInfo deltakelse={deltakelse} />

                <DeltakelseHandlinger deltakelse={deltakelse} deltaker={deltaker} />

                <DeltakelseEndringerOgVarsler deltakelse={deltakelse} />
            </VStack>
        </Box>
    );
};

export default DeltakelseContent;
