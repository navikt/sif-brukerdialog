import { Alert, Box, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { UngdomsytelseOppgaveUttalelseDto } from '@navikt/k9-brukerdialog-prosessering-api';
import { usePrevious } from '@navikt/sif-common-hooks';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAnalyticsInstance } from '../../../../../analytics/analytics';
import { DeltakerSkjemaId } from '../../../../../types/DeltakerSkjemaId';
import { BekreftelseOppgave } from '../../../../../types/Oppgave';
import { AppRoutes } from '../../../../../utils/AppRoutes';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import UtalelseForm from '../../../forms/uttalelse-form/UtalelseForm';
import { logUtils } from '../../../utils/logUtils';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import OppgaveStatusTag from '../../oppgave-status-tag/OppgaveStatusTag';
import { OppgavebekreftelseTekster } from '../types';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    oppgave: BekreftelseOppgave;
    children: React.ReactNode;
    _devKvittering?: boolean;
}

const UløstOppgavebekreftelse = ({ tekster, deltakerNavn, oppgave, _devKvittering = false, children }: Props) => {
    const [visKvittering, setVisKvittering] = useState<boolean>(_devKvittering);
    const navigate = useNavigate();
    const { logSkjemaFullført } = useAnalyticsInstance();

    const alertRef = useRef<HTMLDivElement>(null);
    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            alertRef.current.focus();
        }
    });

    const handleOnSuccess = (uttalelse: UngdomsytelseOppgaveUttalelseDto) => {
        setVisKvittering(true);
        logSkjemaFullført(
            DeltakerSkjemaId.OPPGAVEBEKREFTELSE,
            logUtils.getOppgaveBekreftelseMeta(oppgave, { harUttalelse: uttalelse.harUttalelse }),
        );
    };

    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgaveStatus={oppgave.status} oppgaveStatusTekst={getOppgaveStatusText(oppgave)} />
            </div>
            <Heading level="1" size="large">
                {tekster.sidetittel}
            </Heading>
            {visKvittering ? (
                <>
                    <VStack gap="4">
                        <Alert variant="success" ref={alertRef} tabIndex={-1}>
                            <Heading level="2" size="small" spacing>
                                Svaret ditt er sendt inn
                            </Heading>
                            Du vil om kort tid motta et oppdatert vedtak.
                        </Alert>
                    </VStack>
                    <div>
                        <ForsideLenkeButton />
                    </div>
                </>
            ) : (
                <>
                    <GuidePanel>
                        <VStack gap="4">
                            <Heading level="2" size="medium">
                                Hei {deltakerNavn}
                            </Heading>
                            <Box maxWidth="90%">{children}</Box>
                        </VStack>
                    </GuidePanel>
                    <UtalelseForm
                        harTilbakemeldingSpørsmål={tekster.harTilbakemeldingSpørsmål}
                        tilbakemeldingLabel={tekster.tilbakemeldingFritekstLabel}
                        oppgaveReferanse={oppgave.oppgaveReferanse}
                        onSuccess={handleOnSuccess}
                        onCancel={() => navigate(AppRoutes.innsyn)}
                    />
                </>
            )}
        </VStack>
    );
};

export default UløstOppgavebekreftelse;
