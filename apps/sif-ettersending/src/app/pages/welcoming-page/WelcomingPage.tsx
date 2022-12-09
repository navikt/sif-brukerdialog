import { BodyLong } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import InfoDialog from '@navikt/sif-common-core-ds/lib/components/dialogs/info-dialog/InfoDialog';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import BehandlingAvPersonopplysningerContent from '../../components/information/behandling-av-personopplysninger-content/BehandlingAvPersonopplysningerContent';
import DinePlikterContent from '../../components/information/dine-plikter-content/DinePlikterContent';
import SamtykkeForm from './SamtykkeForm';
import { ApplicationType } from '../../types/ApplicationType';
import { useSoknadContext } from '../../soknad/SoknadContext';

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

interface Props {
    søknadstype: ApplicationType;
}

const WelcomingPage: React.FC<Props> = ({ søknadstype }) => {
    const [dialogState, setDialogState] = useState<DialogState>({});
    const { dinePlikterModalOpen, behandlingAvPersonopplysningerModalOpen } = dialogState;
    const intl = useIntl();
    const { startSoknad } = useSoknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, `application.title.${søknadstype}`)}
                topContentRenderer={() => <SoknadHeader title={intlHelper(intl, `banner.${søknadstype}`)} level="1" />}>
                <SifGuidePanel poster={true}>
                    <BodyLong as="div">{intlHelper(intl, 'welcomingPage.counsellor')}</BodyLong>
                </SifGuidePanel>

                <SamtykkeForm
                    onOpenDinePlikterModal={() => setDialogState({ dinePlikterModalOpen: true })}
                    openBehandlingAvPersonopplysningerModal={() =>
                        setDialogState({ behandlingAvPersonopplysningerModalOpen: true })
                    }
                    onStart={startSoknad}
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
