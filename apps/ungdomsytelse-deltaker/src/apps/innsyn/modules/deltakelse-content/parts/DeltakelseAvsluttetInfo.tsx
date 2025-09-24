import InnsynInfoBox from '@innsyn/atoms/innsyn-info-box/InnsynInfoBox';
import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    fraOgMed: Date;
    tilOgMed: Date;
}
const DeltakelseAvsluttetInfo = ({ fraOgMed, tilOgMed }: Props) => {
    return (
        <InnsynInfoBox>
            <BodyLong size="large" weight="semibold">
                <AppText
                    id="deltakelseAvsluttetInfo.tekst"
                    values={{ fraOgMed: dateFormatter.full(fraOgMed), tilOgMed: dateFormatter.full(tilOgMed) }}
                />
            </BodyLong>
        </InnsynInfoBox>
    );
};

export default DeltakelseAvsluttetInfo;
