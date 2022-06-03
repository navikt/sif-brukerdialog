import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/components/layout/block/Block';
import InfoDialog from '@navikt/sif-common-core-ds/components/dialogs/info-dialog/InfoDialog';
import Page from '@navikt/sif-common-core-ds/components/page/Page';
import PageBanner from '@navikt/sif-common-core-ds/components/page/page-banner/PageBanner';
import intlHelper from '@navikt/sif-common-core-ds/utils/intlUtils';
import { StepConfigProps } from '../../../config/stepConfig';
import BehandlingAvPersonopplysningerContent from '../../information/behandling-av-personopplysninger-content/BehandlingAvPersonopplysningerContent';
import DinePlikterContent from '../../information/dine-plikter-content/DinePlikterContent';
import SamtykkeForm from './SamtykkeForm';

type Props = Omit<StepConfigProps, 'formValues'>;

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

const WelcomingPage = ({ onValidSubmit, søknadstype }: Props) => {
    const [dialogState, setDialogState] = useState<DialogState>({});
    const { dinePlikterModalOpen, behandlingAvPersonopplysningerModalOpen } = dialogState;
    const intl = useIntl();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, `application.title.${søknadstype}`)}
                topContentRenderer={() => (
                    <PageBanner level="2">{intlHelper(intl, `banner.${søknadstype}`)}</PageBanner>
                )}>
                <Block margin="xxl">
                    <Heading level="1" size="large" className="text-center">
                        {intlHelper(intl, `application.title.${søknadstype}`)}
                    </Heading>
                </Block>
                <Block margin="xl">
                    <GuidePanel poster className="sif-guidePanel">
                        <BodyShort>{intlHelper(intl, 'welcomingPage.counsellor')}</BodyShort>
                    </GuidePanel>
                </Block>

                <SamtykkeForm
                    onOpenDinePlikterModal={() => setDialogState({ dinePlikterModalOpen: true })}
                    openBehandlingAvPersonopplysningerModal={() =>
                        setDialogState({ behandlingAvPersonopplysningerModalOpen: true })
                    }
                    onConfirm={onValidSubmit}
                />
            </Page>
            <InfoDialog
                aria-label={intlHelper(intl, 'welcomingPage.modal.omDinePlikter.tittel')}
                open={dinePlikterModalOpen === true}
                onClose={(): void => setDialogState({ dinePlikterModalOpen: false })}>
                <DinePlikterContent søknadstype={søknadstype} />
            </InfoDialog>

            <InfoDialog
                open={behandlingAvPersonopplysningerModalOpen === true}
                onClose={(): void => setDialogState({ behandlingAvPersonopplysningerModalOpen: false })}
                aria-label={intlHelper(intl, 'welcomingPage.modal.behandlingAvPersonalia.tittel')}>
                <BehandlingAvPersonopplysningerContent søknadstype={søknadstype} />
            </InfoDialog>
        </>
    );
};

export default WelcomingPage;
