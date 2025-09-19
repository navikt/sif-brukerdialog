import ForsideLenkeButton from '@innsyn/atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import InntektForm from '@innsyn/modules/forms/inntekt-form/InntektForm';
import { getOppgaveStatusText } from '@innsyn/utils/textUtils';
import { Alert, BodyLong, FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { TallSvar } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { getAppEnv } from '@shared/utils/appEnv';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePage';
import RapporterInntektOppgavetekst from './RapporterInntektOppgavetekst';

const RapporterInntektOppgavePart = ({
    deltakerNavn,
    oppgave,
    initialKvitteringData,
}: RapporterInntektOppgaveProps) => {
    const [kvitteringData, setKvitteringData] = useState<RapporterInntektKvitteringData | undefined>(
        initialKvitteringData,
    );
    const navigate = useNavigate();

    const alertRef = useRef<HTMLDivElement>(null);

    const prevKvitteringData = usePrevious(kvitteringData);

    useEffect(() => {
        if (kvitteringData && prevKvitteringData === undefined && alertRef.current) {
            alertRef.current.focus();
        }
    });

    const periode: DateRange = { from: oppgave.oppgavetypeData.fraOgMed, to: oppgave.oppgavetypeData.tilOgMed };
    const månedOgÅr = dateFormatter.monthFullYear(periode.from);
    const måned = dateFormatter.month(periode.from);

    if (oppgave.status !== OppgaveStatus.ULØST && kvitteringData === undefined) {
        const arbeidstakerOgFrilansInntekt = oppgave.oppgavetypeData.rapportertInntekt?.arbeidstakerOgFrilansInntekt;
        return (
            <VStack gap="6">
                <div>
                    <OppgaveStatusTag
                        oppgaveStatus={oppgave.status}
                        oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    />
                </div>

                <Heading level="1" size="large">
                    Lønn i {månedOgÅr}
                </Heading>

                <section aria-labelledby="summaryHeading">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2" id="summaryHeading">
                                Oppsummering
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Fikk du utbetalt lønn i {måned}?</FormSummary.Label>
                                <FormSummary.Value>{arbeidstakerOgFrilansInntekt ? 'Ja' : 'Nei'}</FormSummary.Value>
                            </FormSummary.Answer>
                            {arbeidstakerOgFrilansInntekt && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>Lønn (før skatt)</FormSummary.Label>
                                    <FormSummary.Value>
                                        <TallSvar verdi={arbeidstakerOgFrilansInntekt} />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </FormSummary.Answers>
                    </FormSummary>
                </section>

                <div>
                    <ForsideLenkeButton />
                </div>
            </VStack>
        );
    }

    return (
        <VStack gap="6">
            <Heading level="1" size="large">
                Lønn i {månedOgÅr}
            </Heading>
            {kvitteringData ? (
                <>
                    <VStack gap="4">
                        <Alert variant="success" ref={alertRef} tabIndex={-1}>
                            <Heading level="2" size="small" spacing>
                                Svaret ditt er sendt inn
                            </Heading>
                            {kvitteringData.harHattInntekt ? (
                                <BodyLong>
                                    Vi får også opplysninger om lønnen din fra arbeidsgiver. Hvis det er forskjell på
                                    lønnen du har sendt inn, og lønnen vi får fra arbeidsgiveren din, får du beskjed om
                                    det.
                                </BodyLong>
                            ) : (
                                <BodyLong>Takk for at du ga oss beskjed.</BodyLong>
                            )}
                        </Alert>
                    </VStack>
                    <div>
                        <ForsideLenkeButton />
                    </div>
                </>
            ) : (
                <VStack gap="10">
                    <GuidePanel>
                        <RapporterInntektOppgavetekst
                            deltakerNavn={deltakerNavn}
                            periode={periode}
                            svarfrist={oppgave.frist}
                        />
                    </GuidePanel>
                    <InntektForm
                        måned={måned}
                        oppgaveReferanse={oppgave.oppgaveReferanse}
                        onSuccess={(harRapportertInntekt) =>
                            setKvitteringData({ harHattInntekt: harRapportertInntekt })
                        }
                        onCancel={() => navigate(getAppEnv()[EnvKey.PUBLIC_PATH])}
                    />
                </VStack>
            )}
        </VStack>
    );
};

export default RapporterInntektOppgavePart;
