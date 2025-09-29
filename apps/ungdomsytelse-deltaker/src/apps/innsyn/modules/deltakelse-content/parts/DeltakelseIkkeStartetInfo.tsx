import InnsynInfoBox from '@innsyn/atoms/innsyn-info-box/InnsynInfoBox';
import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    fraOgMed: Date;
}

const DeltakelseIkkeStartetInfo = ({ fraOgMed }: Props) => (
    <InnsynInfoBox>
        <VStack gap="6">
            <BodyLong size="large" weight="semibold">
                <AppText id="deltakelseIkkeStartetInfo.tekst1" values={{ fraOgMed: dateFormatter.full(fraOgMed) }} />
            </BodyLong>
            <BodyLong size="large" weight="semibold">
                <AppText id="deltakelseIkkeStartetInfo.tekst2" />
            </BodyLong>
        </VStack>
    </InnsynInfoBox>
);

export default DeltakelseIkkeStartetInfo;
