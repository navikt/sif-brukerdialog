import InnsynBlueBox from '@innsyn/atoms/innsyn-blue-box/InnsynBlueBox';
import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    fraOgMed: Date;
    tilOgMed: Date;
}
const DeltakelseAvsluttetInfo = ({ fraOgMed, tilOgMed }: Props) => {
    return (
        <InnsynBlueBox>
            <BodyLong size="large" weight="semibold">
                <AppText
                    id="deltakelseAvsluttetInfo.tekst"
                    values={{ fraOgMed: dateFormatter.full(fraOgMed), tilOgMed: dateFormatter.full(tilOgMed) }}
                />
            </BodyLong>
        </InnsynBlueBox>
    );
};

export default DeltakelseAvsluttetInfo;
