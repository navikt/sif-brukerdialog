import { Alert, Bleed, BodyLong, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../../types/Deltakelse';
import { DeltakelseHandlinger, deltakelseKvoteErUtløpt } from '../../../utils/deltakelseUtils';

interface Props {
    deltakelse: Deltakelse;
    handlinger: DeltakelseHandlinger;
    onClickEndreSluttdato: () => void;
    onClickMeldUt: () => void;
}

const SluttdatoPanel = ({ deltakelse, handlinger, onClickEndreSluttdato, onClickMeldUt }: Props) => {
    if (handlinger.kanEndreSluttdato && deltakelse.tilOgMed) {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8">
                    <BodyShort weight="semibold" size="large" className="capitalize">
                        {dateFormatter.dayCompactDate(deltakelse.tilOgMed)}
                    </BodyShort>
                    <Box paddingBlock="space-8 space-0">
                        <Button variant="secondary" size="small" onClick={onClickEndreSluttdato}>
                            Endre sluttdato
                        </Button>
                    </Box>
                </VStack>
            </Bleed>
        );
    }

    if (handlinger.kanMeldesUt) {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8" maxWidth="40rem">
                    <BodyLong>
                        Når deltaker er meldt ut av ungdomsprogrammet før alle dagene i programmet er brukt opp, må
                        sluttdatoen registreres her.
                    </BodyLong>
                    <Box paddingBlock="space-8 space-0">
                        <Button variant="secondary" size="small" onClick={onClickMeldUt}>
                            Registrer sluttdato
                        </Button>
                    </Box>
                </VStack>
            </Bleed>
        );
    }

    if (deltakelseKvoteErUtløpt(deltakelse)) {
        return (
            <Bleed marginBlock="space-1">
                <VStack gap="space-8">
                    <BodyShort weight="semibold" size="large" className="capitalize">
                        {dateFormatter.dayCompactDate(deltakelse.kvoteMaksDato)}
                    </BodyShort>
                    <Alert variant="info" inline>
                        Deltakelse er avsluttet.
                    </Alert>
                </VStack>
            </Bleed>
        );
    }

    return (
        <Bleed marginBlock="space-1">
            <Alert variant="info" inline>
                Sluttdato kan foreløpig ikke settes.
            </Alert>
        </Bleed>
    );
};

export default SluttdatoPanel;
