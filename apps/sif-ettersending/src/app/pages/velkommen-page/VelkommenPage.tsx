import React from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import { useSoknadContext } from '../../soknad/SoknadContext';
import { Person } from '../../types/Person';
import { Søknadstype } from '../../types/Søknadstype';
import OmSøknaden from './OmSøknaden';

interface Props {
    søknadstype: Søknadstype;
    søker: Person;
}

const VelkommenPage: React.FC<Props> = ({ søknadstype, søker }) => {
    const { text } = useAppIntl();
    const { startSoknad } = useSoknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <SoknadVelkommenPage
            title={text(`application.title.${søknadstype}`)}
            onStartSøknad={startSoknad}
            submitButtonLabel={text('ettersendelse.samtykkeForm.submitButtonLabel')}
            guide={{
                navn: søker.fornavn,
                content: <AppText id="page.velkommen.guide.ingress" />,
            }}>
            <OmSøknaden />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
