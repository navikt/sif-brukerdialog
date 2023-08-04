import { clickFortsett, getTestElement, selectRadioByLabel, setInputValue } from '../../utils';

export enum ArbeiderIPeriodenSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAVÆR',
}

export const fyllUtArbeidstidJobberIkke = () => {
    selectRadioByLabel('Jeg jobber ikke');
};

export const fyllUtArbeidstidMisterAltHonorar = () => {
    selectRadioByLabel('Jeg mister alt av honorar');
};

export const fyllUtArbeidstidJobberSomVanlig = () => {
    selectRadioByLabel('Jeg jobber som normalt, og har ikke fravær');
};

export const fyllUtArbeidstidRedusertTimer = () => {
    selectRadioByLabel('Jeg kombinerer delvis jobb med pleiepenger');
    selectRadioByLabel('Ja');
    selectRadioByLabel('I timer');
    setInputValue('timer-verdi', 5);
};

export const fyllUtArbeidstidRedusertProsent = () => {
    selectRadioByLabel('Jeg kombinerer delvis jobb med pleiepenger');
    selectRadioByLabel('Ja');
    selectRadioByLabel('I prosent');
    setInputValue('prosent-verdi', 20);
};

export const fyllUtArbeidstidRedusertVarierendeTimer = () => {
    const timer: string[] = ['10', '0', '20', '10', '10'];
    selectRadioByLabel('Jeg kombinerer delvis jobb med pleiepenger');
    selectRadioByLabel('Nei, det varierer');
    getTestElement('arbeidsuker').within(() => {
        cy.get(`[data-testid="timer-verdi"]`).each((element, idx) => {
            cy.wrap(element).click().type(timer[idx]);
        });
    });
};

export const fyllUtArbeidIPeriodeAnsatt = () => {
    cy.get('h3')
        .contains('WHOA.BOA')
        .parent()
        .within(() => {
            fyllUtArbeidstidRedusertVarierendeTimer();
        });
};

export const fyllUtArbeidIPeriodeFrilansarbeid = () => {
    cy.get('h3')
        .contains('Jobb som frilanser')
        .parent()
        .within(() => {
            fyllUtArbeidstidJobberIkke();
        });
};

export const fyllUtArbeidIPeriodeHonorararbeid = () => {
    cy.get('h3')
        .contains('Jobb for honorar')
        .parent()
        .within(() => {
            fyllUtArbeidstidMisterAltHonorar();
        });
};

export const fyllUtArbeidIPeriodeSteg = () => {
    it('Steg 4: Arbeid i perioden', () => {
        fyllUtArbeidIPeriodeAnsatt();
        fyllUtArbeidIPeriodeFrilansarbeid();
        fyllUtArbeidIPeriodeHonorararbeid();

        clickFortsett();
    });
};
