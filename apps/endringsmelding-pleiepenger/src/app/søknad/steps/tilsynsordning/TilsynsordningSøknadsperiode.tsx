import { ArrowUndoIcon, PencilIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, HStack, VStack } from '@navikt/ds-react';
import { DateDurationMap, DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { useState } from 'react';

import TilsynsordningPeriodeDialog from '../../../local-sif-common-pleiepenger/components/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import TilsynsordningMåned, {
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
                        <Button
                            type="button"
                            variant="tertiary"
                            size="small"
                            data-color="accent"
                            onClick={() => setVisPeriodeDialog(true)}
                            icon={<ArrowUndoIcon role="presentation" />}>
                            Tilbakestill alle endringer
                        </Button>
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
