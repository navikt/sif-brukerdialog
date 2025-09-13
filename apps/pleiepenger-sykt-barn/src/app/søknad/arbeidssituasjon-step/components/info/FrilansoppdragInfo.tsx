import { Arbeidsgiver } from '../../../../types';
import FrilansoppdragListe from './FrilansoppdragListe';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragInfo = ({ frilansoppdrag }: Props) => <FrilansoppdragListe frilansoppdrag={frilansoppdrag} />;

export default FrilansoppdragInfo;
