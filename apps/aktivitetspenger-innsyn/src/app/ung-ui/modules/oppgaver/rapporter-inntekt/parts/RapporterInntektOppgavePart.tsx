import { Alert, Heading, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { useEffect, useRef, useState } from 'react';

import { AppText } from '../../../../../i18n';
import ForsideLenkeButton from '../../../../components/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusInfo from '../../../../components/oppgave-status-info/OppgaveStatusInfo';
import OppgaveStatusTag from '../../../../components/oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText } from '../../../../utils/textUtils';
import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePage';
import RapporterInntektKvittering from './RapporterInntektKvittering';
import RapporterInntektUbesvart from './RapporterInntektUbesvart';
import RapportertInntektOppsummering from './RapportertInntektOppsummering';

const RapporterInntektOppgavePart = ({
    deltakerNavn,
    oppgave,
    initialKvitteringData,
}: RapporterInntektOppgaveProps) => {
    const periode: DateRange = { from: oppgave.oppgavetypeData.fraOgMed, to: oppgave.oppgavetypeData.tilOgMed };
    const månedOgÅr = dateFormatter.monthFullYear(periode.from);
    const måned = dateFormatter.month(periode.from);

    const [kvitteringData, setKvitteringData] = useState<RapporterInntektKvitteringData | undefined>(
        initialKvitteringData,
    );

    const kvitteringAlertRef = useRef<HTMLDivElement>(null);

    const prevKvitteringData = usePrevious(kvitteringData);

    useEffect(() => {
        if (kvitteringData && prevKvitteringData === undefined && kvitteringAlertRef.current) {
            window.scrollTo(0, 0);
            kvitteringAlertRef.current.focus();
        }
    });

    const renderContent = () => {
        switch (oppgave.status) {
            case OppgaveStatus.AVBRUTT:
            case OppgaveStatus.UTLØPT:
                return <OppgaveStatusInfo oppgaveStatus={oppgave.status} />;
            case OppgaveStatus.ULØST:
                return (
                    <RapporterInntektUbesvart
                        deltakerNavn={deltakerNavn}
                        oppgave={oppgave}
                        initialKvitteringData={initialKvitteringData}
                        periode={periode}
                        måned={måned}
                        setKvitteringData={setKvitteringData}
                    />
                );
            case OppgaveStatus.LØST: {
                const arbeidstakerOgFrilansInntekt = oppgave.respons?.arbeidstakerOgFrilansInntekt;
                return (
                    <VStack gap="space-24">
                        {arbeidstakerOgFrilansInntekt === undefined ? (
                            /** Oppgaven er akkurat besvart og informasjonen er ikke kommet på oppgaven som er lastet inn */
                            <Alert variant="info">
                                <AppText id="rapporterInntektOppgavePart.løst.utenInfo" />
                            </Alert>
                        ) : (
                            <RapportertInntektOppsummering måned={måned} inntekt={arbeidstakerOgFrilansInntekt} />
                        )}
                    </VStack>
                );
            }
        }
    };

    return (
        <VStack gap="space-24">
            <div>
                <OppgaveStatusTag oppgaveStatus={oppgave.status} oppgaveStatusTekst={getOppgaveStatusText(oppgave)} />
            </div>
            <Heading level="1" size="large">
                <AppText id="rapporterInntektOppgavePart.tittel" values={{ månedOgÅr }} />
            </Heading>
            {kvitteringData ? (
                <RapporterInntektKvittering ref={kvitteringAlertRef} kvitteringData={kvitteringData} />
            ) : (
                <>
                    {renderContent()}
                    {oppgave.status !== OppgaveStatus.ULØST && (
                        <div>
                            <ForsideLenkeButton />
                        </div>
                    )}
                </>
            )}
        </VStack>
    );
};

export default RapporterInntektOppgavePart;
