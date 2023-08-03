import { clickFortsett, getTestElement, getTestElementByType } from '../utils';

const fileName = 'navlogopng.png';
const ingenLegeerklæringText = 'Ingen legeerklæring er lastet opp';

const fyllUtLegeerklæringEnFil = () => {
    cy.fixture(fileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) =>
            (getTestElementByType('file') as any).attachFile({
                fileContent,
                fileName,
                mimeType: 'image/png', //getMimeType(fileName),
                encoding: 'utf8',
            })
        );
    clickFortsett();
};

const oppsummeringTestLegeerklæringEnFil = () => {
    getTestElement('oppsummering-vedleggList').within(() => {
        cy.get('li')
            .eq(0)
            .should((element) => expect(fileName).equal(element.text()));
    });
};

const oppsummeringTestLegeerklæringIngen = () => {
    getTestElement('ingenLegeerklæring').should((element) => expect(ingenLegeerklæringText).equal(element.text()));
};

export const fyllUtLegeerklæringSteg = (testType?) => {
    it('STEG 8: LAST OPP LEGEERKLÆRING', () => {
        switch (testType) {
            case 'komplett':
                fyllUtLegeerklæringEnFil();
                break;
            default:
                clickFortsett();
                break;
        }
    });
};

export const oppsummeringTestLegeerklæringSteg = (testType?) => {
    switch (testType) {
        case 'komplett':
            oppsummeringTestLegeerklæringEnFil();
            break;
        default:
            oppsummeringTestLegeerklæringIngen();
            break;
    }
};
