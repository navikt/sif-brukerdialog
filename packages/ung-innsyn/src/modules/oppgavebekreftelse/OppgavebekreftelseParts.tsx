import { Alert, Box, FormSummary, Heading, VStack } from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { OppgaveResponsDto, OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { useEffect, useRef } from 'react';
import { SifGuidePanel } from '@sif/soknad-ui';

import { ForsideLenkeButton, OppgaveStatusInfo } from '../../components';

import { UngInnsynText, useUngInnsynIntl } from '../../i18n';
import { useOppgavePage } from '../../pages/hooks/useOppgavePage';
import { UttalelseSvaralternativer } from '../../types';
import { getSvaralternativer, getTilbakemeldingFritekstLabel, getTilbakemeldingSpørsmål } from '../../utils/textUtils';
import { UtalelseForm } from '../forms/uttalelse-form/UtalelseForm';
import { useOppgavebekreftelse } from './hooks/useOppgavebekreftelse';
import { RegelverkOgInnsynReadMore } from '../../components/readmore/RegelverkOgInnsynReadMore';
import { getLovLenker } from '../oppgavepaneler/oppgaveLovverk';

interface OppgaveOgTilbakemeldingProps {
    beskjedFraNav: React.ReactNode;
    spørsmål: string;
    svaralternativer: UttalelseSvaralternativer;
    respons: OppgaveResponsDto;
    beskjedFooter?: React.ReactNode;
}

const OppgaveOgTilbakemelding = ({
    beskjedFraNav,
    spørsmål,
    svaralternativer,
    respons,
    beskjedFooter,
}: OppgaveOgTilbakemeldingProps) => {
    return (
        <section aria-labelledby="summaryHeading">
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2" id="summaryHeading">
                        <UngInnsynText id="@ungInnsyn.oppgaveOgTilbakemelding.header" />
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <UngInnsynText id="@ungInnsyn.oppgaveOgTilbakemelding.beskjedFraNav" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <VStack gap="space-16">
                                <Box marginBlock="space-8 space-0">
                                    <Box background="accent-moderate" borderRadius="12" padding="space-16">
                                        {beskjedFraNav}
                                    </Box>
                                </Box>
                                {beskjedFooter}
                            </VStack>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>{spørsmål}</FormSummary.Label>
                        <FormSummary.Value>
                            {respons.type === 'VARSEL_SVAR' && respons.harUttalelse
                                ? svaralternativer.harUttalelseLabel
                                : svaralternativer.harIkkeUttalelseLabel}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
                {respons.type === 'VARSEL_SVAR' && respons.harUttalelse && respons.uttalelseFraBruker && (
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <UngInnsynText id="@ungInnsyn.oppgaveOgTilbakemelding.tilbakemeldingLabel" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <TextareaSvar text={respons.uttalelseFraBruker} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                )}
            </FormSummary>
        </section>
    );
};

export interface UbesvartProps {
    children: React.ReactNode;
}

const Ubesvart = ({ children }: UbesvartProps) => {
    const intl = useUngInnsynIntl();
    const { oppgave, visKvittering, setVisKvittering, navn } = useOppgavebekreftelse();
    const { onSuccess } = useOppgavePage();

    if (oppgave.status !== OppgaveStatus.ULØST || visKvittering) return null;

    return (
        <VStack gap="space-32">
            <section aria-label={intl.text('@ungInnsyn.oppgavebekreftelse.oppgavetekst.ariaLabel')}>
                <SifGuidePanel>
                    <VStack gap="space-16">
                        <Heading level="2" size="medium">
                            <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.ubesvart.tittel" values={{ navn }} />
                        </Heading>

                        <Box maxWidth="90%">{children}</Box>

                        <Box marginBlock="space-0 space-16">
                            <RegelverkOgInnsynReadMore ytelsetype={oppgave.ytelsetype} lenker={getLovLenker(oppgave)} />
                        </Box>
                    </VStack>
                </SifGuidePanel>
            </section>
            <section aria-label={intl.text('@ungInnsyn.oppgavebekreftelse.uttalelseform.ariaLabel')}>
                <UtalelseForm
                    oppgaveYtelsetype={oppgave.ytelsetype}
                    svaralternativer={getSvaralternativer(oppgave, intl)}
                    spørsmål={getTilbakemeldingSpørsmål(oppgave, intl)}
                    uttalelseLabel={getTilbakemeldingFritekstLabel(oppgave, intl)}
                    oppgaveReferanse={oppgave.oppgaveReferanse}
                    onSuccess={() => {
                        onSuccess?.();
                        setVisKvittering(true);
                    }}
                />
            </section>
        </VStack>
    );
};

export interface KvitteringProps {
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
                    <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.kvittering.tittel" />
                </Heading>
                {children}
            </Alert>
            <div>
                <ForsideLenkeButton />
            </div>
        </>
    );
};

export interface BesvartProps {
    children: React.ReactNode;
    beskjedFooter?: React.ReactNode;
}

const Besvart = ({ children, beskjedFooter }: BesvartProps) => {
    const intl = useUngInnsynIntl();
    const { oppgave, visKvittering } = useOppgavebekreftelse();
    if (oppgave.status === OppgaveStatus.ULØST || visKvittering) return null;

    const oppgaveInnhold = (() => {
        if (oppgave.respons) {
            return (
                <OppgaveOgTilbakemelding
                    beskjedFraNav={children}
                    svaralternativer={getSvaralternativer(oppgave, intl)}
                    spørsmål={getTilbakemeldingSpørsmål(oppgave, intl)}
                    respons={oppgave.respons}
                    beskjedFooter={beskjedFooter}
                />
            );
        }

        // Hvis ingen bekreftelse er tilgjengelig
        if (oppgave.status === OppgaveStatus.LØST && !oppgave.respons) {
            return (
                <Alert variant="info">
                    <UngInnsynText id="@ungInnsyn.oppgavebekreftelse.besvart.svarMangler" />
                </Alert>
            );
        }

        return null;
    })();

    return (
        <VStack gap="space-16">
            {oppgaveInnhold}
            <OppgaveStatusInfo oppgaveStatus={oppgave.status} />
            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export { Besvart, Kvittering, Ubesvart };
