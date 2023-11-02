import { TestType } from '../../types/TestTyper';
import {
    getInputByName,
    getSøknadsdato,
    getTestElement,
    getTestElementByType,
    gåTilOppsummeringFraArbeidssituasjon,
    selectRadioNo,
    selectRadioYes,
} from '../../utils';

const navnPåVirksomheten = 'Fisk Virksomhet';
const dato = getSøknadsdato().startOf('day').subtract(1, 'day');
const virksomhetensOrganisasjonsnummer = '999263550'; /** Navs orgnur */
const fraDatoTilDato = dato.format('DD.MM.YYYY');
const expectedNæringstype = 'Fisker';
const expectedutenlandskNæringLand = 'Belgia';

const fyllUtArbeidssituasjonUtenUtenlandskNæring = () => {
    getTestElement('arbeidssituasjonUtenlandskNæring').within(() => {
        selectRadioNo('harUtenlandskNæring');
    });
};

const fyllUtArbeidssituasjonMedUtenlandskNæring = () => {
    getTestElement('arbeidssituasjonUtenlandskNæring').within(() => {
        selectRadioYes('harUtenlandskNæring');
    });
    cy.get('button').contains('Legg til næringsvirksomhet i et annet EØS-land').click();
    cy.get('[aria-label="Virksomhet"]').within(() => {
        getTestElementByType('radio').eq(0).check({ force: true });
        getInputByName('navnPåVirksomheten').click().type(navnPåVirksomheten).blur();
        cy.get('select[name="land"]').select(1);
        getInputByName('identifikasjonsnummer').click().type(virksomhetensOrganisasjonsnummer).blur();
        getInputByName('fraOgMed').click().type(fraDatoTilDato).blur();
        getTestElementByType('checkbox').check({ force: true });
        cy.get('button[type="submit"]').click();
    });
};

export const fyllUtArbeidssituasjonUtenlandskNæring = (type: TestType = TestType.ENKEL) => {
    switch (type) {
        case TestType.KOMPLETT:
            fyllUtArbeidssituasjonMedUtenlandskNæring();
            break;
        default:
            fyllUtArbeidssituasjonUtenUtenlandskNæring();
            break;
    }
};

export const testArbeidssituasjonUtenlandskNæring = () => {
    describe('Arbeidssituasjon utenlandsk næring', () => {
        it('har ikke utenlandsk næring', () => {
            fyllUtArbeidssituasjonUtenUtenlandskNæring();
            gåTilOppsummeringFraArbeidssituasjon();

            const el = getTestElement('arbeidssituasjon-harUtenlandskNæringSvar');
            el.should('contain', 'Nei');
        });

        it('har utenlandsk næring', () => {
            fyllUtArbeidssituasjonMedUtenlandskNæring();
            gåTilOppsummeringFraArbeidssituasjon();

            const el = getTestElement('arbeidssituasjon-utenlandskNæring');
            el.should('contain', `Navn: ${navnPåVirksomheten}`);
            el.should('contain', `Næringstype: ${expectedNæringstype}`);
            el.should(
                'contain',
                `Registrert i ${expectedutenlandskNæringLand} (organisasjonsnummer ${virksomhetensOrganisasjonsnummer}).`,
            );
            el.should('contain', `Startet ${fraDatoTilDato} (pågående).`);
        });
    });
};
