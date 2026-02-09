import { BodyShort, Box, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { ExpansionCardContent } from '@navikt/ds-react/ExpansionCard';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik-ds';
import { DurationText } from '@navikt/sif-common-ui';
import {
    DateDurationMap,
    durationIsZero,
    durationToISODuration,
    getDatesInMonthOutsideDateRange,
    getDurationsInDateRange,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useState } from 'react';

import EndretTag from '../../../components/tags/EndretTag';
import { AppText, useAppIntl } from '../../../i18n';
import OmsorgstilbudEnkeltdagDialog from '../omsorgstilbud-enkeltdag/OmsorgstilbudEnkeltdagDialog';
import { TidEnkeltdagEndring } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';
import TidsbrukKalender from '../tidsbruk-kalender/TidsbrukKalender';

export type EnkeltdagChangeEvent = (evt: TidEnkeltdagEndring) => void;
interface Props {
    måned: DateRange;
    tidOmsorgstilbud: DateDurationMap;
    tidOmsorgstilbudOpprinnelig?: DateDurationMap;
    månedTittelHeadingLevel?: '2' | '3' | '4';
    søknadsperiode: DateRange;
    defaultOpen?: boolean;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
}

const OmsorgstilbudMåned = ({
    måned,
    tidOmsorgstilbud,
    tidOmsorgstilbudOpprinnelig,
    søknadsperiode,
    defaultOpen,
    månedTittelHeadingLevel,
    onEnkeltdagChange,
}: Props) => {
    const { text } = useAppIntl();
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dagerMedTid: DateDurationMap = getDurationsInDateRange(tidOmsorgstilbud, måned);
    const dagerMedOpprinnelig: DateDurationMap = tidOmsorgstilbudOpprinnelig
        ? getDurationsInDateRange(tidOmsorgstilbudOpprinnelig, måned)
        : {};

    const dagerEndret = Object.keys(dagerMedTid).filter((key) => {
        const datoTid = dagerMedTid[key] ? durationToISODuration(dagerMedTid[key]) : undefined;
        const datoTidOpprinnelig = dagerMedOpprinnelig[key]
            ? durationToISODuration(dagerMedOpprinnelig[key])
            : undefined;
        return datoTid !== datoTidOpprinnelig;
    });

    const utilgjengeligeDatoer = getDatesInMonthOutsideDateRange(måned.from, måned);

    const antallDagerMedOmsorgstilbud = Object.keys({ ...dagerMedOpprinnelig, ...dagerMedTid }).filter((key) => {
        const datoTid = dagerMedTid[key] || dagerMedOpprinnelig[key];
        return datoTid !== undefined && durationIsZero(datoTid) === false;
    }).length;

    const label = text('omsorgstilbudMåned.ukeOgÅr', { ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') });
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
                                        id="omsorgstilbudMåned.ukeOgÅr"
                                        values={{ ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') }}
                                    />
                                </Heading>
                            </Box>
                            {antallDagerEndret === 0 ? null : (
                                <span>
                                    <EndretTag size="small">
                                        <AppText
                                            id="omsorgstilbudMåned.dagerRegistrert.dager"
                                            values={{ dager: antallDagerEndret }}
                                        />
                                    </EndretTag>
                                </span>
                            )}
                        </HStack>
                    </ExpansionCard.Title>
                    <HStack gap="space-16">
                        <BodyShort as="span" size="small">
                            {antallDagerMedOmsorgstilbud} dager i omsorgstilbud
                        </BodyShort>
                    </HStack>
                </VStack>
            </ExpansionCard.Header>
            <ExpansionCardContent>
                <TidsbrukKalender
                    måned={måned}
                    dagerMedTid={dagerMedTid}
                    dagerMedTidOpprinnelig={tidOmsorgstilbudOpprinnelig}
                    utilgjengeligeDatoer={utilgjengeligeDatoer}
                    skjulTommeDagerIListe={false}
                    visOpprinneligTid={true}
                    skjulUkerMedKunUtilgjengeligeDager={true}
                    tidRenderer={({ tid }) => {
                        return <DurationText duration={tid} />;
                    }}
                    onDateClick={
                        onEnkeltdagChange
                            ? (dato) => {
                                  const tid: Partial<InputTime> = dagerMedTid[dateToISOString(dato)] || {
                                      hours: '',
                                      minutes: '',
                                  };
                                  setEditDate({ dato, tid });
                              }
                            : undefined
                    }
                />
                {editDate && onEnkeltdagChange && (
                    <OmsorgstilbudEnkeltdagDialog
                        open={editDate !== undefined}
                        formProps={{
                            periode: søknadsperiode,
                            dato: editDate.dato,
                            tid: editDate.tid,
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

export default OmsorgstilbudMåned;
