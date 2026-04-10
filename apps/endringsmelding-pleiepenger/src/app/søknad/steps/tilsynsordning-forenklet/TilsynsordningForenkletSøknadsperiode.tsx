import TilsynsordningPeriodeDialog from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-utils';
import { useState } from 'react';

import EndringTilsynsordningListe from '../../../modules/endring-tilsynsordning-liste/EndringTilsynsordningListe';
import { TilsynsordningPeriodeData } from './types';

interface Props {
    søknadsperiode: DateRange;
    endringer: TilsynsordningPeriodeData[] | undefined;
    onChange: (endringer: TilsynsordningPeriodeData[]) => void;
}

const TilsynsordningForenkletSøknadsperiode = ({ søknadsperiode, endringer = [], onChange }: Props) => {
    const [visPeriodeDialog, setVisPeriodeDialog] = useState<
        { søknadsperiode: DateRange; endring: TilsynsordningPeriodeData | undefined } | undefined
    >(undefined);

    return (
        <>
            <VStack gap="space-16">
                <EndringTilsynsordningListe
                    perioder={endringer}
                    onEdit={(periode) => {
                        setVisPeriodeDialog({
                            søknadsperiode,
                            endring: periode,
                        });
                    }}
                    onDelete={() => {
                        console.log('onDelete');
                        // onChange(fjernEndring(endringer, periode));
                    }}
                />
                <HStack gap="space-4" justify="space-between" marginBlock="space-0 space-8">
                    <Button
                        type="button"
                        variant="secondary"
                        size="small"
                        data-color="accent"
                        onClick={() => setVisPeriodeDialog({ søknadsperiode, endring: undefined })}
                        icon={<PencilIcon role="presentation" />}>
                        Registrer endring
                    </Button>
                </HStack>
            </VStack>

            <TilsynsordningPeriodeDialog
                isOpen={visPeriodeDialog !== undefined}
                formProps={{
                    periode: søknadsperiode,
                    onCancel: () => setVisPeriodeDialog(undefined),
                    onSubmit: (values) => {
                        const nyeEndringer: TilsynsordningPeriodeData[] = values.id
                            ? endringer.map((e) => (e.id === values.id ? values : e))
                            : [...endringer, values];
                        onChange(nyeEndringer);
                        setTimeout(() => {
                            setVisPeriodeDialog(undefined);
                        });
                    },
                }}
            />
        </>
    );
};

export default TilsynsordningForenkletSøknadsperiode;
