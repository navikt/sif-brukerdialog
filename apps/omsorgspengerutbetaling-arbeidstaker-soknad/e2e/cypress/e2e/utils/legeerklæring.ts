import { submitSkjema, getTestElementByType, getTestElement, getElement } from '../utils';

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
    cy.wait(200);
    getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
    submitSkjema();
};

const oppsummeringTestLegeerklæringEnFil = () => {
    getTestElement('legeerklæring-liste').within(() => {
        getElement('li')
            .eq(0)
            .within(() => {
                getElement('a').contains(fileName);
            });
    });
};

const oppsummeringTestLegeerklæringIngen = () => {
    getTestElement('ingenLegeerklæring').should((element) => expect(ingenLegeerklæringText).equal(element.text()));
};

export const fyllUtLegeerklæringSteg = (testType?) => {
    it('Last opp LEGEERKLÆRING', () => {
        switch (testType) {
            case 'komplett':
                fyllUtLegeerklæringEnFil();
                break;
            default:
                submitSkjema();
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
