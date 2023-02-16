import React from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { useSoknadContext } from '../../søknad/SoknadContext';
import OmSøknaden from './components/OmSøknaden';
import VelkommenGuide from './components/VelkommenGuide';
import VelkommenPageForm from './VelkommenPageForm';
import { Person } from '../../types/Person';

const VelkommenPage = ({ søker }: { søker: Person }) => {
    const intl = useIntl();
    const { startSoknad } = useSoknadContext();
    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <Page title={intlHelper(intl, 'application.title')}>
            <VelkommenGuide navn={søker.fornavn} />

            <OmSøknaden />

            <Box margin="xxxl">
                <VelkommenPageForm onStart={startSoknad} />
            </Box>
        </Page>
    );
};

export default VelkommenPage;
