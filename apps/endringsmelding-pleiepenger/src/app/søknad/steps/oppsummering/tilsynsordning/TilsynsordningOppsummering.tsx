import './tilsynsordningOppsummering.css';

import TidsbrukKalender from '@app/components/tidsbruk-kalender/TidsbrukKalender';
import { AppText } from '@app/i18n';
import { TilsynsordningApiData } from '@app/types';
import { DagMedEndretTilsyn } from '@app/utils';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import {
    capsFirstCharacter,
    DateDurationMap,
    dateFormatter,
    DateRange,
    dateToISODate,
    getDatesInMonth,
    getMonthDateRange,
    ISODateToDate,
    isDateInDateRanges,
} from '@navikt/sif-common-utils';

import { oppsummeringStepUtils } from '../oppsummeringStepUtils';

interface Props {
    tilsynsordning: TilsynsordningApiData;
    tidOpprinnelig?: DateDurationMap;
    søknadsperioder?: DateRange[];
}

const getTidInnenforPerioder = (tid: DateDurationMap = {}, perioder?: DateRange[]): DateDurationMap => {
    if (!perioder) {
        return tid;
    }
    return Object.fromEntries(
        Object.entries(tid).filter(([key]) => isDateInDateRanges(ISODateToDate(key), perioder)),
    );
};

const getDatoerUtenforPerioder = (måned: Date, perioder?: DateRange[]): Date[] | undefined =>
    perioder ? getDatesInMonth(måned, true).filter((dato) => !isDateInDateRanges(dato, perioder)) : undefined;

const getDagerMedTid = (dager: DagMedEndretTilsyn[]): DateDurationMap =>
    Object.fromEntries(dager.map(({ dato, tid }) => [dateToISODate(dato), tid]));

const TilsynsordningOppsummering = ({ tilsynsordning, tidOpprinnelig, søknadsperioder }: Props) => {
    const månederMedDager = oppsummeringStepUtils.getMånederMedDagerEndretTilsyn(tilsynsordning, tidOpprinnelig);
    const tidOpprinneligISøknadsperioder = getTidInnenforPerioder(tidOpprinnelig, søknadsperioder);

    return (
        <VStack gap="space-32" marginBlock="space-8 space-0" className="tilsynsordningOppsummering">
            {månederMedDager.map(({ måned, dagerMedEndretTilsyn }) => (
                <VStack gap="space-8" key={dateToISODate(måned)}>
                    <Heading level="3" size="xsmall">
                        {capsFirstCharacter(dateFormatter.monthFullYear(måned))}{' '}
                        <BodyShort as="span" weight="regular">
                            <AppText
                                id="oppsummeringStep.tilsynsordning.dagerEndret"
                                values={{ antall: dagerMedEndretTilsyn.length }}
                            />
                        </BodyShort>
                    </Heading>
                    <TidsbrukKalender
                        måned={getMonthDateRange(måned)}
                        dagerMedTid={getDagerMedTid(dagerMedEndretTilsyn)}
                        dagerMedTidOpprinnelig={tidOpprinneligISøknadsperioder}
                        utilgjengeligeDatoer={getDatoerUtenforPerioder(måned, søknadsperioder)}
                        skjulTommeDagerIListe={false}
                        visOpprinneligTid={false}
                        skjulUkerMedKunUtilgjengeligeDager={true}
                        skjulUendredeDager={true}
                    />
                </VStack>
            ))}
        </VStack>
    );
};

export default TilsynsordningOppsummering;
