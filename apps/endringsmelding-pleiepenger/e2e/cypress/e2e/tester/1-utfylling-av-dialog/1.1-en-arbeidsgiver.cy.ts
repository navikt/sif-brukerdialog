import { contextConfig } from '../../contextConfig';
import { getTestElement, selectCheckboxByTestId, submitSkjema } from '../../utils';

const startUrl = 'http://localhost:8080/';
const date = new Date(2023, 0, 1);

const enkeltuke = 45;
const flereUker = [46, 47, 48];

const getUkeRow = (ukenummer) => cy.get('.arbeidstidUkeTabell table').get(`[data-testid=uke_${ukenummer}]`);
const getArbeidstimerModal = () => cy.get('.endreArbeidstidModal');

const startSøknad = () => {
    it('Starter søknad', () => {
        getTestElement('bekreft-label').click();
        submitSkjema();
    });
};

const velgArbeidsgiver = (orgNr?: string) => {
    it('Velger arbeidsgiver', () => {
        selectCheckboxByTestId(`aktivitet-id_${orgNr || '947064649'}`);
        submitSkjema();
    });
};

const endreEnkeltuke = (ukenummer = enkeltuke) => {
    it('kontrollerer verdi før endring', () => {
        getUkeRow(ukenummer).within(() => {
            expect(cy.get('[data-testid=ukenummer]').contains(ukenummer));
            expect(cy.get('[data-testid=arbeidstid-faktisk]').contains('4 t. 0 m.'));
        });
    });
    it('åpner dialog for uke', () => {
        getUkeRow(ukenummer).within(() => {
            cy.get('[data-testid=endre-button]').click();
        });
    });
    it('fyller ut timer', () => {
        getArbeidstimerModal().within(() => {
            getTestElement('timer-verdi').type('10,5');
            cy.get('button[type="submit"]').click();
        });
    });
    it('kontrollerer liste etter endring', () => {
        getUkeRow(ukenummer).within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('10 t. 30 m.'));
            expect(cy.get('[data-testid=timer-opprinnelig]').contains('4 t.'));
        });
    });
};

const endreFlereUker = (uker: number[] = flereUker) => {
    it('velger uker for endring', () => {
        const rows = uker.map((uke) => getUkeRow(uke));
        rows.forEach((row) => {
            row.within(() => {
                cy.get('input[type=checkbox]').parent().click();
            });
        });
    });
    it('åpner dialog og endrer timer', () => {
        cy.get('[data-testid=endre-flere-uker-button]').first().click();
        getArbeidstimerModal().within(() => {
            getTestElement('timer-verdi').type('5');
            cy.get('button[type="submit"]').click();
        });
    });
};

const fortsettTilOppsummering = () => {
    it('fortsetter til oppsummering fra arbeidstid', () => {
        submitSkjema();
    });
};

const kontrollerOppsummering = () => {
    it('viser riktig informasjon i oppsummering', () => {
        getUkeRow(enkeltuke).within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('10 t. 30 m.'));
            expect(cy.get('[data-testid=timer-opprinnelig]').contains('4 t.'));
        });
    });
};

const bekreftOpplysningerOgSendInn = () => {
    it('bekrefter opplysninger og sender inn endringsmelding', () => {
        cy.get('[name=harBekreftetOpplysninger]').parent().click();
        submitSkjema();
    });
    it('viser kvittering', () => {
        getTestElement('kvittering-heading').contains('Melding om endring er mottatt');
    });
};

describe('Endre én uke for én arbeidsgiver', () => {
    contextConfig();

    before(() => {
        cy.clock(date);
        cy.visit(startUrl);
    });
    startSøknad();
    velgArbeidsgiver();
    endreEnkeltuke();
    endreFlereUker();
    fortsettTilOppsummering();
    kontrollerOppsummering();
    bekreftOpplysningerOgSendInn();
});
