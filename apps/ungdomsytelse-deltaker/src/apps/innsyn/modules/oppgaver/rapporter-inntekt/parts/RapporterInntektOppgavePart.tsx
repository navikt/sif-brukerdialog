import ForsideLenkeButton from '@innsyn/atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import RapporterInntektForm from '@innsyn/modules/forms/rapporter-inntekt-form/RapporterInntektForm';
import { getOppgaveStatusText } from '@innsyn/utils/textUtils';
import { FormSummary, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { TallSvar } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { AppText } from '@shared/i18n';
import { getAppEnv } from '@shared/utils/appEnv';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePage';
import RapporterInntektKvittering from './RapporterInntektKvittering';
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
        const harHattInntektMerEnn0 = arbeidstakerOgFrilansInntekt !== undefined && arbeidstakerOgFrilansInntekt > 0;
        return (
            <VStack gap="6">
                <div>
                    <OppgaveStatusTag
                        oppgaveStatus={oppgave.status}
                        oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    />
                </div>

                <Heading level="1" size="large">
                    <AppText id="rapporterInntektOppgavePart.tittel" values={{ månedOgÅr }} />
                </Heading>

                <section aria-labelledby="summaryHeading">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2" id="summaryHeading">
                                <AppText id="rapporterInntektOppgavePart.oppsummering" />
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="rapporterInntektOppgavePart.fikkUtbetaltLønn" values={{ måned }} />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {arbeidstakerOgFrilansInntekt ? <AppText id="Ja" /> : <AppText id="Nei" />}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            {harHattInntektMerEnn0 && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="rapporterInntektOppgavePart.lønnFørSkatt" />
                                    </FormSummary.Label>
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
                <AppText id="rapporterInntektOppgavePart.tittel" values={{ månedOgÅr }} />
            </Heading>
            {kvitteringData ? (
                <RapporterInntektKvittering ref={alertRef} kvitteringData={kvitteringData} />
            ) : (
                <VStack gap="10">
                    <GuidePanel>
                        <RapporterInntektOppgavetekst
                            deltakerNavn={deltakerNavn}
                            periode={periode}
                            svarfrist={oppgave.frist}
                        />
                    </GuidePanel>
                    <RapporterInntektForm
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
