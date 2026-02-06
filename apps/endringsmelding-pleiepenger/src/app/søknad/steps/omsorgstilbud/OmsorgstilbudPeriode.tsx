import { Button, Heading, VStack } from '@navikt/ds-react';
import { DateDurationMap, dateFormatter, DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { useState } from 'react';

import OmsorgstilbudPeriodeDialog from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/components/omsorgstilbud-periode-dialog/OmsorgstilbudPeriodeDialog';
import OmsorgstilbudMåned, {
    EnkeltdagChangeEvent,
} from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/OmsorgstilbudMåned';
import { oppdaterDagerMedOmsorgstilbudIPeriode } from './omsorgstilbudStepUtils';

interface Props {
    søknadsperiode: DateRange;
    endredeTilsynsdager?: DateDurationMap;
    opprinneligTilsynsdager: DateDurationMap;
    onEnkeltdagChange?: EnkeltdagChangeEvent;
    onPeriodeChange: (tid: DateDurationMap) => void;
}

const OmsorgstilbudPeriode = ({
    søknadsperiode,
    opprinneligTilsynsdager,
    endredeTilsynsdager = {},
    onEnkeltdagChange,
    onPeriodeChange,
}: Props) => {
    const månederISøknadsperiode = dateRangeUtils.getMonthsInDateRange(søknadsperiode);
    const [visPeriodeDialog, setVisPeriodeDialog] = useState(false);
    return (
        <>
            <VStack gap="space-16">
                <Heading level="3" size="medium">
                    Søknadsperioden {dateFormatter.dayCompactDate(søknadsperiode.from)} -{' '}
                    {dateFormatter.dayCompactDate(søknadsperiode.to)}
                </Heading>

                <div>
                    <Button type="button" variant="secondary" size="small" onClick={() => setVisPeriodeDialog(true)}>
                        Oppgi like uker for en periode
                    </Button>
                </div>

                <VStack gap="space-8">
                    {månederISøknadsperiode.map((måned) => {
                        return (
                            <div key={måned.from.toDateString()}>
                                <OmsorgstilbudMåned
                                    søknadsperiode={måned}
                                    måned={måned}
                                    tidOmsorgstilbud={endredeTilsynsdager}
                                    tidOmsorgstilbudOpprinnelig={opprinneligTilsynsdager}
                                    onEnkeltdagChange={onEnkeltdagChange}
                                />
                            </div>
                        );
                    })}
                </VStack>
            </VStack>
            <OmsorgstilbudPeriodeDialog
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

export default OmsorgstilbudPeriode;
