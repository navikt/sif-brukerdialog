import { AppMessageKeys, AppText, useAppIntl } from '@app/i18n';
import { LovbestemtFerieApiData } from '@app/types';
import { getLovbestemtFerieOppsummeringInfo } from '@app/utils';
import { Heading, List, VStack } from '@navikt/ds-react';
import { DateRange, dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';

interface Props {
    lovbestemtFerie: LovbestemtFerieApiData;
}

const Perioder = ({ tittel, perioder }: { tittel: AppMessageKeys; perioder: DateRange[] }) => {
    const { locale } = useAppIntl();
    if (perioder.length === 0) {
        return null;
    }
    return (
        <VStack gap="space-8">
            <Heading level="3" size="small">
                <AppText id={tittel} />
            </Heading>
            <List>
                {perioder.map((periode) => (
                    <List.Item key={dateRangeToISODateRange(periode)}>
                        <div className="capsFirstLetter">
                            {getDateRangeText(periode, locale, { compact: true, includeDayName: true })}
                        </div>
                    </List.Item>
                ))}
            </List>
        </VStack>
    );
};

const LovbestemtFerieOppsummering = ({ lovbestemtFerie }: Props) => {
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return (
        <VStack gap="space-16">
            <Perioder tittel="oppsummeringStep.ferie.lagtTil" perioder={perioderLagtTil} />
            <Perioder tittel="oppsummeringStep.ferie.fjernet" perioder={perioderFjernet} />
        </VStack>
    );
};

export default LovbestemtFerieOppsummering;
