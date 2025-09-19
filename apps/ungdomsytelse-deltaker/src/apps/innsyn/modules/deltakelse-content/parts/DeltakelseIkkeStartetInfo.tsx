import InnsynBlueBox from '@innsyn/atoms/innsyn-blue-box/InnsynBlueBox';
import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    fraOgMed: Date;
}

const DeltakelseIkkeStartetInfo = ({ fraOgMed }: Props) => (
    <InnsynBlueBox>
        <VStack gap="6">
            <BodyLong size="large" weight="semibold">
                <AppText id="deltakelseIkkeStartetInfo.tekst1" values={{ fraOgMed: dateFormatter.full(fraOgMed) }} />
            </BodyLong>
            <BodyLong size="large" weight="semibold">
                <AppText id="deltakelseIkkeStartetInfo.tekst2" />
            </BodyLong>
        </VStack>
    </InnsynBlueBox>
);

export default DeltakelseIkkeStartetInfo;
