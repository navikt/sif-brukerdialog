import { BodyLong } from '@navikt/ds-react';
import { AppText, useAppIntl } from '@i18n/index';
import { Søker } from '@navikt/sif-common-api';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds';
import { StepCommonProps } from '../../types/StepCommonProps';
import OmSøknaden from './components/OmSøknaden';

type Props = StepCommonProps & { søker: Søker };

const VelkommenPage = ({ onValidSubmit, søker }: Props) => {
    const { text } = useAppIntl();

    return (
        <SoknadVelkommenPage
            title={text('application.title')}
            onStartSøknad={onValidSubmit}
            guide={{
                navn: søker.fornavn,
                content: (
                    <>
                        <BodyLong size="large">
                            <AppText id="page.velkommen.guide.ingress" />
                        </BodyLong>
                        <p>
                            <AppText id="page.velkommen.guide.tekst.1" />
                        </p>
                        <p>
                            <AppText id="page.velkommen.guide.tekst.2" />
                        </p>
                    </>
                ),
            }}>
            <OmSøknaden />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
