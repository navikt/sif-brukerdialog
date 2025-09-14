import { BodyLong } from '@navikt/ds-react';

import InnsynBlueBox from '../../../atoms/innsyn-blue-box/InnsynBlueBox';

const DeltakelsePågåendeInfo = () => {
    return (
        <InnsynBlueBox>
            <BodyLong size="large" weight="semibold">
                Husk å melde fra innen 6. hver måned hvis du jobbet og fikk lønn måneden før. Du får et varsel på SMS
                når du skal melde fra.
            </BodyLong>
        </InnsynBlueBox>
    );
};

export default DeltakelsePågåendeInfo;
