/* eslint-disable no-constant-binary-expression */
import DeleteButton from '@app/components/buttons/DeleteButton';
import EditButton from '@app/components/buttons/EditButton';
import { Bleed, Box, Heading, HStack, Switch, VStack } from '@navikt/ds-react';
import AriaAlternative from '@navikt/sif-common-core-ds/src/atoms/aria-alternative/AriaAlternative';
import { dateFormatter, dateRangeUtils, getDatesInMonthOutsideDateRange } from '@navikt/sif-common-utils';
import { useState } from 'react';

import TidUkedager from '../../components/tid-ukedager/TidUkedager';
import { useAppIntl } from '../../i18n';
import TidsbrukKalender from '../../local-sif-common-pleiepenger/components/tidsbruk-kalender/TidsbrukKalender';
import { oppdaterDagerMedOmsorgstilbudIPeriode } from '../../søknad/steps/tilsynsordning/tilsynsordningStepUtils';
import { TilsynsordningPeriodeData } from '../../søknad/steps/tilsynsordning-forenklet/types';
import TilsynsordningMåned from '../tilsynsordning-måned/TilsynsordningMåned';

interface Props {
    endretPeriode: TilsynsordningPeriodeData;
    onEdit?: (periode: TilsynsordningPeriodeData) => void;
    onDelete?: (periode: TilsynsordningPeriodeData) => void;
}

export const TilsynsordningEndretPeriode = ({ endretPeriode, onEdit, onDelete }: Props) => {
    const [visKalender, setVisKalender] = useState(false);
    const { text } = useAppIntl();
    const { from, to } = endretPeriode.periode;
    const { periode, tidFasteDager } = endretPeriode;
    const fra = dateFormatter.dayCompactDate(from);
    const til = dateFormatter.dayCompactDate(to);
    const periodeTekst = fra === til ? fra : `${fra} - ${til}`;

    const endredeTilsynsdager = oppdaterDagerMedOmsorgstilbudIPeriode({ periode, tidFasteDager });

    const månederIPeriode = dateRangeUtils
        .getMonthsInDateRange(periode)
        .filter(dateRangeUtils.dateRangeIncludesWeekdays);

    const utilgjengeligeDatoer = getDatesInMonthOutsideDateRange(periode.from, periode);
    return (
        <Box>
            <VStack gap="space-12">
                <Heading size="xsmall" level="4" className="capitalize">
                    {periodeTekst}
                </Heading>
                <Box
                    borderColor="neutral-subtle"
                    borderRadius="8"
                    borderWidth="1"
                    padding="space-16"
                    background="neutral-softA">
                    <VStack gap="space-12">
                        <Heading level="4" size="xsmall" style={{ fontWeight: 'normal' }}>
                            Ukeplan for perioden
                        </Heading>
                        <TidUkedager fasteDager={tidFasteDager} />

                        {onEdit || onDelete ? (
                            <HStack gap="space-12" marginBlock="space-8 space-0">
                                {onEdit && (
                                    <EditButton
                                        variant="secondary"
                                        onClick={() => onEdit(endretPeriode)}
                                        title={text('endringTilsynsordningListe.endreEndring.label')}
                                        aria-label={text('endringTilsynsordningListe.endreEndring.ariaLabel', {
                                            periode: periodeTekst,
                                        })}>
                                        Endre
                                    </EditButton>
                                )}
                                {onDelete && (
                                    <DeleteButton
                                        variant="secondary"
                                        onClick={() => {
                                            onDelete(endretPeriode);
                                        }}
                                        title={text('endringTilsynsordningListe.fjernEndring.label')}
                                        aria-label={text('endringTilsynsordningListe.fjernEndring.ariaLabel', {
                                            periode: periodeTekst,
                                        })}>
                                        Fjern
                                    </DeleteButton>
                                )}
                                {1 + 1 === 3 && (
                                    <Box paddingInline="space-32">
                                        <Switch
                                            size="small"
                                            checked={visKalender}
                                            onChange={() => setVisKalender(!visKalender)}>
                                            Vis kalender
                                        </Switch>
                                    </Box>
                                )}
                            </HStack>
                        ) : null}
                        {!visKalender ? null : (
                            <VStack gap="space-8" marginBlock="space-16 space-0">
                                <AriaAlternative
                                    ariaText={
                                        <Heading level="4" size="small">
                                            Kalender
                                        </Heading>
                                    }
                                    visibleText={null}
                                />
                                {månederIPeriode.map((måned) => {
                                    return (
                                        <Bleed marginInline="space-8" key={måned.from.toDateString()}>
                                            <Box background="default" borderRadius="4" padding="space-8">
                                                <VStack gap="space-4" paddingBlock="space-8 space-0">
                                                    <Heading level="5" size="xsmall">
                                                        {dateFormatter.MonthFullYear(måned.from)}
                                                    </Heading>
                                                    {1 + 1 === 2 && (
                                                        <TidsbrukKalender
                                                            måned={måned}
                                                            dagerMedTid={endredeTilsynsdager}
                                                            skjulTommeDagerIListe={true}
                                                            utilgjengeligeDatoer={utilgjengeligeDatoer}
                                                            visOpprinneligTid={false}
                                                            skjulUkerMedKunUtilgjengeligeDager={true}
                                                        />
                                                    )}
                                                    {1 + 1 === 3 && (
                                                        <TilsynsordningMåned
                                                            key={måned.from.toDateString()}
                                                            søknadsperiode={måned}
                                                            måned={måned}
                                                            visOpprinneligTid={false}
                                                            tidTilsynsordning={endredeTilsynsdager}
                                                        />
                                                    )}
                                                </VStack>
                                            </Box>
                                        </Bleed>
                                    );
                                })}
                            </VStack>
                        )}
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};
