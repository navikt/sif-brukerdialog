import React from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import { Søker } from '../../types';
import { StepCommonProps } from '../../types/StepCommonProps';
import OmSøknaden from './components/OmSøknaden';
import VelkommenGuide from './components/VelkommenGuide';
import SamtykkeForm from './SamtykkeForm';

type Props = StepCommonProps & { søker: Søker };

const WelcomingPage: React.FunctionComponent<Props> = ({ onValidSubmit, søker }) => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, 'welcomingPage.sidetittel')}
                topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'application.title')} />}>
                <VelkommenGuide navn={søker.fornavn} />
                <OmSøknaden />
                <SamtykkeForm onConfirm={onValidSubmit} />
            </Page>
        </>
    );
};

export default WelcomingPage;
