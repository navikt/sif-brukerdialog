import InnsynBlueBox from '../../../atoms/innsyn-blue-box/InnsynBlueBox';
import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    fraOgMed: Date;
}

const DeltakelseIkkeStartetInfo = ({ fraOgMed }: Props) => (
    <InnsynBlueBox>
        <BodyLong size="large" style={{ fontWeight: '300' }}>
            Din første dag i ungdomsprogrammet er {dateFormatter.full(fraOgMed)}
        </BodyLong>
    </InnsynBlueBox>
);

export default DeltakelseIkkeStartetInfo;
