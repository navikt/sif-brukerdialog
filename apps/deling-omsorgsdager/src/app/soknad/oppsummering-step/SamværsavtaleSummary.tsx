import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { SøknadFordelingApiData } from '../../types/SoknadApiData';

interface Props {
    apiValues: SøknadFordelingApiData;
}

const SamværsavtaleSummary: React.FunctionComponent<Props> = ({
    apiValues: {
        fordeling: { samværsavtale },
    },
}) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.samværsavtale.header')}>
            <Box margin="l">
                {samværsavtale.length === 0 && (
                    <FormattedMessage id={'steg.oppsummering.samværsavtale.ikkelastetopp'} />
                )}
                {samværsavtale.length > 0 && <UploadedDocumentsList includeDeletionFunctionality={false} />}
            </Box>
        </SummarySection>
    );
};

export default SamværsavtaleSummary;
