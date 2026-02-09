import { Button, VStack } from '@navikt/ds-react';
import { DateDurationMap, DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { useState } from 'react';

import TilsynsordningPeriodeDialog from '../../../local-sif-common-pleiepenger/components/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import OmsorgstilbudMåned, {
    EnkeltdagChangeEvent,
} from '../../../local-sif-common-pleiepenger/components/tilsynsordning-måned/TilsynsordningMåned';
import { oppdaterDagerMedOmsorgstilbudIPeriode } from './tilsynsordningStepUtils';

interface Props {
    søknadsperiode: DateRange;
    endredeTilsynsdager?: DateDurationMap;
    opprinneligTilsynsdager: DateDurationMap;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
    onPeriodeChange: (tid: DateDurationMap) => void;
}

const TilsynsordningSøknadsperiode = ({
    søknadsperiode,
    opprinneligTilsynsdager,
    endredeTilsynsdager = {},
    onEnkeltdagChange,
    onPeriodeChange,
}: Props) => {
    const [visPeriodeDialog, setVisPeriodeDialog] = useState(false);
    const månederISøknadsperiode = dateRangeUtils.getMonthsInDateRange(søknadsperiode);
    return (
        <>
            <VStack gap="space-16">
                <div>
                    <Button type="button" variant="tertiary" size="small" onClick={() => setVisPeriodeDialog(true)}>
                        Endre flere uker i en periode
                    </Button>
                </div>

                <VStack gap="space-8">
                    {månederISøknadsperiode.map((måned) => {
                        return (
                            <OmsorgstilbudMåned
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
