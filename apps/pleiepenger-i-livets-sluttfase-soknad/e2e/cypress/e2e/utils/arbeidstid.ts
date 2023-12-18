import { Duration } from '@navikt/sif-common-utils';
import { submitSkjema } from './cyHelpers';

type Ukedag = 'mandag' | 'tirsdag' | 'onsdag' | 'torsdag' | 'fredag';

const fyllUtTimerDag = (ukedag: Ukedag, duration: Duration) => {
    cy.get('legend')
        .contains(ukedag)
        .closest('.formikTimeInput')
        .within(() => {
            cy.get('input').eq(0).clear().type(duration.hours).blur();
            cy.get('input').eq(1).clear().type(duration.minutes).blur();
        });
};

const fyllUtTimerIUke = (
    uke: number,
    dager: {
        mandag?: Duration;
        tirsdag?: Duration;
        onsdag?: Duration;
        torsdag?: Duration;
        fredag?: Duration;
    },
) => {
    cy.get('h3')
        .contains(`Uke ${uke}`, { matchCase: false })
        .closest('.durationWeekdaysWeek')
        .within(() => {
            if (dager.mandag) {
                fyllUtTimerDag('mandag', dager.mandag);
            }
            if (dager.tirsdag) {
                fyllUtTimerDag('tirsdag', dager.tirsdag);
            }
            if (dager.onsdag) {
                fyllUtTimerDag('onsdag', dager.onsdag);
            }
            if (dager.torsdag) {
                fyllUtTimerDag('torsdag', dager.torsdag);
            }
            if (dager.fredag) {
                fyllUtTimerDag('fredag', dager.fredag);
            }
        });
};

export const fyllUtArbeidstidToMånederEnArbeidsgiver = () => {
    it('Fyller ut arbeidstid når bruker har kun én arbeidsgiver', () => {
        // August
        // cy.get('.navds-accordion__item').eq(0).click();
        // cy.get('.navds-accordion__item .durationWeekdaysWeek').should('be.visible');

        fyllUtTimerIUke(33, {
            mandag: { hours: '3', minutes: '30' },
            onsdag: { hours: '3', minutes: '30' },
        });

        // cy.get('.navds-accordion__item').eq(1).click();
        // cy.get('.navds-accordion__item .durationWeekdaysWeek').should('be.visible');

        fyllUtTimerIUke(36, {
            mandag: { hours: '3', minutes: '30' },
        });
        fyllUtTimerIUke(38, {
            mandag: { hours: '3', minutes: '30' },
        });

        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};
