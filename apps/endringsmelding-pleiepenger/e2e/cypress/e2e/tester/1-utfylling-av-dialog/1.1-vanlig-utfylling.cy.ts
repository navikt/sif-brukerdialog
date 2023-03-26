import { contextConfig } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../data/enArbeidsgiverMock';
import { enSakEnArbeidsgiverMock } from '../../data/enSakEnArbeidsgiverMock';
import { enSakFlereArbeidsgivereMock } from '../../data/enSakFlereArbeidsgivereMock';
import { flereArbeidsgivereMock } from '../../data/flereArbeidsgivereMock';
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

const startSøknad = ({
    endreArbeidstid,
    endreLovbestemtFerie,
}: {
    endreArbeidstid?: boolean;
    endreLovbestemtFerie?: boolean;
}) => {
    it('Starter søknad', () => {
        cy.visit(startUrl);
        cy.wait(['@getSak', '@getArbeidsgiver', '@getSoker', '@getMellomlagring']).then(() => {
            if (endreArbeidstid) {
                getTestElement('endreArbeidstid').parent().click();
            }
            if (endreLovbestemtFerie) {
                getTestElement('endreLovbestemtFerie').parent().click();
            }
            getTestElement('bekreft-label').click();
            submitSkjema();
        });
    });
};

const velgArbeidsgiver = (orgNr?: string) => {
    it('Velger arbeidsgiver', () => {
        selectCheckboxByTestId(`aktivitet-id_${orgNr || '947064649'}`);
        captureScreenshot();
        submitSkjema();
    });
};

const fyllUtFerieDialog = (from, to) => {
    cy.get('.lovbestemtFerieModal').within(() => {
        cy.get('input[name="from"]').clear().type(from);
        cy.get('input[name="to"]').clear().type(to).blur();
        getTestElement('typedFormikForm-submitButton').click();
    });
};

const leggTilOgFjernFerie = () => {
    it('kan legge til, endre og fjerne én ferie', () => {
        /** Legg til */
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 1);
            getTestElement('leggTilFerieKnapp').click();
        });

        fyllUtFerieDialog('20.11.2022', '25.11.2022');

        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            cy.get('.lovbestemtFerieListe li:nth-child(2) .lovbestemtFerieListe__ferie__periode .dato').should(
                'have.text',
                'søndag 20.11.2022 - fredag 25.11.2022'
            );
        });

        /** Endre */
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(2) .lovbestemtFerieListe__ferie__endreKnapp').click();
        });
        fyllUtFerieDialog('28.11.2022', '29.11.2022');
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            cy.get('.lovbestemtFerieListe li:nth-child(2) .lovbestemtFerieListe__ferie__periode .dato').should(
                'have.text',
                'mandag 28.11.2022 - tirsdag 29.11.2022'
            );
        });

        /** Fjern opprinnelig periode */
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(1) .lovbestemtFerieListe__ferie__fjernKnapp').click();
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            const angreKnapp = cy.get(
                '.lovbestemtFerieListe li:nth-child(1) button[data-testid="angre_fjern_ferie_knapp"]'
            );
            angreKnapp.should('exist');
        });

        // /** Angre fjern opprinnelig periode */
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(1) button[data-testid="angre_fjern_ferie_knapp"]').click();
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            cy.get('.lovbestemtFerieListe li:nth-child(1) .lovbestemtFerieListe__ferie__endreKnapp').should('exist');
        });

        // /** Endre opprinnelig periode */
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(1) .lovbestemtFerieListe__ferie__endreKnapp').click();
        });
        fyllUtFerieDialog('07.11.2022', '09.11.2022');
        getTestElement('periode_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 4);
        });

        // /** Gå videre */
        submitSkjema();
    });
};

const endreEnkeltuke = (ukenummer = enkeltuke) => {
    it('åpne periode', () => {
        cy.wait(1000);
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
        cy.wait(1000);
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=ukenummer]').contains(ukenummer));
                expect(cy.get('[data-testid=arbeidstid-faktisk]').contains('4 t. 0 m.'));
            });
            captureScreenshot();
        });
    });
    it('åpner dialog for uke', () => {
        cy.wait(1000);
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
    it('sender inn endringsmelding og viser kvittering', () => {
        submitSkjema();
        cy.wait('@innsending').then(() => {
            getTestElement('kvittering-heading').contains('Melding om endring er lagt til saken din');
        });
    });
};

describe('Endre arbeidstid for én arbeidsgiver', () => {
    contextConfig({
        arbeidsgivere: enArbeidsgiverMock,
        saker: enSakEnArbeidsgiverMock,
    });

    before(() => {
        cy.clock(date);
        cy.clearLocalStorage();
    });

    startSøknad({ endreArbeidstid: true, endreLovbestemtFerie: true });
    leggTilOgFjernFerie();
    endreEnkeltuke();
    endreFlereUker();
    fortsettTilOppsummering();
    kontrollerOppsummering();
    bekreftOpplysningerOgSendInn();
});

describe('Endre arbeidstid for flere arbeidsgivere', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakFlereArbeidsgivereMock,
        mellomlagring: {},
    });
    before(() => {
        cy.clock(date);
        cy.clearLocalStorage();
        cy.visit(startUrl);
    });
    startSøknad({ endreArbeidstid: true });
    velgArbeidsgiver();
    endreEnkeltuke();
    endreFlereUker();
    fortsettTilOppsummering();
    kontrollerOppsummering();
    bekreftOpplysningerOgSendInn();
});
