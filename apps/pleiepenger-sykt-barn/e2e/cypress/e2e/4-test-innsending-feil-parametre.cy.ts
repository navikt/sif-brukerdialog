import { contextConfig, gotoStep } from '../integration-utils/contextConfig';
import { mellomlagring } from '../integration-utils/mocks/mellomlagring';

const invalidParamaterResponse = {
    type: '/problem-details/invalid-request-parameters',
    title: 'invalid-request-parameters',
    status: 400,
    detail: 'Requesten inneholder ugyldige paramtere.',
    instance: 'about:blank',
    invalid_parameters: [
        'frilans.misterHonorar kan ikke være null dersom frilans.type er HONORAR',
        'frilans.startdato kan ikke være null dersom frilans.type er HONORAR',
        'frilans.jobberFortsattSomFrilans kan ikke være null dersom frilans.type er HONORAR',
    ],
};

describe('Send inn søknad med feil parametre', () => {
    contextConfig({ mellomlagring });

    it.only('Vise feilmelding når det returneres 400 fra backend', () => {
        cy.intercept('POST', `/pleiepenger-sykt-barn/innsending`, {
            statusCode: 400,
            body: invalidParamaterResponse,
        }).as('postInnsending');

        gotoStep('oppsummering');

        cy.get('input[name="harBekreftetOpplysninger"]').click();
        cy.get('button').contains('Send inn søknaden').click();
        expect(cy.contains('Oops, der oppstod det en feil')).exist;
        cy.contains('Vis mer informasjon om feilen (teknisk)').click();
        cy.contains('frilans.misterHonorar kan ikke være null dersom frilans.type er HONORAR').should('exist');
    });
});
