import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import { Deltakelse as DeltakelseContent, OppgaveStatus } from '@navikt/ung-common';
import { getPeriodeÅpenForInntektsrapportering } from '../utils/deltakelseUtils';
import OppgavePanel from './oppgaver/OppgavePanel';
import LøsteOppgaver from './løste-oppgaver/LøsteOppgaver';
import { DeltakelsePeriode } from '@navikt/ung-common/src/types/DeltakelsePeriode';
import RapporterInntekt from './rapporter-inntekt/RapporterInntekt';
import { dateFormatter, DateRange, dateRangeFormatter, getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useAppIntl } from '../../../i18n';

interface Props {
    deltakelse: DeltakelsePeriode;
}

const DeltakelseContent = ({ deltakelse }: Props) => {
    const { intl } = useAppIntl();
    const { rapporteringsPerioder, oppgaver, programPeriode, id } = deltakelse;
    // const tidligerePerioder = getTidligereRapporteringsperioder(rapporteringsPerioder || []);
    const rapporterInntektPeriode = getPeriodeÅpenForInntektsrapportering(rapporteringsPerioder || []);
    const today = getDateToday();

    const from = dayjs(today).add(1, 'month').startOf('month').toDate();
    const nesteMånedRapporteringsperiode: DateRange = {
        from,
        to: dayjs(from).add(5, 'days').toDate(),
    };

    const uløsteOppgaver = oppgaver.filter((oppgave) => oppgave.status === OppgaveStatus.ULØST);
    const løsteOppgaver = oppgaver.filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST);

    return (
        <VStack gap="8">
            {uløsteOppgaver.map((oppgave, index) => (
                <OppgavePanel key={index} oppgave={oppgave} deltakelseId={id} programPeriode={programPeriode} />
            ))}
            {rapporterInntektPeriode ? (
                <RapporterInntekt rapporteringsperiode={rapporterInntektPeriode} />
            ) : (
                <Alert variant="info">
                    Hvis du har inntekt i {dateFormatter.month(today)}, vil du få mulighet til rapportere dette til oss
                    i tidsrommet {dateRangeFormatter.getDateRangeText(nesteMånedRapporteringsperiode, intl.locale)}
                </Alert>
            )}

            {/* <Box>
                <Heading level="2" size="medium" spacing={true}>
                    Perioder og inntekt
                </Heading>
                <Periodeliste
                    erLåstForEndring={false}
                    perioder={tidligerePerioder || []}
                    programperiodeStartDato={deltakelse.programPeriode.from}
                />
            </Box> */}

            {løsteOppgaver.length > 0 ? (
                <Box>
                    <Heading level="2" size="medium" spacing={true}>
                        Historikk
                    </Heading>
                    <LøsteOppgaver oppgaver={løsteOppgaver} />
                </Box>
            ) : null}
        </VStack>
    );
};

export default DeltakelseContent;
