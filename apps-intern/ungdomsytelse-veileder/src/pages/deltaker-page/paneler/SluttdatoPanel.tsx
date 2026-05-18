import { Alert, BodyLong, Box, Button } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../../types/Deltakelse';
import { DeltakelseHandlinger, deltakelsePeriodeErUtløpt } from '../../../utils/deltakelseUtils';
import { PeriodeInfoPanel } from '../../../components/periode-info-panel/PeriodeInfoPanel';

interface Props {
    deltakelse: Deltakelse;
    handlinger: DeltakelseHandlinger;
    onClickEndreSluttdato: () => void;
    onClickMeldUt: () => void;
}

const SluttdatoPanel = ({ deltakelse, handlinger, onClickEndreSluttdato, onClickMeldUt }: Props) => {
    if (deltakelse.tilOgMed) {
        return (
            <PeriodeInfoPanel title={dateFormatter.dayCompactDate(deltakelse.tilOgMed)}>
                {handlinger.kanEndreSluttdato && (
                    <Box paddingBlock="space-8 space-0">
                        <Button variant="secondary" size="small" onClick={onClickEndreSluttdato}>
                            Endre sluttdato
                        </Button>
                    </Box>
                )}
            </PeriodeInfoPanel>
        );
    }

    if (handlinger.kanMeldesUt) {
        return (
            <PeriodeInfoPanel>
                <BodyLong>
                    Når deltaker er meldt ut av ungdomsprogrammet før alle dagene i programmet er brukt opp, må
                    sluttdatoen registreres her.
                </BodyLong>
                <Box paddingBlock="space-8 space-0">
                    <Button variant="secondary" size="small" onClick={onClickMeldUt}>
                        Registrer sluttdato
                    </Button>
                </Box>
            </PeriodeInfoPanel>
        );
    }

    if (deltakelsePeriodeErUtløpt(deltakelse)) {
        return (
            <PeriodeInfoPanel title={dateFormatter.dayCompactDate(deltakelse.forlengetPeriodeMaksDato)}>
                <Alert variant="info" inline>
                    Deltakelse er avsluttet.
                </Alert>
            </PeriodeInfoPanel>
        );
    }

    return (
        <PeriodeInfoPanel>
            <Alert variant="info" inline>
                Sluttdato kan ikke settes.
            </Alert>
        </PeriodeInfoPanel>
    );
};

export default SluttdatoPanel;
