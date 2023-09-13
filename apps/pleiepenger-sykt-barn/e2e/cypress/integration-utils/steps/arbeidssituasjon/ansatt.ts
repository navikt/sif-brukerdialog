import {
    getTestElement,
    gåTilOppsummeringFraArbeidssituasjon,
    selectRadioByLabel,
    setInputValueByName,
} from '../../utils';

interface ArbeidssituasjonAnsattValues {
    erAnsatt: boolean;
    sluttetFørSøknadsperiode?: boolean;
    timerPerUke?: string;
}

export const fyllUtArbeidssituasjonAnsatt = (
    values: ArbeidssituasjonAnsattValues = {
        erAnsatt: true,
        timerPerUke: '30',
    }
) => {
    const { erAnsatt, sluttetFørSøknadsperiode, timerPerUke } = values;
    getTestElement('arbeidssituasjonAnsatt').within(() => {
        cy.get('fieldset')
            .eq(0)
            .within(() => {
                selectRadioByLabel(erAnsatt ? 'Ja' : 'Nei');
            });
        if (!erAnsatt) {
            getTestElement('sluttet-før-søknadsperiode').within(() => {
                selectRadioByLabel(sluttetFørSøknadsperiode ? 'Ja' : 'Nei');
            });
        }

        if (erAnsatt || sluttetFørSøknadsperiode === false) {
            setInputValueByName('ansatt_arbeidsforhold.0.normalarbeidstid.timerPerUke', timerPerUke);
        }
    });
};

const ansattHeleSøknadsperiodeTest = () => {
    it('er ansatt og jobber 40 timer hos arbeidsgiver i perioden', () => {
        fyllUtArbeidssituasjonAnsatt({ erAnsatt: true, sluttetFørSøknadsperiode: false, timerPerUke: '40' });

        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-ansatt-947064649');
        el.should('contain', 'Er ansatt');
        el.should('contain', 'Jobber normalt 40 timer per uke');
    });
};

const ansattISøknadsperiodeTest = () => {
    it('er ikke ansatt lenger, men sluttet inne i søknadsperioden perioden. Jobber 30 timer i uken.', () => {
        fyllUtArbeidssituasjonAnsatt({ erAnsatt: false, sluttetFørSøknadsperiode: false, timerPerUke: '30' });
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-ansatt-947064649');
        el.should('contain', 'Er ikke lenger ansatt');
        el.should('contain', 'Jobbet normalt 30 timer per uke');
        el.should('contain', `Sluttet etter `);
    });
};

const sluttetFørSøknadsperiodeTest = () => {
    it('er ikke ansatt og sluttet før søknadsperiode', () => {
        fyllUtArbeidssituasjonAnsatt({ erAnsatt: false, sluttetFørSøknadsperiode: true });

        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-ansatt-947064649');
        el.should('contain', 'Er ikke lenger ansatt');
        el.should('contain', `Sluttet før `);
    });
};

export const testArbeidssituasjonAnsatt = () => {
    describe('Arbeidssituasjon ansatt', () => {
        ansattHeleSøknadsperiodeTest();
        ansattISøknadsperiodeTest();
        sluttetFørSøknadsperiodeTest();
    });
};
