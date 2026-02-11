import './tilsynsordningMåned.css';

import { Box, Detail, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { ExpansionCardContent } from '@navikt/ds-react/ExpansionCard';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik-ds';
import {
    DateDurationMap,
    dateToISODate,
    durationIsZero,
    durationToISODuration,
    getDatesInDateRange,
    getDatesInMonthOutsideDateRange,
    getDurationsInDateRange,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useState } from 'react';

import EndretTag from '../../../components/tags/EndretTag';
import { AppText, useAppIntl } from '../../../i18n';
import { TidEnkeltdagEndring } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';
import TidsbrukKalender from '../tidsbruk-kalender/TidsbrukKalender';
import TilsynsordningEnkeltdagDialog from '../tilsynsordning-enkeltdag/TilsynsordningEnkeltdagDialog';

export type EnkeltdagChangeEvent = (evt: TidEnkeltdagEndring) => void;
interface Props {
    måned: DateRange;
    tidTilsynsordning: DateDurationMap;
    tidTilsynsordningOpprinnelig?: DateDurationMap;
    månedTittelHeadingLevel?: '2' | '3' | '4';
    søknadsperiode: DateRange;
    defaultOpen?: boolean;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
}

const TilsynsordningMåned = ({
    måned,
    tidTilsynsordning,
    tidTilsynsordningOpprinnelig,
    søknadsperiode,
    defaultOpen,
    månedTittelHeadingLevel,
    onEnkeltdagChange,
}: Props) => {
    const { text } = useAppIntl();
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dagerMedTid: DateDurationMap = getDurationsInDateRange(tidTilsynsordning, måned);
    const dagerMedOpprinnelig: DateDurationMap = tidTilsynsordningOpprinnelig
        ? getDurationsInDateRange(tidTilsynsordningOpprinnelig, måned)
        : {};

    const dagerEndret = Object.keys(dagerMedTid).filter((key) => {
        const datoTid = dagerMedTid[key] ? durationToISODuration(dagerMedTid[key]) : undefined;
        const datoTidOpprinnelig = dagerMedOpprinnelig[key]
            ? durationToISODuration(dagerMedOpprinnelig[key])
            : undefined;
        return datoTid !== datoTidOpprinnelig;
    });

    const utilgjengeligeDatoer = getDatesInMonthOutsideDateRange(måned.from, måned);

    const antallDagerMedTilsynsordning = Object.keys({ ...dagerMedOpprinnelig, ...dagerMedTid }).filter((key) => {
        const datoTid = dagerMedTid[key] || dagerMedOpprinnelig[key];
        return datoTid !== undefined && durationIsZero(datoTid) === false;
    }).length;

    const antallDagerUtenTilsynsordning = Object.keys({ ...dagerMedOpprinnelig, ...dagerMedTid }).filter((key) => {
        const datoTid = dagerMedTid[key] || dagerMedOpprinnelig[key];
        return datoTid !== undefined && durationIsZero(datoTid) === true;
    }).length;

    const dagerIMåned = getDatesInDateRange(måned, true);

    const antallDagerUtenInformasjon = dagerIMåned.filter((date) => {
        const key = dateToISODate(new Date(date));
        const datoTid = dagerMedTid[key] || dagerMedOpprinnelig[key];
        return datoTid === undefined; // && durationIsZero(datoTid) === false;
    }).length;

    const antallDagerIMåned = dagerIMåned.length;

    const label = text('tilsynsordningMåned.ukeOgÅr', { ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') });
    const antallDagerEndret = Object.keys(dagerEndret).length;
    return (
        <ExpansionCard defaultOpen={defaultOpen} aria-label={label} size="small">
            <ExpansionCard.Header>
                <VStack gap="space-6">
                    <ExpansionCard.Title size="small" as="div">
                        <HStack gap="space-16" justify="start">
                            <Box className="capsFirstLetter" marginBlock="space-2 space-0">
                                <Heading level={månedTittelHeadingLevel || '3'} size="small">
                                    <AppText
                                        id="tilsynsordningMåned.ukeOgÅr"
                                        values={{ ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') }}
                                    />
                                </Heading>
                            </Box>
                            {antallDagerEndret === 0 ? null : (
                                <span>
                                    <EndretTag size="small">
                                        <AppText
                                            id="tilsynsordningMåned.dagerRegistrert.dager"
                                            values={{ dager: antallDagerEndret }}
                                        />
                                    </EndretTag>
                                </span>
                            )}
                        </HStack>
                    </ExpansionCard.Title>

                    <HStack gap="space-8">
                        {antallDagerIMåned === antallDagerUtenInformasjon ? (
                            <>Ingen informasjon registrert</>
                        ) : (
                            <>
                                <Detail as="span">Dager med omsorgstilbud: {antallDagerMedTilsynsordning}</Detail>

                                {antallDagerUtenTilsynsordning > 0 && (
                                    <Detail as="span">Dager uten omsorgstilbud: {antallDagerUtenTilsynsordning}</Detail>
                                )}
                                {antallDagerUtenInformasjon > 0 && (
                                    <Detail as="span">Ukjente dager: {antallDagerUtenInformasjon}</Detail>
                                )}
                            </>
                        )}
                    </HStack>
                </VStack>
            </ExpansionCard.Header>
            <ExpansionCardContent>
                <TidsbrukKalender
                    måned={måned}
                    dagerMedTid={dagerMedTid}
                    dagerMedTidOpprinnelig={tidTilsynsordningOpprinnelig}
                    utilgjengeligeDatoer={utilgjengeligeDatoer}
                    skjulTommeDagerIListe={false}
                    visOpprinneligTid={true}
                    skjulUkerMedKunUtilgjengeligeDager={true}
                    onDateClick={
                        onEnkeltdagChange
                            ? (dato) => {
                                  const tid: Partial<InputTime> = dagerMedTid[dateToISOString(dato)] || undefined;
                                  setEditDate({ dato, tid });
                              }
                            : undefined
                    }
                />
                {editDate && onEnkeltdagChange && (
                    <TilsynsordningEnkeltdagDialog
                        open={editDate !== undefined}
                        formProps={{
                            periode: søknadsperiode,
                            dato: editDate.dato,
                            tid: editDate.tid,
                            tidOpprinnelig: dagerMedOpprinnelig[dateToISOString(editDate.dato)],
                            onSubmit: (evt: any) => {
                                setEditDate(undefined);
                                setTimeout(() => {
                                    /** TimeOut pga komponent unmountes */
                                    onEnkeltdagChange(evt);
                                });
                            },
                            onCancel: () => setEditDate(undefined),
                        }}
                    />
                )}
            </ExpansionCardContent>
        </ExpansionCard>
    );
};

export default TilsynsordningMåned;
