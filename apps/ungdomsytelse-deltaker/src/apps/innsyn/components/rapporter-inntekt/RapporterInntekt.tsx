import { Alert, BodyLong, Box, FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus, RapporterInntektOppgave } from '@navikt/ung-common';
import { getAppEnv } from '../../../../utils/appEnv';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import InntektForm from '../inntekt-form/InntektForm';
import BesvartOppgaveExpansionCart from '../besvart-oppgave-expansion-card/BesvartOppgaveExpansionCard';
import { TallSvar } from '@navikt/sif-common-ui';

interface Props {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
}

const RapporterInntekt = ({ deltakerNavn, oppgave }: Props) => {
    const [visKvittering, setVisKvittering] = useState<boolean>(false);
    const navigate = useNavigate();

    const alertRef = useRef<HTMLDivElement>(null);

    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            alertRef.current.focus();
        }
    });

    const periode: DateRange = { from: oppgave.oppgavetypeData.fraOgMed, to: oppgave.oppgavetypeData.tilOgMed };
    const måned = dateFormatter.monthFullYear(periode.from);
    const frist = dateFormatter.full(oppgave.svarfrist);

    const renderOppgaveTekst = () => {
        return (
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Hei {deltakerNavn}
                </Heading>
                <Box maxWidth="90%">
                    <BodyLong spacing>
                        Hadde du inntekt i {måned}, må du gi oss beskjed innen {frist}.
                    </BodyLong>
                    <BodyLong spacing>
                        Hadde du ingen inntekt, trenger du ikke gjøre noe eller du kan svare nei.
                    </BodyLong>
                </Box>
            </VStack>
        );
    };

    if (oppgave.status !== OppgaveStatus.ULØST) {
        const arbeidstakerOgFrilansInntekt = oppgave.oppgavetypeData.rapportertInntekt?.arbeidstakerOgFrilansInntekt;
        return (
            <VStack gap="6">
                <Heading level="1" size="large">
                    Rapporter inntekt
                </Heading>
                <BesvartOppgaveExpansionCart
                    oppgavestatus={oppgave.status}
                    oppsummering={`Hadde du inntekt i ${måned}`}>
                    {renderOppgaveTekst()}
                </BesvartOppgaveExpansionCart>

                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="3">Du svarte</FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>Hadde du inntekt i {måned}?</FormSummary.Label>
                            <FormSummary.Value>{arbeidstakerOgFrilansInntekt ? 'Ja' : 'Nei'}</FormSummary.Value>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                    {arbeidstakerOgFrilansInntekt && (
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Inntekt</FormSummary.Label>
                                <FormSummary.Value>
                                    <TallSvar verdi={arbeidstakerOgFrilansInntekt} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    )}
                </FormSummary>

                <div>
                    <ForsideLenkeButton />
                </div>
            </VStack>
        );
    }

    return (
        <VStack gap="6">
            <Heading level="1" size="large">
                Rapporter inntekt
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
                <VStack gap="10">
                    <GuidePanel>{renderOppgaveTekst()}</GuidePanel>
                    <InntektForm
                        måned={måned}
                        oppgaveReferanse={oppgave.oppgaveReferanse}
                        onSuccess={() => setVisKvittering(true)}
                        onCancel={() => navigate(getAppEnv()[EnvKey.PUBLIC_PATH])}
                    />
                </VStack>
            )}
        </VStack>
    );
};

export default RapporterInntekt;
