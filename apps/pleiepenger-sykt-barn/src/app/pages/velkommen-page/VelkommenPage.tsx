import React from 'react';
import { useAppIntl } from '@i18n/index';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { Søker } from '../../types';
import { StepCommonProps } from '../../types/StepCommonProps';
import OmSøknaden from './components/OmSøknaden';
import VelkommenGuide from './components/VelkommenGuide';
import SamtykkeForm from './SamtykkeForm';

type Props = StepCommonProps & { søker: Søker };

const VelkommenPage: React.FunctionComponent<Props> = ({ onValidSubmit, søker }) => {
    const { text } = useAppIntl();
    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <Page
            title={text('page.velkommen.tittel')}
            topContentRenderer={() => <SoknadHeader title={text('application.title')} />}>
            <VelkommenGuide navn={søker.fornavn} />
            <OmSøknaden />
            <SamtykkeForm onConfirm={onValidSubmit} />
        </Page>
    );
};

export default VelkommenPage;
