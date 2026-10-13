import { FormattedNumber } from 'react-intl';

interface Props {
    verdi?: number;
}

const TallSvar = ({ verdi }: Props) => (verdi !== undefined ? <FormattedNumber value={verdi} /> : null);

export default TallSvar;
