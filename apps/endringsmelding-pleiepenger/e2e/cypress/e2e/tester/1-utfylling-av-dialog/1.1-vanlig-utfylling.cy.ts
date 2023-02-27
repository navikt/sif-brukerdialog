import { contextConfig, mockApiBaseUrl } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../data/enArbeidsgiverMock';
import { enSakEnArbeidsgiverMock } from '../../data/enSakEnArbeidsgiverMock';
import { enSakFlereArbeidsgivereMock } from '../../data/enSakFlereArbeidsgivereMock';
import { flereArbeidsgivereMock } from '../../data/flereArbeidsgivereMock';
import { søkerMock } from '../../data/søkerMock';
import { getTestElement, selectCheckboxByTestId, submitSkjema } from '../../utils';

const startUrl = 'http://localhost:8080/';
const date = new Date(2023, 0, 1);

const enkeltuke = 45;
const flereUker = [46, 47];

const getAktivitet = () => getTestElement('aktivitet_id_947064649');
const getPeriode = () => getTestElement('periode_0');
const getUkeRow = (ukenummer) => cy.get('.arbeidstidUkeTabell table').get(`[data-testid=uke_${ukenummer}]`);
const getArbeidstimerModal = () => cy.get('.endreArbeidstidModal');

const captureScreenshot = () => {
    cy.screenshot({ capture: 'fullPage' });
};

const startSøknad = () => {
    it('Starter søknad', () => {
        getTestElement('bekreft-label').click();
        submitSkjema();
    });
};

const velgArbeidsgiver = (orgNr?: string) => {
    it('Velger arbeidsgiver', () => {
        selectCheckboxByTestId(`aktivitet-id_${orgNr || '947064649'}`);
        captureScreenshot();
        submitSkjema();
    });
};

const endreEnkeltuke = (ukenummer = enkeltuke) => {
    it('åpne periode', () => {
        getAktivitet().within(() => {
            cy.get('[data-testid=periode_0_header]').click();
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=ukenummer]').contains(ukenummer));
                expect(cy.get('[data-testid=arbeidstid-faktisk]').contains('4 t. 0 m.'));
            });
            captureScreenshot();
        });
    });
    it('kontrollerer verdi før endring', () => {
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=ukenummer]').contains(ukenummer));
                expect(cy.get('[data-testid=arbeidstid-faktisk]').contains('4 t. 0 m.'));
            });
            captureScreenshot();
        });
    });
    it('åpner dialog for uke', () => {
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                cy.get('[data-testid=endre-button]').click();
            });
            captureScreenshot();
        });
    });
    it('fyller ut timer', () => {
        getArbeidstimerModal().within(() => {
            getTestElement('toggle-timer').click();
            getTestElement('timer-verdi').type('10,5');
            captureScreenshot();
            cy.get('button[type="submit"]').click();
        });
    });
    it('kontrollerer liste etter endring', () => {
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=timer-faktisk]').contains('10 t. 30 m.'));
                expect(cy.get('[data-testid=timer-opprinnelig]').contains('4 t.'));
            });
            captureScreenshot();
        });
    });
};

const endreFlereUker = (uker: number[] = flereUker) => {
    it('velger uker for endring', () => {
        getAktivitet().within(() => {
            getPeriode().within(() => {
                getTestElement('endre-flere-uker-cb').click();
                const rows = uker.map((uke) => getUkeRow(uke));
                rows.forEach((row) => {
                    row.within(() => {
                        cy.get('input[type=checkbox]').parent().click();
                    });
                });
            });
        });
        captureScreenshot();
    });
    it('åpner dialog og endrer timer', () => {
        getAktivitet().within(() => {
            getPeriode().within(() => {
                cy.get('[data-testid=endre-flere-uker-button]').click();
            });
        });
        getArbeidstimerModal().within(() => {
            getTestElement('timer-verdi').type('5');
            captureScreenshot();
            cy.get('button[type="submit"]').click();
        });
        captureScreenshot();
    });
};

const fortsettTilOppsummering = () => {
    it('fortsetter til oppsummering fra arbeidstid', () => {
        captureScreenshot();
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
    it('bekrefter opplysninger', () => {
        getTestElement('bekreft-opplysninger').parent().click();
        captureScreenshot();
    });
    it('sender inn endringsmelding', () => {
        cy.intercept('POST', `${mockApiBaseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, {});
        submitSkjema();
    });
    it('viser kvittering', () => {
        getTestElement('kvittering-heading').contains('Melding om endring er lagt til saken din');
    });
};

describe('Endre arbeidstid for én arbeidsgiver', () => {
    contextConfig();

    before(() => {
        cy.clock(date);
        cy.clearLocalStorage();
        cy.visit(startUrl);
        cy.intercept('GET', `${mockApiBaseUrl}/api/innsyn/sak`, enSakEnArbeidsgiverMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, enArbeidsgiverMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
    });
    startSøknad();
    endreEnkeltuke();
    endreFlereUker();
    fortsettTilOppsummering();
    kontrollerOppsummering();
    bekreftOpplysningerOgSendInn();
});

describe('Endre arbeidstid for flere arbeidsgivere', () => {
    contextConfig();

    before(() => {
        cy.clock(date);
        cy.clearLocalStorage();
        cy.visit(startUrl);
        cy.intercept('GET', `${mockApiBaseUrl}/api/innsyn/sak`, enSakFlereArbeidsgivereMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, flereArbeidsgivereMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
    });
    startSøknad();
    velgArbeidsgiver();
    endreEnkeltuke();
    endreFlereUker();
    fortsettTilOppsummering();
    kontrollerOppsummering();
    bekreftOpplysningerOgSendInn();
});
