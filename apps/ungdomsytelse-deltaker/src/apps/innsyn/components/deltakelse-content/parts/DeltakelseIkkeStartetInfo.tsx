import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import InnsynBlueBox from '../../../atoms/innsyn-blue-box/InnsynBlueBox';

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
                På denne siden får du oppgaver mens du er i ungdomsprogrammet. Du trenger ikke gjøre noe med oppgavene
                før du får et varsel på SMS om det.
            </BodyLong>
        </VStack>
    </InnsynBlueBox>
);

export default DeltakelseIkkeStartetInfo;
