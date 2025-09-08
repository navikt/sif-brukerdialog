import { Alert, FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { dateFormatter } from '@navikt/sif-common-utils';
import { getAppEnv } from '../../../../../utils/appEnv';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import InntektForm from '../../../forms/inntekt-form/InntektForm';
import { TallSvar } from '@navikt/sif-common-ui';
import OppgaveStatusTag from '../../../components/oppgave-status-tag/OppgaveStatusTag';
import RapporterInntektOppgavetekst from './RapporterInntektOppgavetekst';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { RapporterInntektOppgave } from '../../../../../types/Oppgave';

interface Props {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
}

const RapporterInntektOppgavePart = ({ deltakerNavn, oppgave }: Props) => {
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
    const månedOgÅr = dateFormatter.monthFullYear(periode.from);
    const måned = dateFormatter.month(periode.from);

    if (oppgave.status !== OppgaveStatus.ULØST) {
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
                            Du vil om kort tid motta et oppdatert vedtak.
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
