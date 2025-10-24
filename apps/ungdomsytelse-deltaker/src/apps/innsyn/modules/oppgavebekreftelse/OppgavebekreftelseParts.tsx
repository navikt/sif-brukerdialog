import ForsideLenkeButton from '@innsyn/atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusInfo from '@innsyn/components/oppgave-status-info/OppgaveStatusInfo';
import UtalelseForm, { UttalelseSvaralternativer } from '@innsyn/modules/forms/uttalelse-form/UtalelseForm';
import { Alert, Box, BoxNew, FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { BekreftelseDto, OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppText, useAppIntl } from '@shared/i18n';
import { AppRoutes } from '@shared/utils/AppRoutes';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSvaralternativer, getTilbakemeldingFritekstLabel, getTilbakemeldingSpørsmål } from '../../utils/textUtils';
import { useOppgavebekreftelse } from './hooks/useOppgavebekreftelse';

interface OppgaveOgTilbakemeldingProps {
    beskjedFraNav: React.ReactNode;
    spørsmål: string;
    svaralternativer: UttalelseSvaralternativer;
    bekreftelse: BekreftelseDto;
}

const OppgaveOgTilbakemelding = ({
    beskjedFraNav,
    spørsmål,
    svaralternativer,
    bekreftelse,
}: OppgaveOgTilbakemeldingProps) => {
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
                        <FormSummary.Value>
                            {bekreftelse.harUttalelse
                                ? svaralternativer.harUttalelseLabel
                                : svaralternativer.harIkkeUttalelseLabel}
                        </FormSummary.Value>
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
        <VStack gap="8">
            <section aria-label={appIntl.text('oppgavebekreftelse.oppgavetekst.ariaLabel')}>
                <GuidePanel>
                    <VStack gap="4">
                        <Heading level="2" size="medium">
                            <AppText id="oppgavebekreftelse.ubesvart.tittel" values={{ deltakerNavn }} />
                        </Heading>
                        <Box maxWidth="90%">{children}</Box>
                    </VStack>
                </GuidePanel>
            </section>
            <section aria-label={appIntl.text('oppgavebekreftelse.uttalelseform.ariaLabel')}>
                <UtalelseForm
                    svaralternativer={getSvaralternativer(oppgave, appIntl)}
                    spørsmål={getTilbakemeldingSpørsmål(oppgave, appIntl)}
                    uttalelseLabel={getTilbakemeldingFritekstLabel(oppgave, appIntl)}
                    oppgaveReferanse={oppgave.oppgaveReferanse}
                    onSuccess={() => setVisKvittering(true)}
                    onCancel={() => navigate(AppRoutes.innsyn)}
                />
            </section>
        </VStack>
    );
};

interface KvitteringProps {
    children: React.ReactNode;
}

const Kvittering = ({ children }: KvitteringProps) => {
    const { visKvittering } = useOppgavebekreftelse();
    const alertRef = useRef<HTMLDivElement>(null);
    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            window.scrollTo(0, 0);
            alertRef.current.focus();
        }
    }, [visKvittering, prevVisKvittering]);

    if (!visKvittering) return null;

    return (
        <>
            <Alert variant="success" tabIndex={-1} ref={alertRef}>
                <Heading level="2" size="small" spacing>
                    <AppText id="oppgavebekreftelse.kvittering.tittel" />
                </Heading>
                {children}
            </Alert>
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
                    svaralternativer={getSvaralternativer(oppgave, appIntl)}
                    spørsmål={getTilbakemeldingSpørsmål(oppgave, appIntl)}
                    bekreftelse={oppgave.bekreftelse}
                />
            );
        }

        // Hvis ingen bekreftelse er tilgjengelig
        if (oppgave.status === OppgaveStatus.LØST && !oppgave.bekreftelse) {
            return (
                <Alert variant="info">
                    <AppText id="oppgavebekreftelse.besvart.svarMangler" />
                </Alert>
            );
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
