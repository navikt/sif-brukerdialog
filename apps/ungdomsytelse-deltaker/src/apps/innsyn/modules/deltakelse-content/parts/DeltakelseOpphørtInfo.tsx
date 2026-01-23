import { InfoCard } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';

const DeltakelseOpphørtInfo = () => {
    return (
        <InfoCard data-color="warning">
            <InfoCard.Header>
                <InfoCard.Title>
                    <AppText id="deltakelseOpphørtInfo.tekst" />
                </InfoCard.Title>
            </InfoCard.Header>
        </InfoCard>
    );
};

export default DeltakelseOpphørtInfo;
