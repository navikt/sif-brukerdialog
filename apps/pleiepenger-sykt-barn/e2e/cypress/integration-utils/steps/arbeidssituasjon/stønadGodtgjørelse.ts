import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { TestType } from '../../types/TestTyper';
import { getInputByName, getSøknadsdato, getTestElement, selectRadioNo, selectRadioYes } from '../../utils';

dayjs.extend(isoWeek);
dayjs.locale(locale);

export const fyllUtArbeidssituasjonMottarIkkeStønadGodtgjørelse = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioNo('stønadGodtgjørelse.mottarStønadGodtgjørelse');
    });
};

export const fyllUtArbeidssituasjonMottarStønadGodtgjørelseIHelePerioden = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('stønadGodtgjørelse.mottarStønadGodtgjørelse');
    });
};

export const fyllUtArbeidssituasjonMottarStønadGodtgjørelseIkkeIHelePerioden = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('stønadGodtgjørelse.mottarStønadGodtgjørelse');
        selectRadioNo('stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden');

        selectRadioYes('stønadGodtgjørelse.starterUndeveis');
        const startdato = getSøknadsdato().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
        getInputByName('stønadGodtgjørelse.startdato').click().type(startdato).blur();

        selectRadioYes('stønadGodtgjørelse.slutterUnderveis');
        const sluttdato = getSøknadsdato().startOf('week').add(1, 'week').format('YYYY-MM-DD');
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
