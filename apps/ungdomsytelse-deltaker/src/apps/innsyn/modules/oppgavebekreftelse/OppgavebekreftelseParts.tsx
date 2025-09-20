import ForsideLenkeButton from '@innsyn/atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusInfo from '@innsyn/components/oppgave-status-info/OppgaveStatusInfo';
import UtalelseForm from '@innsyn/modules/forms/uttalelse-form/UtalelseForm';
import { Alert, Box, BoxNew, FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { BekreftelseDto, OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppRoutes } from '@shared/utils/AppRoutes';
import { useNavigate } from 'react-router-dom';

import { AppText, useAppIntl } from '../../../../i18n';
import { getTilbakemeldingFritekstLabel, getTilbakemeldingSpørsmål } from '../../utils/textUtils';
import { useOppgavebekreftelse } from './hooks/useOppgavebekreftelse';

interface OppgaveOgTilbakemeldingProps {
    beskjedFraNav: React.ReactNode;
    spørsmål: string;
    bekreftelse: BekreftelseDto;
}

const OppgaveOgTilbakemelding = ({ beskjedFraNav, spørsmål, bekreftelse }: OppgaveOgTilbakemeldingProps) => {
    const { text } = useAppIntl();
    return (
        <section aria-labelledby="summaryHeading">
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2" id="summaryHeading">
                        <AppText id="oppgaveOgTilbakemelding.header" />
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppgaveOgTilbakemelding.beskjedFraNav" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <Box marginBlock="2 0">
                                <BoxNew background="accent-moderate" borderRadius="large" padding="4">
                                    {beskjedFraNav}
                                </BoxNew>
                            </Box>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>{spørsmål}</FormSummary.Label>
                        <FormSummary.Value>{bekreftelse.harUttalelse ? text('Ja') : text('Nei')}</FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
                {bekreftelse.harUttalelse && bekreftelse.uttalelseFraBruker && (
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="oppgaveOgTilbakemelding.tilbakemeldingLabel" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <TextareaSvar text={bekreftelse.uttalelseFraBruker} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                )}
            </FormSummary>
        </section>
    );
};

interface UbesvartProps {
    children: React.ReactNode;
}

const Ubesvart = ({ children }: UbesvartProps) => {
    const appIntl = useAppIntl();
    const { oppgave, visKvittering, setVisKvittering, deltakerNavn } = useOppgavebekreftelse();
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
                harTilbakemeldingSpørsmål={getTilbakemeldingSpørsmål(oppgave, appIntl)}
                tilbakemeldingLabel={getTilbakemeldingFritekstLabel(oppgave, appIntl)}
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
    const { visKvittering } = useOppgavebekreftelse();

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
    children: React.ReactNode;
}

const Besvart = ({ children }: BesvartProps) => {
    const appIntl = useAppIntl();
    const { oppgave, visKvittering } = useOppgavebekreftelse();
    if (oppgave.status === OppgaveStatus.ULØST || visKvittering) return null;

    const oppgaveInnhold = (() => {
        if (oppgave.bekreftelse) {
            return (
                <OppgaveOgTilbakemelding
                    beskjedFraNav={children}
                    spørsmål={getTilbakemeldingSpørsmål(oppgave, appIntl)}
                    bekreftelse={oppgave.bekreftelse}
                />
            );
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

            <OppgaveStatusInfo oppgaveStatus={oppgave.status} />

            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export { Besvart, Kvittering, Ubesvart };
