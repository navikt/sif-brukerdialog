import { getTestElement, clickFortsett, selectRadioYes } from '../utils';

const nattevåkTilleggsinfo = 'Test nattevåk tilleggsinfo';
const beredskapTilleggsinfo = 'Test beredskap tilleggsinfo';

const fyllUtNattevåkOgBeredskapKomplett = () => {
    selectRadioYes('harNattevåk');
    getTestElement('nattevåk-tilleggsinfo').click().type(nattevåkTilleggsinfo).blur();

    selectRadioYes('harBeredskap');
    getTestElement('beredskap-tilleggsinfo').click().type(beredskapTilleggsinfo).blur();

    clickFortsett();
};

const oppsummeringTestNattevåkOgBeredskapKomplett = () => {
    getTestElement('oppsummering-nattevåk').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-nattevåk-tilleggsinformasjon').should((element) =>
        expect(nattevåkTilleggsinfo).equal(element.text())
    );

    getTestElement('oppsummering-beredskap').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-beredskap-tilleggsinformasjon').should((element) =>
        expect(beredskapTilleggsinfo).equal(element.text())
    );
};

export const fyllUtNattevåkOgBeredskapSteg = (testType?) => {
    it('STEG 6: Nattevåk og beredskap', () => {
        switch (testType) {
            case 'komplett':
                fyllUtNattevåkOgBeredskapKomplett();
                break;
        }
    });
};

export const oppsummeringTestNattevåkOgBeredskapSteg = (testType?) => {
    switch (testType) {
        case 'komplett':
            oppsummeringTestNattevåkOgBeredskapKomplett();
            break;
    }
};
