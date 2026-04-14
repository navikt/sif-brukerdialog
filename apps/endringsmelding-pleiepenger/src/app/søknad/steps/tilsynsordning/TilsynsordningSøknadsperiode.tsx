import TilsynsordningPeriodeDialog from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import TilsynsordningMåned, { EnkeltdagChangeEvent } from '@app/modules/tilsynsordning-måned/TilsynsordningMåned';
import { PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, HStack, VStack } from '@navikt/ds-react';
import { ConfirmationDialog } from '@navikt/sif-common-formik-ds';
import { DateDurationMap, DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { useState } from 'react';

import { oppdaterDagerMedOmsorgstilbudIPeriode } from './tilsynsordningStepUtils';

interface Props {
    søknadsperiode: DateRange;
    endredeTilsynsdager?: DateDurationMap;
    opprinneligTilsynsdager: DateDurationMap;
    harEndringer: boolean;
    onRevert: (søknadsperiode: DateRange) => void;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
    onPeriodeChange: (tid: DateDurationMap) => void;
}

const TilsynsordningSøknadsperiode = ({
    søknadsperiode,
    opprinneligTilsynsdager,
    endredeTilsynsdager = {},
    harEndringer,
    onRevert,
    onEnkeltdagChange,
    onPeriodeChange,
}: Props) => {
    const [visPeriodeDialog, setVisPeriodeDialog] = useState(false);
    const [visTilbakestillEndringerDialog, setVisTilbakestillEndringerDialog] = useState(false);
    const månederISøknadsperiode = dateRangeUtils
        .getMonthsInDateRange(søknadsperiode)
        .filter(dateRangeUtils.dateRangeIncludesWeekdays);

    const fjernAlleEndringer = () => {
        onRevert(søknadsperiode);
    };

    return (
        <>
            <VStack gap="space-16">
                <VStack gap="space-16">
                    <BodyLong as="div">
                        Legg til endring ved å velge dato i kalenderen, eller bruke knappen &quot;Registrer tid for en
                        periode&quot;. Hvis du velger en dato, vil du også få muligheten til å si at endringen skal
                        gjelde flere dager i perioden.
                    </BodyLong>
                    <HStack gap="space-4" justify="space-between">
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            data-color="accent"
                            onClick={() => setVisPeriodeDialog(true)}
                            icon={<PencilIcon role="presentation" />}>
                            Registrer tid for en periode
                        </Button>
                        {harEndringer && (
                            <Button
                                type="button"
                                variant="tertiary"
                                size="small"
                                data-color="accent"
                                onClick={() => setVisTilbakestillEndringerDialog(true)}
                                icon={<TrashIcon role="presentation" />}>
                                Fjern alle endringer
                            </Button>
                        )}
                    </HStack>
                    <VStack gap="space-8">
                        {månederISøknadsperiode.map((måned) => {
                            return (
                                <TilsynsordningMåned
                                    key={måned.from.toDateString()}
                                    søknadsperiode={søknadsperiode}
                                    periode={måned}
                                    måned={måned}
                                    tidTilsynsordning={endredeTilsynsdager}
                                    tidTilsynsordningOpprinnelig={opprinneligTilsynsdager}
                                    onEnkeltdagChange={onEnkeltdagChange}
                                    onTilbakestillEndringer={(periode) => onRevert(periode)}
                                />
                            );
                        })}
                    </VStack>
                </VStack>
            </VStack>
            <ConfirmationDialog
                title="Fjern alle endringer"
                open={visTilbakestillEndringerDialog}
                okLabel="Ja, fjern"
                cancelLabel="Nei, avbryt"
                onConfirm={() => {
                    fjernAlleEndringer();
                    setVisTilbakestillEndringerDialog(false);
                }}
                onCancel={() => setVisTilbakestillEndringerDialog(false)}>
                Bekreft at du ønsker å fjerne alle endringer du har lagt til i denne søknadsperioden.
            </ConfirmationDialog>

            <TilsynsordningPeriodeDialog
                isOpen={visPeriodeDialog}
                formProps={{
                    periode: søknadsperiode,
                    onCancel: () => setVisPeriodeDialog(false),
                    onSubmit: (values) => {
                        onPeriodeChange(oppdaterDagerMedOmsorgstilbudIPeriode(values));
                        setTimeout(() => {
                            setVisPeriodeDialog(false);
                        });
                    },
                }}
            />
        </>
    );
};

export default TilsynsordningSøknadsperiode;
