import 'cypress-axe';
import { getTestElement, selectRadioByNameAndValue, submitSkjema } from '../../utils';

const startUrl = 'http://localhost:8080/';
const date = new Date(2023, 0, 1);

const enkeltuke = 45;
const flereUker = [46, 47];

const getAktivitet = () => {
    getTestElement('aktivitet_a_947064649').should('be.visible').wait(500);
    return getTestElement('aktivitet_a_947064649');
};

const getPeriode = () => {
    getTestElement('dateRangeAccordion_0').should('be.visible').wait(500);
    return getTestElement('dateRangeAccordion_0');
};

const getUkeRow = (ukenummer) => {
    cy.get('.arbeidstidUkeTabell').get(`[data-testid=uke_${ukenummer}]`).should('be.visible').wait(400);
    return cy.get('.arbeidstidUkeTabell').get(`[data-testid=uke_${ukenummer}]`);
};
const getArbeidstimerModal = () => {
    cy.get('.endreArbeidstidModal').should('be.visible').wait(200);
    return cy.get('.endreArbeidstidModal');
};

const setTestDate = () => {
    cy.clock(cyHelpers.date.getTime(), ['Date']);
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
        cy.wait(['@getSak', '@getArbeidsgiver', '@getSoker']).then(() => {
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
    it('checkA11y er ok for startsiden', () => {
        cy.injectAxe();
        cy.checkA11y();
    });
};

const fyllUtUkjentArbeidsforhold = (orgnummer: string) => {
    it('fyller ut ukjent arbeidsforhold', () => {
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}`).within(() => {
            selectRadioByNameAndValue(`arbeidsforhold.a_${orgnummer}.erAnsatt`, 'yes');
            cy.get(`input[name="arbeidsforhold.a_${orgnummer}.timerPerUke"]`).clear().type('30');
        });
        submitSkjema();
    });
};

const fyllUtFerieDialog = (from, to) => {
    cy.get('.lovbestemtFerieModal').within(() => {
        cy.get('input[name="from"]').clear().type(from);
        cy.get('input[name="to"]').clear().type(to).blur();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait(400);
    });
};

const leggTilOgFjernFerie = () => {
    leggTilFerie();
    endreOgFjernFerie();
};

const leggTilFerie = (submit?: boolean) => {
    it('kan legge til ferie', () => {
        cy.injectAxe();
        /** Legg til */
        getTestElement('dateRangeAccordion_0').within(() => {
            getTestElement('dateRangeAccordion_0_header').click();
            cy.get('.lovbestemtFerieListe li').should('have.length', 1);
            getTestElement('leggTilFerieKnapp').click();
        });

        fyllUtFerieDialog('20.11.2022', '25.11.2022');
        cy.wait(300);

        cy.checkA11y();

        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            cy.get('.lovbestemtFerieListe li:nth-child(2) .lovbestemtFerieListe__ferie__periode .dato').should(
                'have.text',
                'søndag 20.11.2022 - fredag 25.11.2022',
            );
        });
        cy.checkA11y();
        if (submit) {
            submitSkjema();
        }
    });
};

const endreOgFjernFerie = () => {
    it('endre og fjerne én ferie', () => {
        cy.injectAxe();
        /** Endre */
        getTestElement('dateRangeAccordion_0').should('be.visible');
        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(2) .lovbestemtFerieListe__ferie__endreKnapp').click();
        });
        fyllUtFerieDialog('28.11.2022', '29.11.2022');
        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            cy.get('.lovbestemtFerieListe li:nth-child(2) .lovbestemtFerieListe__ferie__periode .dato').should(
                'have.text',
                'mandag 28.11.2022 - tirsdag 29.11.2022',
            );
            cy.checkA11y();
        });

        /** Fjern opprinnelig periode */
        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(1) .lovbestemtFerieListe__ferie__fjernKnapp').click();
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            const angreKnapp = cy.get(
                '.lovbestemtFerieListe li:nth-child(1) button[data-testid="angre_fjern_ferie_knapp"]',
            );
            angreKnapp.should('exist');
        });

        // /** Angre fjern opprinnelig periode */
        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(1) button[data-testid="angre_fjern_ferie_knapp"]').click();
            cy.get('.lovbestemtFerieListe li').should('have.length', 2);
            cy.get('.lovbestemtFerieListe li:nth-child(1) .lovbestemtFerieListe__ferie__endreKnapp').should('exist');
        });
        cy.checkA11y();

        // /** Endre opprinnelig periode */
        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li:nth-child(1) .lovbestemtFerieListe__ferie__endreKnapp').click();
        });
        fyllUtFerieDialog('07.11.2022', '09.11.2022');
        getTestElement('dateRangeAccordion_0').within(() => {
            cy.get('.lovbestemtFerieListe li').should('have.length', 4);
        });

        // /** Gå videre */
        submitSkjema();
    });
};

const endreArbeidEnkeltuke = (ukenummer = enkeltuke) => {
    it('åpne periode', () => {
        cy.injectAxe();
        getAktivitet().within(() => {
            cy.get('[data-testid=dateRangeAccordion_0]').should('be.visible').wait(200).click();
            getUkeRow(ukenummer).should('be.visible');
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=ukenummer]').should('exist').contains(ukenummer));
                expect(cy.get('[data-testid=arbeidstid-faktisk]').contains('4 t. 0 m.'));
            });
            cy.checkA11y();
        });
    });
    it('kontrollerer verdi før endring', () => {
        cy.injectAxe();
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=ukenummer]').contains(ukenummer));
                expect(cy.get('[data-testid=arbeidstid-faktisk]').contains('4 t. 0 m.'));
            });
            cy.checkA11y();
        });
    });
    it('åpner dialog for uke', () => {
        cy.injectAxe();
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                cy.get('[data-testid=endre-button]').click();
            });
        });
    });
    it('fyller ut timer', () => {
        getArbeidstimerModal().within(() => {
            getTestElement('toggle-timer').click();
            getTestElement('timer-verdi').type('10,5');
            cy.checkA11y();
            cy.get('button[type="submit"]').click();
        });
    });
    it('kontrollerer liste etter endring', () => {
        getAktivitet().within(() => {
            getUkeRow(ukenummer).within(() => {
                expect(cy.get('[data-testid=timer-faktisk]').contains('10 t. 30 m.'));
                expect(cy.get('[data-testid=timer-opprinnelig]').contains('4 t.'));
            });
            cy.checkA11y();
        });
    });
};

const endreArbeidFlereUker = (uker: number[] = flereUker) => {
    it('velger uker for endring', () => {
        getAktivitet().within(() => {
            getPeriode().within(() => {
                getTestElement('endre-flere-uker-cb').wait(1000).click();
                const rows = uker.map((uke) => getUkeRow(uke));
                rows.forEach((row) => {
                    row.within(() => {
                        cy.get('input[type=checkbox]').parent().click();
                    });
                });
            });
        });
    });
    it('åpner dialog og endrer timer', () => {
        cy.injectAxe();
        getAktivitet().within(() => {
            getPeriode().within(() => {
                cy.get('[data-testid=endre-flere-uker-button]').click();
            });
        });
        getArbeidstimerModal().within(() => {
            getTestElement('timer-verdi').type('1.5');
            cy.checkA11y();
            cy.get('button[type="submit"]').click();
        });
    });
    it('kontrollerer endringer i tabell', () => {
        getAktivitet().within(() => {
            cy.get(`[data-testid="uke_46"] .endretArbeidstid__timer`).should('contain.text', '1 t. 30 m.');
            cy.get(`[data-testid="uke_47"] .endretArbeidstid__timer`).should('contain.text', '1 t. 30 m.');
        });
    });
};

interface UkeMedArbeidstid {
    ukenummer: string;
    tid: string;
}

const fyllUtArbeidstidUkjentArbeidsforhold = (
    orgnummer: string,
    arbeiderIPeriodenSvar: 'HELT_FRAVÆR' | 'SOM_VANLIG' | 'REDUSERT',
    uker?: UkeMedArbeidstid[],
) => {
    if (arbeiderIPeriodenSvar === 'REDUSERT' && uker) {
        it('legger til arbeidstid for enkeltuker', () => {
            cy.injectAxe();
            selectRadioByNameAndValue(`arbeidsaktivitet.a_${orgnummer}.arbeiderIPerioden`, arbeiderIPeriodenSvar);
            uker.forEach((uke) => {
                getTestElement(`aktivitet_a_${orgnummer}`).within(() => {
                    cy.get('.arbeidstidUkeTabell')
                        .get(`[data-testid=uke_${uke.ukenummer}]`)
                        .within(() => {
                            cy.get('[data-testid=endre-button]').click();
                        });
                });
                getArbeidstimerModal().within(() => {
                    getTestElement('toggle-timer').click();
                    getTestElement('timer-verdi').type(uke.tid);
                    cy.get('button[type="submit"]').click();
                });
            });
            cy.checkA11y();
        });
    } else {
        it(`Velger ${arbeiderIPeriodenSvar} for ukjent arbeidsgiver`, () => {
            selectRadioByNameAndValue(`arbeidsaktivitet.a_${orgnummer}.arbeiderIPerioden`, arbeiderIPeriodenSvar);
        });
    }
};

const fortsettTilOppsummering = () => {
    it('fortsetter til oppsummering fra arbeidstid', () => {
        submitSkjema();
    });
};

const kontrollerOppsummering = () => {
    it('er på oppsummeringssiden', () => {
        cy.get('h1').contains('Oppsummering').should('exist');
    });
    it('viser riktig informasjon i oppsummering', () => {
        getUkeRow(enkeltuke).within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('10 t. 30 m.'));
            expect(cy.get('[data-testid=timer-opprinnelig]').contains('4 t.'));
        });
    });
};

const kontrollerOppsummeringUkjentArbeidsforholdJobberRedusert = (orgnummer: string) => {
    it('viser riktig informasjon i oppsummering om ukjent arbeidsforhold', () => {
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}_erAnsatt`).contains('Ja');
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}_timerPerUke`).contains('30 t. 0 m');
        getUkeRow('4').within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('1 t. 0 m.'));
            expect(cy.get('[data-testid=normalt-timer]').contains('6 t. 0 m.'));
        });
        getUkeRow('5').within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('2 t. 0 m.'));
            expect(cy.get('[data-testid=normalt-timer]').contains('30 t. 0 m.'));
        });
        getUkeRow('6').within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('3 t. 0 m.'));
            expect(cy.get('[data-testid=normalt-timer]').contains('30 t. 0 m.'));
        });
        getUkeRow('7').within(() => {
            expect(cy.get('[data-testid=timer-faktisk]').contains('4 t. 0 m.'));
            expect(cy.get('[data-testid=normalt-timer]').contains('18 t. 0 m.'));
        });
    });
};

const kontrollerOppsummeringUkjentArbeidsforholdJobberIkke = (orgnummer: string) => {
    it('viser riktig informasjon i oppsummering om ukjent arbeidsforhold', () => {
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}_erAnsatt`).contains('Ja');
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}_timerPerUke`).contains('30 t. 0 m');
    });
};

const kontrollerOppsummeringUkjentArbeidsforholdJobberVanlig = (orgnummer: string) => {
    it('viser riktig informasjon i oppsummering om ukjent arbeidsforhold', () => {
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}_erAnsatt`).contains('Ja');
        getTestElement(`ukjentArbeidsforhold_a_${orgnummer}_timerPerUke`).contains('30 t. 0 m');
    });
};

const bekreftOpplysningerOgSendInn = () => {
    it('bekrefter opplysninger', () => {
        cy.injectAxe();
        getTestElement('bekreft-opplysninger').parent().click();
        cy.checkA11y();
    });
    it('sender inn endringsmelding og viser kvittering', () => {
        submitSkjema();
        cy.wait('@innsending').then(() => {
            cy.injectAxe();
            getTestElement('kvittering-heading').contains('Melding om endring er lagt til saken din');
            cy.checkA11y();
        });
    });
};

export const cyHelpers = {
    startUrl,
    date,
    setTestDate,
    startSøknad,
    fyllUtUkjentArbeidsforhold,
    leggTilOgFjernFerie,
    leggTilFerie,
    endreOgFjernFerie,
    endreArbeidEnkeltuke,
    endreArbeidFlereUker,
    fyllUtArbeidstidUkjentArbeidsforhold,
    fortsettTilOppsummering,
    kontrollerOppsummering,
    kontrollerOppsummeringUkjentArbeidsforholdJobberRedusert,
    kontrollerOppsummeringUkjentArbeidsforholdJobberIkke,
    kontrollerOppsummeringUkjentArbeidsforholdJobberVanlig,
    bekreftOpplysningerOgSendInn,
};
