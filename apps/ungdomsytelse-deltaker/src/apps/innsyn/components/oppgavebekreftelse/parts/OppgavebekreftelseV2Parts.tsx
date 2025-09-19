import { Alert, Box, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '../../../../../utils/AppRoutes';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import UtalelseForm from '../../../forms/uttalelse-form/UtalelseForm';
import OppgaveStatusInfo from '../../oppgave-status-info/OppgaveStatusInfo';
import { useOppgavebekreftelseV2 } from '../OppgavebekreftelseV2';
import OppgaveUttalelse from './OppgaveUttalelse';

interface UbesvartProps {
    children: React.ReactNode;
    spørsmål: string;
    tilbakemeldingLabel: string;
}

const Ubesvart = ({ children, spørsmål, tilbakemeldingLabel }: UbesvartProps) => {
    const { oppgave, visKvittering, setVisKvittering, deltakerNavn } = useOppgavebekreftelseV2();
    const navigate = useNavigate();

    if (oppgave.status !== OppgaveStatus.ULØST || visKvittering) return null;

    return (
        <VStack gap="4">
            <GuidePanel>
                <VStack gap="4">
                    <Heading level="2" size="medium">
                        Hei {deltakerNavn}
                    </Heading>
                    <Box maxWidth="90%">{children}</Box>
                </VStack>
            </GuidePanel>
            <UtalelseForm
                harTilbakemeldingSpørsmål={spørsmål}
                tilbakemeldingLabel={tilbakemeldingLabel}
                oppgaveReferanse={oppgave.oppgaveReferanse}
                onSuccess={() => setVisKvittering(true)}
                onCancel={() => navigate(AppRoutes.innsyn)}
            />
        </VStack>
    );
};

interface KvitteringProps {
    children: React.ReactNode;
}

const Kvittering = ({ children }: KvitteringProps) => {
    const { visKvittering } = useOppgavebekreftelseV2();

    if (!visKvittering) return null;

    return (
        <>
            <VStack gap="4">
                <Alert variant="success" tabIndex={-1}>
                    <Heading level="2" size="small" spacing>
                        Svaret ditt er sendt inn
                    </Heading>
                    {children}
                </Alert>
            </VStack>
            <div>
                <ForsideLenkeButton />
            </div>
        </>
    );
};

interface BesvartProps {
    spørsmål: string;
    children: React.ReactNode;
}

const Besvart = ({ spørsmål, children }: BesvartProps) => {
    const { oppgave, visKvittering } = useOppgavebekreftelseV2();
    if (oppgave.status === OppgaveStatus.ULØST || visKvittering) return null;

    const oppgaveInnhold = (() => {
        if (oppgave.bekreftelse) {
            return <OppgaveUttalelse beskjedFraNav={children} spørsmål={spørsmål} bekreftelse={oppgave.bekreftelse} />;
        }

        // Hvis ingen bekreftelse er tilgjengelig
        if (oppgave.status === OppgaveStatus.LØST && !oppgave.bekreftelse) {
            return <Alert variant="info">Informasjon om hva du svarte er ikke tilgjengelig enda.</Alert>;
        }

        return null;
    })();

    return (
        <VStack gap="4">
            {oppgaveInnhold}

            {/* Felles elementer */}
            <OppgaveStatusInfo oppgaveStatus={oppgave.status} />

            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export { Besvart, Kvittering, Ubesvart };
