import { clickSendInnSøknad } from '../../integration-utils/utils';

export const kvittering = () => {
    it('STEG 10: Kvittering', () => {
        cy.get('input[name="harBekreftetOpplysninger"]').click();
        clickSendInnSøknad();
    });
};
