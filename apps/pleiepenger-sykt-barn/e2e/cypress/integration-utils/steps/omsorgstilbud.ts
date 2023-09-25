import { clickFortsett, getTestElement, selectRadioNo, selectRadioYes, setInputTime } from '../utils';

export const fyllUtOmsorgstilbudFortidFremtid = () => {
    selectRadioYes('omsorgstilbud.erIOmsorgstilbudFortid');
    selectRadioYes('omsorgstilbud.erIOmsorgstilbudFremtid');
    selectRadioYes('omsorgstilbud.erLiktHverUke');

    setInputTime('fasteDager__monday', '5', '0');
    setInputTime('fasteDager__tuesday', '2', '0');
    setInputTime('fasteDager__wednesday', '5', '0');
    setInputTime('fasteDager__friday', '5', '0');

    clickFortsett();
};

export const fyllUtOmsorgstilbudFortidFremtidEnkelt = () => {
    selectRadioNo('omsorgstilbud.erIOmsorgstilbudFortid');
    selectRadioNo('omsorgstilbud.erIOmsorgstilbudFremtid');

    clickFortsett();
};

export const oppsummeringTestOmsorgstilbudFortidFremtid = () => {
    getTestElement('oppsummering-omsorgstilbud-svarFortid').should((element) =>
        expect('Ja, i hele eller deler av perioden').equal(element.text()),
    );
};

export const oppsummeringTestOmsorgstilbudFortidFremtidEnkelt = () => {
    getTestElement('oppsummering-omsorgstilbud-svarFortid').should((element) => expect('Nei').equal(element.text()));
    getTestElement('oppsummering-omsorgstilbud-svarFremtid').should((element) => expect('Nei').equal(element.text()));
};

export const fyllUtOmsorgstilbudSteg = (testType?) => {
    it('STEG 5: Omsorgstilbud', () => {
        switch (testType) {
            case 'komplett':
                fyllUtOmsorgstilbudFortidFremtid();
                break;
            default:
                fyllUtOmsorgstilbudFortidFremtidEnkelt();
                break;
        }
    });
};

export const oppsummeringTestOmsorgstilbudSteg = (testType?) => {
    switch (testType) {
        case 'komplett':
            oppsummeringTestOmsorgstilbudFortidFremtid();
            break;
        default:
            oppsummeringTestOmsorgstilbudFortidFremtidEnkelt();
            break;
    }
};
