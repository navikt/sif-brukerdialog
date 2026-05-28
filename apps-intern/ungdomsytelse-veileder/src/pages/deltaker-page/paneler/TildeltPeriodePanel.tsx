import { Bleed, BodyLong, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { useState } from 'react';
import ForlengPeriodeModal from '../../../components/forleng-periode-modal/ForlengPeriodeModal';
import { dateFormatter } from '@navikt/sif-common-utils';
import { getDeltakelseHandlinger } from '../../../utils/deltakelseUtils';

interface DatoBoksProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;

    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
}

const TildeltPeriodePanel = ({ deltaker, deltakelse, onDeltakelseChanged }: DatoBoksProps) => {
    const [visDialog, setVisDialog] = useState(false);

    const { harForlengetPeriode, periodeMaksDato, tilOgMed } = deltakelse;
    const { kanForlengePeriode } = getDeltakelseHandlinger(deltakelse);

    return (
        <>
            <Bleed marginBlock="space-1">
                <VStack gap="space-8" maxWidth="40rem">
                    <BodyShort weight="semibold" size="large">
                        {harForlengetPeriode ? '260 + 40' : '260'} dager
                    </BodyShort>
                    {!tilOgMed && (
                        <BodyLong>
                            Siste dag i perioden er <strong>{dateFormatter.dayCompactDate(periodeMaksDato)}</strong>.
                        </BodyLong>
                    )}

                    {kanForlengePeriode && (
                        <Box paddingBlock="space-8 space-0">
                            <Button variant="secondary" size="small" onClick={() => setVisDialog(true)}>
                                Registrer forlenget periode
                            </Button>
                        </Box>
                    )}
                </VStack>
            </Bleed>

            {visDialog ? (
                <ForlengPeriodeModal
                    onClose={() => setVisDialog(false)}
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onDeltakelseChanged={(d) => {
                        setVisDialog(false);
                        onDeltakelseChanged(d);
                    }}
                />
            ) : null}
        </>
    );
};

export default TildeltPeriodePanel;
