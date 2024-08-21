import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { AppText, useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds';
import { Søker } from '../../types';
import { StepCommonProps } from '../../types/StepCommonProps';
import OmSøknaden from './components/OmSøknaden';

type Props = StepCommonProps & { søker: Søker };

const VelkommenPage: React.FunctionComponent<Props> = ({ onValidSubmit, søker }) => {
    const { text } = useAppIntl();

    return (
        <SoknadVelkommenPage
            title={text('application.title')}
            onStartSøknad={onValidSubmit}
            guide={{
                navn: søker.fornavn,
                content: (
                    <>
                        <Block margin="l">
                            <BodyLong size="large">
                                <AppText id="page.velkommen.guide.ingress" />
                            </BodyLong>
                        </Block>
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
