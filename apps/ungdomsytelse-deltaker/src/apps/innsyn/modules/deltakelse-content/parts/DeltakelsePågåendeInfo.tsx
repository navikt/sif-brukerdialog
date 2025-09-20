import InnsynBlueBox from '@innsyn/atoms/innsyn-blue-box/InnsynBlueBox';
import { BodyLong } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';

const DeltakelsePågåendeInfo = () => {
    return (
        <InnsynBlueBox>
            <BodyLong size="large" weight="semibold">
                <AppText id="deltakelsePågåendeInfo.tekst" />
            </BodyLong>
        </InnsynBlueBox>
    );
};

export default DeltakelsePågåendeInfo;
