import { Alert } from '@navikt/ds-react';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../../i18n';
import { getTidsromForInntektsrapportering } from '../../utils/deltakelseUtils';

interface Props {
    inntektsmåned: Date;
}

const RapporterInntektIkkeTilgjengeligInfo = ({ inntektsmåned }: Props) => {
    const { intl } = useAppIntl();
    const månedNavn = dateFormatter.month(inntektsmåned);
    const åpenPeriode = getTidsromForInntektsrapportering(inntektsmåned);
    return (
        <Alert variant="info">
            Hvis du har inntekt i {månedNavn}, vil du få mulighet til å melde fra om dette i tidsrommet{' '}
            {dateRangeFormatter.getDateRangeText(åpenPeriode, intl.locale)}. Hvis du ikke har inntekt, trenger du ikke
            melde fra.
        </Alert>
    );
};

export default RapporterInntektIkkeTilgjengeligInfo;
