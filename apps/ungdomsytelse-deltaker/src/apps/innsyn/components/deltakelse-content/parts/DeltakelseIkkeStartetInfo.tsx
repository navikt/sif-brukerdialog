import InnsynInfoBox from '@innsyn/components/innsyn-info-box/InnsynInfoBox';
import { BodyLong, VStack } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';
import { dateFormatter, ISODate } from '@sif/utils';

interface Props {
    fraOgMed: ISODate;
}

const DeltakelseIkkeStartetInfo = ({ fraOgMed }: Props) => (
    <InnsynInfoBox>
        <VStack gap="space-24">
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
