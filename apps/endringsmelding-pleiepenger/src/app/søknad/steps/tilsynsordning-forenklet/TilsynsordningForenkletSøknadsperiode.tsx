import TilsynsordningPeriodeDialog from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-utils';
import { useState } from 'react';

import { oppdaterDagerMedOmsorgstilbudIPeriode } from './tilsynsordningForenkletStepUtils';
import { TilsynsordningEndring } from './types';

interface Props {
    søknadsperiode: DateRange;
    endringer: TilsynsordningEndring[];
    onChange: (endringer: TilsynsordningEndring[]) => void;
}

const TilsynsordningForenkletSøknadsperiode = ({ søknadsperiode, onChange }: Props) => {
    const [visPeriodeDialog, setVisPeriodeDialog] = useState(false);

    return (
        <>
            <VStack gap="space-16">
                <VStack gap="space-8">
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
                    </HStack>
                    Endringer liste
                </VStack>
            </VStack>

            <TilsynsordningPeriodeDialog
                isOpen={visPeriodeDialog}
                formProps={{
                    periode: søknadsperiode,
                    onCancel: () => setVisPeriodeDialog(false),
                    onSubmit: (values) => {
                        onChange(oppdaterDagerMedOmsorgstilbudIPeriode(values));
                        setTimeout(() => {
                            setVisPeriodeDialog(false);
                        });
                    },
                }}
            />
        </>
    );
};

export default TilsynsordningForenkletSøknadsperiode;
