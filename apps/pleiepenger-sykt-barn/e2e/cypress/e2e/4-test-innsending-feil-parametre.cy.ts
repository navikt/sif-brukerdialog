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
    statusCode: 400,
    body: {
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
    },
};
describe('Send inn søknad med feil parametre', () => {
    contextConfig({ mellomlagring: getMellomlagring(), innsendingResponse: invalidParamaterResponse });

    it('Vise feilmelding når det returneres 400 fra backend', () => {
        gotoStep('oppsummering');
        cy.get('input[name="harBekreftetOpplysninger"]').click();
        cy.get('button').contains('Send inn søknaden').click();
        cy.wait('@postInnsending');
        expect(cy.contains('Oops, der oppstod det en feil')).exist;
        cy.contains('Vis mer informasjon om feilen (teknisk)').click();
        cy.contains('frilans.misterHonorar kan ikke være null dersom frilans.type er HONORAR').should('exist');
    });
});
