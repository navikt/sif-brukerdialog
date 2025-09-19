import InnsynBlueBox from '@innsyn/atoms/innsyn-blue-box/InnsynBlueBox';
import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    fraOgMed: Date;
    tilOgMed: Date;
}
const DeltakelseAvsluttetInfo = ({ fraOgMed, tilOgMed }: Props) => {
    return (
        <InnsynBlueBox>
            <BodyLong size="large" weight="semibold">
                Du var i ungdomsprogrammet fra {dateFormatter.full(fraOgMed)} - {dateFormatter.full(tilOgMed)}.
            </BodyLong>
        </InnsynBlueBox>
    );
};

export default DeltakelseAvsluttetInfo;
