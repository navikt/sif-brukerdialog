import { getTestElement } from '.';
import { cyApiMockData } from '../data/cyApiMockData';
import { oppsummeringTestLegeerklæringSteg } from './legeerklæring';
import { oppsummeringTestMedlemskapSteg } from './medlemskap';

export const kontrollerOppsummering = (type: string) => {
    it('har riktig oppsummering', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);

        oppsummering.should('contain', cyApiMockData.barnMock.barn[4].fornavn);
        oppsummering.should('contain', cyApiMockData.barnMock.barn[4].etternavn);
        oppsummering.should('contain', cyApiMockData.barnMock.barn[4].mellomnavn);

        oppsummeringTestMedlemskapSteg(type);
        oppsummeringTestLegeerklæringSteg(type);
    });
};
