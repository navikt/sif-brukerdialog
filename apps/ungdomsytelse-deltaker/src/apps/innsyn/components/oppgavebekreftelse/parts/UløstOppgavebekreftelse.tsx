import { Alert, Box, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UngdomsytelseOppgaveUttalelseDto } from '@navikt/k9-brukerdialog-prosessering-api';
import { usePrevious } from '@navikt/sif-common-hooks';
import { useAnalyticsInstance } from '../../../../../utils/analytics';
import { AppRoutes } from '../../../../../utils/AppRoutes';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import UtalelseForm from '../../../forms/uttalelse-form/UtalelseForm';
import { LogMetaInfoType, logUtils } from '../../../utils/logUtils';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import OppgaveStatusTag from '../../oppgave-status-tag/OppgaveStatusTag';
import { OppgavebekreftelseTekster } from '../Oppgavebekreftelse';
import { BekreftelseOppgave } from '../../../../../types/Oppgave';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    oppgave: BekreftelseOppgave;
    children: React.ReactNode;
}

const UløstOppgavebekreftelse = ({ tekster, deltakerNavn, oppgave, children }: Props) => {
    const [visKvittering, setVisKvittering] = useState<boolean>(false);
    const navigate = useNavigate();
    const { logEvent } = useAnalyticsInstance();

    const alertRef = useRef<HTMLDivElement>(null);
    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            alertRef.current.focus();
        }
    });

    const handleOnSuccess = (uttalelse: UngdomsytelseOppgaveUttalelseDto) => {
        setVisKvittering(true);
        logEvent(
            LogMetaInfoType.OPPGAVEBEKREFTELSE_SENDT,
            logUtils.getOppgaveBekreftelseMeta(oppgave, { harUttalelse: uttalelse.harUttalelse }),
        );
    };

    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgaveStatus={oppgave.status} oppgaveStatusTekst={getOppgaveStatusText(oppgave)} />
            </div>
            <Heading level="1" size="large">
                {tekster.oppgavetittel}
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
