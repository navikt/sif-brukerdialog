import InnsynBlueBox from '../../../atoms/innsyn-blue-box/InnsynBlueBox';
import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    fraOgMed: Date;
}

const DeltakelseIkkeStartetInfo = ({ fraOgMed }: Props) => (
    <InnsynBlueBox>
        <VStack gap="6">
            <BodyLong size="large" weight="semibold">
                Du ble meldt inn i ungdomsprogrammet <strong>{dateFormatter.full(fraOgMed)}</strong>. Fra denne datoen
                mottar du penger gjennom ungdomsprogramytelsen.
            </BodyLong>
            <BodyLong size="large" weight="semibold">
                Etter første måned i ungdomsprogrammet må du melde ifra hvis du starter å jobbe og får utbetalt lønn.
            </BodyLong>
        </VStack>
    </InnsynBlueBox>
);

export default DeltakelseIkkeStartetInfo;
