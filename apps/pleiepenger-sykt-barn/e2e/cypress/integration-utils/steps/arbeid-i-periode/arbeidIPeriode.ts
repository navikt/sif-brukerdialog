import { selectRadio, setInputValue, getTestElement, clickFortsett } from '../../utils';

export enum ArbeiderIPeriodenSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAVÆR',
}

export const fyllUtArbeidstidJobberIkke = () => {
    selectRadio(ArbeiderIPeriodenSvar.heltFravær);
};

export const fyllUtArbeidstidJobberSomVanlig = () => {
    selectRadio(ArbeiderIPeriodenSvar.somVanlig);
};

export const fyllUtArbeidstidRedusert = () => {
    selectRadio(ArbeiderIPeriodenSvar.redusert);
    selectRadio('er-likt-hver-uke_yes');
    selectRadio('timer');
    setInputValue('timer-verdi', 20);
};

export const fyllUtArbeidstidRedusertVarierendeTimer = () => {
    const timer: string[] = ['10', '0', '20', '10', '10'];
    selectRadio(ArbeiderIPeriodenSvar.redusert);
    selectRadio('er-likt-hver-uke_no');
    getTestElement('arbeidsuker').within(() => {
        cy.get(`[data-testid="timer-verdi"]`).each((element, idx) => {
            cy.wrap(element).click().type(timer[idx]);
        });
    });
};

export const fyllUtArbeidIPeriodeSteg = () => {
    it('Steg 4: Arbeid i perioden', () => {
        getTestElement('arbeidIPerioden_ansatt').within(() => {
            fyllUtArbeidstidRedusertVarierendeTimer();
        });

        getTestElement('arbeidIPerioden_frilanser').within(() => {
            selectRadio('MISTER_DELER_AV_HONORARER');
            fyllUtArbeidstidRedusertVarierendeTimer();
        });
        clickFortsett();
    });
};
