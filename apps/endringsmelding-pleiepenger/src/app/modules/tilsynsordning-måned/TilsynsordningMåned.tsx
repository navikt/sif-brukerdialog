import './tilsynsordningMåned.css';

import EndretTag from '@app/components/tags/EndretTag';
import { AppText, useAppIntl } from '@app/i18n';
import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { Box, Button, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { ExpansionCardContent } from '@navikt/ds-react/ExpansionCard';
import { ConfirmationDialog, DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik-ds';
import {
    DateDurationMap,
    durationToISODuration,
    getDatesInMonthOutsideDateRange,
    getDurationsInDateRange,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TidEnkeltdagEndring } from '../../local-sif-common-pleiepenger/components/tid-enkeltdag-dialog/TidEnkeltdagForm';
import TidsbrukKalender from '../../local-sif-common-pleiepenger/components/tidsbruk-kalender/TidsbrukKalender';
import TilsynsordningEnkeltdagDialog from '../../local-sif-common-pleiepenger/components/tilsynsordning-enkeltdag/TilsynsordningEnkeltdagDialog';

export type EnkeltdagChangeEvent = (evt: TidEnkeltdagEndring) => void;
interface Props {
    /** Hele søknadsperioden måneden er innenfor */
    søknadsperiode: DateRange;
    /** Brukes til å låse måned */
    måned: DateRange;
    /** Avgrensning innenfor måned */
    periode: DateRange;
    tidTilsynsordning: DateDurationMap;
    tidTilsynsordningOpprinnelig?: DateDurationMap;
    månedTittelHeadingLevel?: '2' | '3' | '4';
    defaultOpen?: boolean;
    onTilbakestillEndringer?: (måned: DateRange) => void;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
}

const TilsynsordningMåned = ({
    måned,
    søknadsperiode,
    periode,
    tidTilsynsordning,
    tidTilsynsordningOpprinnelig,
    defaultOpen,
    månedTittelHeadingLevel,
    onTilbakestillEndringer,
    onEnkeltdagChange,
}: Props) => {
    const { text } = useAppIntl();
    const [visTilbakestillEndringerDialog, setVisTilbakestillEndringerDialog] = useState(false);
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();
    const månedNavn = dayjs(måned.from).format('MMMM YYYY');

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

    const label = text('tilsynsordningMåned.ukeOgÅr', { ukeOgÅr: månedNavn });
    const antallDagerEndret = Object.keys(dagerEndret).length;
    return (
        <ExpansionCard defaultOpen={defaultOpen} aria-label={label} size="small">
            <ExpansionCard.Header>
                <VStack gap="space-6">
                    <ExpansionCard.Title size="small" as="div">
                        <HStack gap="space-16" justify="start">
                            <Box className="capsFirstLetter" marginBlock="space-2 space-0">
                                <Heading level={månedTittelHeadingLevel || '3'} size="small">
                                    <AppText id="tilsynsordningMåned.ukeOgÅr" values={{ ukeOgÅr: månedNavn }} />
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
                </VStack>
            </ExpansionCard.Header>
            <ExpansionCardContent>
                <VStack gap="space-8" paddingBlock="space-0 space-8">
                    <TidsbrukKalender
                        måned={måned}
                        dagerMedTid={dagerMedTid}
                        dagerMedTidOpprinnelig={tidTilsynsordningOpprinnelig}
                        utilgjengeligeDatoer={utilgjengeligeDatoer}
                        skjulTommeDagerIListe={false}
                        visOpprinneligTid={false}
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
                    {antallDagerEndret > 0 && onTilbakestillEndringer && (
                        <HStack justify="end">
                            <Button
                                type="button"
                                variant="tertiary"
                                size="small"
                                data-color="accent"
                                onClick={() => setVisTilbakestillEndringerDialog(true)}
                                icon={<ArrowUndoIcon role="presentation" />}>
                                Fjern endringer i{' '}
                                <AppText id="tilsynsordningMåned.ukeOgÅr" values={{ ukeOgÅr: månedNavn }} />
                            </Button>
                        </HStack>
                    )}
                </VStack>
                {onTilbakestillEndringer && (
                    <ConfirmationDialog
                        title={`Fjern endringer i ${månedNavn}`}
                        open={visTilbakestillEndringerDialog}
                        okLabel="Ja, fjern"
                        cancelLabel="Nei, avbryt"
                        onConfirm={() => {
                            onTilbakestillEndringer(måned);
                            setVisTilbakestillEndringerDialog(false);
                        }}
                        onCancel={() => setVisTilbakestillEndringerDialog(false)}>
                        Bekreft at du ønsker å fjerne alle endringer du har lagt til i {månedNavn}.
                    </ConfirmationDialog>
                )}

                {editDate && onEnkeltdagChange && (
                    <TilsynsordningEnkeltdagDialog
                        open={editDate !== undefined}
                        formProps={{
                            søknadsperiode,
                            periode,
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
