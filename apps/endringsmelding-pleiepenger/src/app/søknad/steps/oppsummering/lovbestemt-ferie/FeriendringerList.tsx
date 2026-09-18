import { FormSummary, Heading, List } from '@navikt/ds-react';
import { dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';

import { useAppIntl } from '../../../../i18n';
import { LovbestemtFeriePeriode } from '../../../../types';

interface Props {
    title: string;
    perioder: LovbestemtFeriePeriode[];
}

export const FerieendringerList = ({ title, perioder }: Props) => {
    const { locale } = useAppIntl();
    if (perioder.length === 0) {
        return null;
    }
    return (
        <FormSummary>
            <FormSummary.Header>
                <Heading level="3" size="small">
                    {title}
                </Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <List>
                        {perioder.map((periode) => (
                            <List.Item key={dateRangeToISODateRange(periode)}>
                                <div className="capsFirstLetter">
                                    {getDateRangeText(periode, locale, {
                                        compact: true,
                                        includeDayName: true,
                                    })}
                                </div>
                            </List.Item>
                        ))}
                    </List>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
