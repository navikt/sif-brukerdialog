import InnsynInfoBox from '@innsyn/atoms/innsyn-info-box/InnsynInfoBox';
import { BodyLong } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';

const DeltakelsePågåendeInfo = () => {
    return (
        <InnsynInfoBox>
            <BodyLong size="large" weight="semibold">
                <AppText id="deltakelsePågåendeInfo.tekst" />
            </BodyLong>
        </InnsynInfoBox>
    );
};

export default DeltakelsePågåendeInfo;
