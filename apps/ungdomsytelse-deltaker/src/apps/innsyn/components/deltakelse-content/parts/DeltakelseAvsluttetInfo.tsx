import InnsynInfoBox from '@innsyn/components/innsyn-info-box/InnsynInfoBox';
import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';
import { AppText } from '@shared/i18n';

interface Props {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
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
