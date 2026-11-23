import { AppIntlShape, useAppIntl } from '@app/i18n';
import { InformationSquareFillIcon } from '@navikt/aksel-icons';
import { Tooltip } from '@navikt/ds-react';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';

import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
}

export const getKortUkeTooltipText = (periode: DateRange, text: AppIntlShape['text']): string =>
    text('ukeInfoTooltip.kortUke', { dager: getDagerPeriode(periode, text, false) });

const UkeInfoTooltip: React.FunctionComponent<Props> = ({ uke }) => {
    const { text } = useAppIntl();
    const { erKortUke } = uke;
    if (erKortUke) {
        return (
            <Tooltip content={getKortUkeTooltipText(uke.periode, text)}>
                <span style={{ fontSize: '1.4rem' }}>
                    <InformationSquareFillIcon
                        style={{ color: '#457c9d' }}
                        aria-label={getKortUkeTooltipText(uke.periode, text)}
                    />
                </span>
            </Tooltip>
        );
    }
};

const getDagerPeriode = ({ from, to }: DateRange, text: AppIntlShape['text'], visDato = true): string => {
    const fra = visDato ? dateFormatter.dayDateMonthYear(from) : dateFormatter.day(from);
    const til = visDato ? dateFormatter.dayDateMonthYear(to) : dateFormatter.day(to);
    if (fra === til) {
        return fra;
    }
    return text('ukeInfoTooltip.dagerPeriode', { fra, til });
};

export default UkeInfoTooltip;
