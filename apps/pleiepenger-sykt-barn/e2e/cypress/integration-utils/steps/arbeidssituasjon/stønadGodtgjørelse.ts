// import { contextConfig, gotoStep } from '../../contextConfig';
// import { cyApiMockData } from '../../cyApiMockData';
// import { mellomlagring } from '../../mocks/mellomlagring';
import {
    getInputByName,
    getTestElement,
    // gåTilOppsummeringFraArbeidssituasjon,
    selectRadioNo,
    selectRadioNyYesOrNo,
    selectRadioYes,
    // setInputValue,
} from '../../utils';

import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { TestType } from '../../types/TestTyper';

dayjs.extend(isoWeek);
dayjs.locale(locale);

export const fyllUtArbeidssituasjonMottarIkkeStønadGodtgjørelse = () => {
    getTestElement('arbeidssituasjonFrilanser').within(($body) => {
        if ($body.find('[data-testid=mottar-stønadGodtgjørelse_no]').length) {
            selectRadioNo('mottar-stønadGodtgjørelse');
        }
    });
};

export const fyllUtArbeidssituasjonMottarStønadGodtgjørelseIHelePerioden = () => {
    getTestElement('arbeidssituasjonFrilanser').within(($body) => {
        if ($body.find('[data-testid=mottar-stønadGodtgjørelse_yes]').length) {
            selectRadioYes('mottar-stønadGodtgjørelse');
        }

        if ($body.find('[data-testid=mottar-stønadGodtgjørelse-i-hele-peroden_yes]').length) {
            selectRadioNyYesOrNo('mottar-stønadGodtgjørelse-i-hele-peroden', true);
        }
    });
};

export const fyllUtArbeidssituasjonMottarStønadGodtgjørelseIkkeIHelePerioden = () => {
    getTestElement('arbeidssituasjonFrilanser').within(($body) => {
        if ($body.find('[data-testid=mottar-stønadGodtgjørelse_yes]').length) {
            selectRadioYes('mottar-stønadGodtgjørelse');
        }

        selectRadioNyYesOrNo('mottar-stønadGodtgjørelse-i-hele-peroden', false);

        selectRadioNyYesOrNo('stønadGodtgjørelse-starter-undeveis', true);
        const startdato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
        getInputByName('stønadGodtgjørelse.startdato').click().type(startdato).blur();

        selectRadioNyYesOrNo('stønadGodtgjørelse-slutter-undeveis', true);
        const sluttdato = dayjs().startOf('week').add(1, 'week').format('YYYY-MM-DD');
        getInputByName('stønadGodtgjørelse.sluttdato').click().type(sluttdato).blur();
    });
};

export const fyllUtArbeidssituasjonStønadGodtgjørelse = (type: TestType = TestType.ENKEL) => {
    switch (type) {
        case TestType.KOMPLETT:
            fyllUtArbeidssituasjonMottarStønadGodtgjørelseIkkeIHelePerioden();
            break;
        default:
            fyllUtArbeidssituasjonMottarIkkeStønadGodtgjørelse();
            break;
    }
};
