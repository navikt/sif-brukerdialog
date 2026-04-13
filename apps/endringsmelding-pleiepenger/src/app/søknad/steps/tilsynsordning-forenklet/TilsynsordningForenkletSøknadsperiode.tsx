import TilsynsordningPeriodeDialog from '@app/modules/tilsynsordning-måned/components/tilsynsordning-periode-dialog/TilsynsordningPeriodeDialog';
import { Box, Button, HStack, InlineMessage, Switch, VStack } from '@navikt/ds-react';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { v4 } from 'uuid';

import { TilsynsordningEndretPeriode } from '../../../modules/tilsynsordning-endret-periode/TilsynsordningEndretPeriode';
import { EndringerKalender } from './EndringerKalender';
import { TilsynsordningPeriodeData } from './types';

interface Props {
    søknadsperiode: DateRange;
    endringerISøknadsperiode: TilsynsordningPeriodeData[] | undefined;
    onChange: (endringer: TilsynsordningPeriodeData[]) => void;
}

const TilsynsordningForenkletSøknadsperiode = ({ søknadsperiode, endringerISøknadsperiode = [], onChange }: Props) => {
    const [visKalender, setVisKalender] = useState(false);
    const [visPeriodeDialog, setVisPeriodeDialog] = useState<
        | {
              søknadsperiode: DateRange;
              endringerISøknadsperiode: TilsynsordningPeriodeData[];
              endretPeriode: TilsynsordningPeriodeData | undefined;
          }
        | undefined
    >(undefined);

    const sorterteEndringer = endringerISøknadsperiode.sort(
        (a, b) => a.periode.from.getTime() - b.periode.from.getTime(),
    );

    const tidsromEndringer: DateRange | undefined =
        sorterteEndringer.length > 0
            ? {
                  from: sorterteEndringer[0].periode.from,
                  to: sorterteEndringer[sorterteEndringer.length - 1].periode.to,
              }
            : undefined;

    return (
        <VStack gap="space-16">
            <VStack gap="space-32">
                {endringerISøknadsperiode.length === 0 ? (
                    <InlineMessage status="info">Ingen endringer registrert for denne perioden.</InlineMessage>
                ) : (
                    <VStack gap="space-32">
                        {endringerISøknadsperiode.map((p) => (
                            <TilsynsordningEndretPeriode
                                key={dateRangeToISODateRange(p.periode)}
                                endretPeriode={p}
                                onEdit={(endretPeriode) => {
                                    setVisPeriodeDialog({
                                        søknadsperiode,
                                        endringerISøknadsperiode: sorterteEndringer,
                                        endretPeriode,
                                    });
                                }}
                                onDelete={(endretPeriode) => {
                                    onChange(endringerISøknadsperiode.filter((e) => e.id !== endretPeriode.id));
                                }}
                            />
                        ))}
                    </VStack>
                )}
                <HStack gap="space-24" marginBlock="space-0 space-8">
                    <Button
                        type="button"
                        variant="secondary"
                        size="small"
                        data-color="accent"
                        onClick={() =>
                            setVisPeriodeDialog({ søknadsperiode, endringerISøknadsperiode, endretPeriode: undefined })
                        }>
                        Legg til endring
                    </Button>
                    {endringerISøknadsperiode.length > 0 && (
                        <Box>
                            <Switch size="small" checked={visKalender} onChange={() => setVisKalender(!visKalender)}>
                                Vis registrerte endringer i kalender
                            </Switch>
                        </Box>
                    )}
                </HStack>
                {tidsromEndringer && visKalender && (
                    <EndringerKalender tidsrom={tidsromEndringer} endringer={endringerISøknadsperiode} />
                )}
            </VStack>

            <TilsynsordningPeriodeDialog
                isOpen={visPeriodeDialog !== undefined}
                endretPeriode={visPeriodeDialog?.endretPeriode}
                endringerISøknadsperiode={endringerISøknadsperiode}
                formProps={{
                    periode: søknadsperiode,
                    onCancel: () => setVisPeriodeDialog(undefined),
                    onSubmit: (values) => {
                        const nyeEndringer: TilsynsordningPeriodeData[] = values.id
                            ? endringerISøknadsperiode.map((e) => (e.id === values.id ? values : e))
                            : [...endringerISøknadsperiode, { ...values, id: v4() }];
                        onChange(nyeEndringer);
                        setTimeout(() => {
                            setVisPeriodeDialog(undefined);
                        });
                    },
                }}
            />
        </VStack>
    );
};

export default TilsynsordningForenkletSøknadsperiode;
