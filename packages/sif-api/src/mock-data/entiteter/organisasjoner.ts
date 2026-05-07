import { OrganisasjonDto } from '@navikt/k9-brukerdialog-prosessering-api';

type OrganisasjonEntitet = OrganisasjonDto;

export const norskBedriftAS: OrganisasjonEntitet = {
    organisasjonsnummer: '947064649',
    navn: 'Norsk bedrift AS',
    ansattFom: '2003-01-16',
    ansattTom: undefined,
};

export const arbeidsgivansenAS: OrganisasjonEntitet = {
    organisasjonsnummer: '123456789',
    navn: 'Arbeidsgivansen AS',
    ansattFom: '2020-01-01',
    ansattTom: undefined,
};

export const vingeFlyfly: OrganisasjonEntitet = {
    organisasjonsnummer: '947064640',
    navn: 'Vinge flyfly',
    ansattFom: '2008-10-01',
    ansattTom: undefined,
};
