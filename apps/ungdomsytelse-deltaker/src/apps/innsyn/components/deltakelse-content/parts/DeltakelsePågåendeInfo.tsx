import { BodyLong } from '@navikt/ds-react';
import InnsynBlueBox from '../../../atoms/innsyn-blue-box/InnsynBlueBox';

const DeltakelsePågåendeInfo = () => {
    return (
        <InnsynBlueBox>
            <BodyLong size="large" weight="semibold">
                Husk å melde fra mellom 1. - 6. hver måned hvis du starter å jobbe og får utbetalt lønn mens du er i
                ungdoms&shy;programmet.
            </BodyLong>
        </InnsynBlueBox>
    );
};

export default DeltakelsePågåendeInfo;
