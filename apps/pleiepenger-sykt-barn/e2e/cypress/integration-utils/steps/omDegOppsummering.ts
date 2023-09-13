import { getTestElement } from '../utils';

const expectedSøkersNavn = 'Test Testesen'; // avhenger av mock data
const expectedSøkersFødselsnummer = '23058916765'; // avhenger av mock data

export const oppsummeringTestOmDeg = () => {
    getTestElement('oppsummering-søker-navn').should((element) => expect(expectedSøkersNavn).equal(element.text()));
    getTestElement('oppsummering-søker-fødselsnummer').should((element) =>
        expect(`Fødselsnummer: ${expectedSøkersFødselsnummer}`).equal(element.text()),
    );
};
