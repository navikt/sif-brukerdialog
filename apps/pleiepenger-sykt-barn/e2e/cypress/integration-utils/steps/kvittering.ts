export const kvittering = () => {
    it('STEG 10: Kvittering', () => {
        cy.get('input[name="harBekreftetOpplysninger"]').click();
        cy.get('button').contains('Send inn søknaden').click();
    });
};
