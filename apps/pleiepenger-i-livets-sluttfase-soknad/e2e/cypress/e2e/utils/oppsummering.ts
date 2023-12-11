import { getTestElement } from './cyHelpers';
import { cyApiMockData } from '../data/cyApiMockData';
import { oppsummeringTestLegeerklæringSteg } from './legeerklæring';
import { oppsummeringTestMedlemskapSteg } from './medlemskap';

export const kontrollerOppsummering = (type: string) => {
    it('har riktig oppsummering', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);

        oppsummeringTestMedlemskapSteg();
        oppsummeringTestLegeerklæringSteg(type);
    });
};
