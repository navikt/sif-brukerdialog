import TilsynsordningPeriodeDialog from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import TilsynsordningMåned, { EnkeltdagChangeEvent } from '@app/modules/tilsynsordning-måned/TilsynsordningMåned';
import { ArrowUndoIcon, PencilIcon } from '@navikt/aksel-icons';
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

    const tilbakestillAlleEndringer = () => {
        onRevert(søknadsperiode);
    };

    return (
        <>
            <VStack gap="space-16">
                <VStack gap="space-8">
                    <VStack gap="space-8" marginBlock="space-0 space-16">
                        <BodyLong as="div">
                            Velg måned og dag i kalenderen for å endre tiden i omsorgstilbud for enkeltdager, eller bruk
                            knappen &quot;Registrer tid for en periode&quot; for å oppdatere tiden for en periode.
                        </BodyLong>
                        <BodyLong as="div">
                            Du kan kun endre tid for dager som er innenfor tillatt endringsperiode.
                        </BodyLong>
                    </VStack>
                    <HStack gap="space-4" justify="space-between" marginBlock="space-0 space-8">
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
                                icon={<ArrowUndoIcon role="presentation" />}>
                                Tilbakestill alle endringer
                            </Button>
                        )}
                    </HStack>
                    {månederISøknadsperiode.map((måned) => {
                        return (
                            <TilsynsordningMåned
                                key={måned.from.toDateString()}
                                søknadsperiode={måned}
                                måned={måned}
                                tidTilsynsordning={endredeTilsynsdager}
                                tidTilsynsordningOpprinnelig={opprinneligTilsynsdager}
                                onEnkeltdagChange={onEnkeltdagChange}
                            />
                        );
                    })}
                </VStack>
            </VStack>
            <ConfirmationDialog
                title="Tilbakestille alle endringer"
                open={visTilbakestillEndringerDialog}
                okLabel="Ja, tilbakestill"
                cancelLabel="Nei, avbryt"
                onConfirm={() => {
                    tilbakestillAlleEndringer();
                    setVisTilbakestillEndringerDialog(false);
                }}
                onCancel={() => setVisTilbakestillEndringerDialog(false)}>
                Bekreft at du ønsker å tilbakestille alle endringer du har gjort for omsorgstilbudet i denne
                søknadsperioden.
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
