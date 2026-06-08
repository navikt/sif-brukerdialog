import { AppText, useAppIntl } from '@app/i18n';
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
    const { text } = useAppIntl();
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
                        <AppText id="tilsynsordningSøknadsperiode.info" />
                    </BodyLong>
                    <HStack gap="space-4" justify="space-between">
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            data-color="accent"
                            onClick={() => setVisPeriodeDialog(true)}
                            icon={<PencilIcon role="presentation" />}>
                            <AppText id="tilsynsordningSøknadsperiode.leggTilEndring" />
                        </Button>
                        {harEndringer && (
                            <Button
                                type="button"
                                variant="tertiary"
                                size="small"
                                data-color="accent"
                                onClick={() => setVisTilbakestillEndringerDialog(true)}
                                icon={<TrashIcon role="presentation" />}>
                                <AppText id="tilsynsordningSøknadsperiode.fjernAlleEndringer" />
                            </Button>
                        )}
                    </HStack>
                    <VStack gap="space-8">
                        {månederISøknadsperiode.map((måned) => {
                            return (
                                <TilsynsordningMåned
                                    key={måned.from.toDateString()}
                                    søknadsperiode={søknadsperiode}
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
                title={text('tilsynsordningSøknadsperiode.fjernAlleEndringer')}
                open={visTilbakestillEndringerDialog}
                okLabel={text('tilsynsordningSøknadsperiode.bekreftFjern.okLabel')}
                cancelLabel={text('tilsynsordningSøknadsperiode.bekreftFjern.cancelLabel')}
                onConfirm={() => {
                    fjernAlleEndringer();
                    setVisTilbakestillEndringerDialog(false);
                }}
                onCancel={() => setVisTilbakestillEndringerDialog(false)}>
                <AppText id="tilsynsordningSøknadsperiode.bekreftFjern.innhold" />
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
