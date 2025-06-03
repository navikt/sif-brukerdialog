import { Alert, Bleed, Box, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import UtalelseForm from '../uttalelse-form/UtalelseForm';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import { usePrevious } from '@navikt/sif-common-hooks';
import { useNavigate } from 'react-router-dom';
import { getAppEnv } from '../../../../utils/appEnv';
import { EnvKey } from '@navikt/sif-common-env';
import { BekreftelseOppgave } from '@navikt/ung-common';
import { OppgavebekreftelseTekster } from './Oppgavebekreftelse';
import OppgaveMeta from '../oppgave-meta/OppgaveMeta';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    oppgave: BekreftelseOppgave;
    children: React.ReactNode;
}

const UløstOppgavebekreftelse = ({ tekster, deltakerNavn, oppgave, children }: Props) => {
    const [visKvittering, setVisKvittering] = useState<boolean>(false);
    const navigate = useNavigate();

    const alertRef = useRef<HTMLDivElement>(null);

    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            alertRef.current.focus();
        }
    });

    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgave={oppgave} />
            </div>
            <Heading level="1" size="large">
                {tekster.tittel}
            </Heading>
            {visKvittering ? (
                <>
                    <VStack gap="4">
                        <Alert variant="success" size="small" ref={alertRef} tabIndex={-1}>
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
                            <Bleed marginBlock="5 0">
                                <OppgaveMeta oppgave={oppgave} />
                            </Bleed>
                        </VStack>
                    </GuidePanel>
                    <UtalelseForm
                        forstårOppgaveSpørsmål={tekster.forstårOppgaveSpørsmål}
                        oppgaveReferanse={oppgave.oppgaveReferanse}
                        onSuccess={() => setVisKvittering(true)}
                        onCancel={() => navigate(getAppEnv()[EnvKey.PUBLIC_PATH])}
                    />
                </>
            )}
        </VStack>
    );
};

export default UløstOppgavebekreftelse;
