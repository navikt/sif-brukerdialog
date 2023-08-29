import { getTestElement } from '.';
import { cyApiMockData } from '../data/cyApiMockData';
import { oppsummeringTestLegeerklæringSteg } from './legeerklæring';
import { oppsummeringTestMedlemskapSteg } from './medlemskap';

export const kontrollerOppsummering = (type: string) => {
    it('Har riktig oppsummering', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);

        oppsummering.should('contain', cyApiMockData.arbeidsgiverMock.organisasjoner[0].navn);
        oppsummering.should('contain', cyApiMockData.arbeidsgiverMock.organisasjoner[0].organisasjonsnummer);

        oppsummering.should('contain', cyApiMockData.arbeidsgiverMock.organisasjoner[1].navn);
        oppsummering.should('contain', cyApiMockData.arbeidsgiverMock.organisasjoner[1].organisasjonsnummer);

        //TODO mer tester på Fravær fra arbeid

        oppsummeringTestMedlemskapSteg(type);
        oppsummeringTestLegeerklæringSteg(type);
    });
};
