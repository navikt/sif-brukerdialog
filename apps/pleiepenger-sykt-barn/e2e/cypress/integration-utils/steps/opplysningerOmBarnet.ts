import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { clickFortsett, getInputByName, getTestElement, getTestElementByType } from '../utils';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const barnetsNavnRegistrert = 'ALFABETISK FAGGOTT'; //Fra mock
const barnetsFødselsdatoOppsummering = '08.06.2019';
const barnetsNavn = 'ALFABETISK FAGGOTT';
const barnetsFødselsnummer = '08861999573';
const barnetsFødselsdato = '08.06.2019';
const expectedRelasjonTilBarn = 'mor';
const relasjonAnnetBeskrivelse = 'Annet relasjon beskrivelse';
const årsakManglerIdentitetsnummer = 'Barnet bor i utlandet';
const fileName = 'fødselsattest.png';

export const fyllUtBarnRegistrert = () => {
    getTestElement('opplysninger-om-barnet').then(() => {
        getTestElementByType('radio').first().check({ force: true });

        clickFortsett();
    });
};

export const fyllUtAnnetBarnMedFnr = () => {
    getTestElement('opplysninger-om-barnet').then(() => {
        getInputByName('søknadenGjelderEtAnnetBarn').click({ force: true });
        getInputByName('barnetsFødselsnummer').click().type(barnetsFødselsnummer).blur();
        getInputByName('barnetsNavn').click().type(barnetsNavn).blur();
        getInputByName('relasjonTilBarnet').first().check({ force: true });

        clickFortsett();
    });
};

export const fyllUtAnnetBarnUtenFnr = () => {
    getTestElement('opplysninger-om-barnet').then(() => {
        getInputByName('søknadenGjelderEtAnnetBarn').click({ force: true });
        getInputByName('barnetHarIkkeFnr').click({ force: true });
        getInputByName('årsakManglerIdentitetsnummer').eq(1).check({ force: true });
        getInputByName('barnetsNavn').click().type(barnetsNavn).blur();
        getInputByName('barnetsFødselsdato').click().type(barnetsFødselsdato).blur();
        getInputByName('relasjonTilBarnet').eq(4).check({ force: true }); //Velg annet
        getTestElement('opplysninger-om-barnet-relasjonAnnetBeskrivelse').click().type(relasjonAnnetBeskrivelse).blur();
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png', //getMimeType(fileName),
                    encoding: 'utf8',
                }),
            );
        clickFortsett();
    });
};

export const oppsummeringTestRegistrertBarn = () => {
    getTestElement('oppsummering-barnets-navn-registert').should((element) =>
        expect(`Navn: ${barnetsNavnRegistrert}`).equal(element.text()),
    );
    getTestElement('oppsummering-barnets-fødselsdato-registrert').should((element) =>
        expect(`Fødselsdato: ${barnetsFødselsdatoOppsummering}`).equal(element.text()),
    );
};

export const oppsummeringTestAnnetBarnMedFnr = () => {
    getTestElement('oppsummering-barnets-navn').should((element) =>
        expect(`Navn: ${barnetsNavn}`).equal(element.text()),
    );
    getTestElement('oppsummering-barnets-fødselsnummer').should((element) =>
        expect(`Fødselsnummer: ${barnetsFødselsnummer}`).equal(element.text()),
    );

    getTestElement('oppsummering-barn-relasjon').should((element) =>
        expect(`Du er ${expectedRelasjonTilBarn} til barnet`).equal(element.text()),
    );
};

export const oppsummeringTestAnnetBarnUtenFnr = () => {
    getTestElement('oppsummering-barnets-fødselsdato').should((element) =>
        expect(`Fødselsdato: ${barnetsFødselsdato}`).equal(element.text()),
    );
    getTestElement('oppsummering-barnets-navn').should((element) =>
        expect(`Navn: ${barnetsNavn}`).equal(element.text()),
    );

    getTestElement('oppsummering-årsakManglerIdentitetsnummer').should((element) =>
        expect(årsakManglerIdentitetsnummer).equal(element.text()),
    );

    getTestElement('oppsummering-barn-relasjon-annet-beskrivelse').should((element) =>
        expect(relasjonAnnetBeskrivelse).equal(element.text()),
    );

    getTestElement('oppsummering-omBarn-fødselsattest').within(() => {
        cy.get('li')
            .eq(0)
            .should((element) => expect(fileName).equal(element.text()));
    });
};

export const fyllUtOmBarnSteg = (testType?) => {
    it('STEG 1: Barn', () => {
        switch (testType) {
            case 'komplett':
                fyllUtAnnetBarnUtenFnr();
                break;
            case 'barnMedFnr':
                oppsummeringTestAnnetBarnMedFnr();
                break;
            default:
                fyllUtBarnRegistrert();
                break;
        }
    });
};

export const oppsummeringTestOmBarn = (testType?) => {
    switch (testType) {
        case 'komplett':
            oppsummeringTestAnnetBarnUtenFnr();
            break;
        case 'barnMedFnr':
            oppsummeringTestAnnetBarnMedFnr();
            break;
        default:
            oppsummeringTestRegistrertBarn();
            break;
    }
};
