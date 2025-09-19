import { Alert, FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { TallSvar } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RapporterInntektOppgave } from '../../../../../types/Oppgave';
import { getAppEnv } from '../../../../../utils/appEnv';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '../../../atoms/oppgave-status-tag/OppgaveStatusTag';
import InntektForm from '../../../forms/inntekt-form/InntektForm';
import { OppgavebekreftelseDevProps } from '../../../modules/oppgavebekreftelse/types';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import RapporterInntektOppgavetekst from './RapporterInntektOppgavetekst';

interface Props extends OppgavebekreftelseDevProps {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
}

const RapporterInntektOppgavePart = ({ deltakerNavn, oppgave, _devKvittering }: Props) => {
    const [visKvittering, setVisKvittering] = useState<boolean>(_devKvittering || false);
    const navigate = useNavigate();

    const alertRef = useRef<HTMLDivElement>(null);

    const prevVisKvittering = usePrevious(visKvittering);

    useEffect(() => {
        if (visKvittering && !prevVisKvittering && alertRef.current) {
            alertRef.current.focus();
        }
    });

    const periode: DateRange = { from: oppgave.oppgavetypeData.fraOgMed, to: oppgave.oppgavetypeData.tilOgMed };
    const månedOgÅr = dateFormatter.monthFullYear(periode.from);
    const måned = dateFormatter.month(periode.from);

    if (oppgave.status !== OppgaveStatus.ULØST && visKvittering === false) {
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
            {visKvittering ? (
                <>
                    <VStack gap="4">
                        <Alert variant="success" ref={alertRef} tabIndex={-1}>
                            <Heading level="2" size="small" spacing>
                                Svaret ditt er sendt inn
                            </Heading>
                            Vi får også opplysninger om lønnen din fra arbeidsgiver. Hvis det er forskjell på lønnen du
                            har sendt inn, og lønnen vi får fra arbeidsgiveren din, får du beskjed om det.
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
                        onSuccess={() => setVisKvittering(true)}
                        onCancel={() => navigate(getAppEnv()[EnvKey.PUBLIC_PATH])}
                    />
                </VStack>
            )}
        </VStack>
    );
};

export default RapporterInntektOppgavePart;
