import Barn from './Barn';
import Forelder from './Forelder';
import PeriodeEnum from './PeriodeEnum';

interface OmsorgsdagerForm {
    periode?: PeriodeEnum;
    barn: Barn[];
    foreldre: Forelder[];
}

export default OmsorgsdagerForm;
