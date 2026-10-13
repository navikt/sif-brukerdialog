import { FormattedNumber } from 'react-intl';

interface Props {
    verdi?: number;
}

const KronerSvar = ({ verdi }: Props) =>
    verdi !== undefined ? (
        <span>
            <FormattedNumber
                style="currency"
                currency="nok"
                value={verdi}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
            />
        </span>
    ) : null;

export default KronerSvar;
