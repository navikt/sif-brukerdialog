import dayjs = require('dayjs');
import { contextConfig, gotoStep } from '../integration-utils/contextConfig';
import { mellomlagring } from '../integration-utils/mocks/mellomlagring';
import { getSøknadsperiode } from '../integration-utils/utils';

const getMellomlagring = () => {
    const søknadsperiode = getSøknadsperiode();
    mellomlagring.formValues.periodeFra = dayjs(søknadsperiode.from).format('YYYY-MM-DD');
    mellomlagring.formValues.periodeTil = dayjs(søknadsperiode.to).format('YYYY-MM-DD');
    return mellomlagring;
};

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
    contextConfig({ mellomlagring: getMellomlagring() });
    beforeEach(() => {
        gotoStep('oppsummering');
        cy.intercept('POST', `/pleiepenger-sykt-barn/innsending`, {
            statusCode: 400,
            body: invalidParamaterResponse,
        }).as('postInnsending');
    });

    it('Vise feilmelding når det returneres 400 fra backend', () => {
        cy.get('input[name="harBekreftetOpplysninger"]').click();
        cy.get('button').contains('Send inn søknaden').click();
        expect(cy.contains('Oops, der oppstod det en feil')).exist;
        cy.contains('Vis mer informasjon om feilen (teknisk)').click();
        cy.contains('frilans.misterHonorar kan ikke være null dersom frilans.type er HONORAR').should('exist');
    });
});
