/**
 *
 * Mock data for en sak med pleiepenger for sykt barn. Data er den samme som kommer
 * fra api endepunktetene i nextjs, ikke fra k9 backend, så det er transformerte data.
 */

const søker = {
    aktørId: '2623120193326',
    fødselsdato: '1991-06-20',
    fødselsnummer: '20469134998',
    fornavn: 'SORGLØS',
    etternavn: 'FELTTOG',
};

const saksbehandlingstid = { saksbehandlingstidUker: 7 };

const soknader = [
    {
        søknadId: '23a5059c-8abc-4c20-9585-e1bb979a31d6',
        status: 'MOTTATT',
        journalpostId: '454018504',
        dokumenter: [
            {
                journalpostId: '454018504',
                dokumentInfoId: '454428816',
                sakId: '100248G',
                tittel: 'Søknad om pleiepenger for sykt barn',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://sif-innsyn-api/dokument/454018504/454428816/ARKIV',
            },
        ],
        opprettet: '2025-09-16T09:46:45.364Z',
        endret: '2025-09-16T09:47:02.000Z',
        søknadstype: 'PP_SYKT_BARN',
        søknad: {
            arbeidsgivere: [
                {
                    erAnsatt: true,
                    navn: 'SNILL TORPEDO',
                    organisasjonsnummer: '967170232',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            fraOgMed: '2025-09-01T00:00:00.000Z',
            tilOgMed: '2025-09-26T00:00:00.000Z',
        },
    },
    {
        søknadId: '1f71b1f2-7cd8-4cf4-9c33-bb5f0c5dd476',
        status: 'MOTTATT',
        journalpostId: '454018945',
        dokumenter: [
            {
                journalpostId: '454018945',
                dokumentInfoId: '454429331',
                sakId: '100248G',
                tittel: 'Søknad om pleiepenger for sykt barn',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://sif-innsyn-api/dokument/454018945/454429331/ARKIV',
            },
        ],
        opprettet: '2025-09-17T08:08:41.254Z',
        endret: '2025-09-17T08:08:59.000Z',
        søknadstype: 'PP_SYKT_BARN',
        søknad: {
            arbeidsgivere: [
                {
                    erAnsatt: true,
                    navn: 'SNILL TORPEDO',
                    organisasjonsnummer: '967170232',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            fraOgMed: '2025-09-01T00:00:00.000Z',
            tilOgMed: '2025-09-12T00:00:00.000Z',
        },
    },
    {
        søknadId: 'a46966d1-0322-43a2-88ff-9593d18a4dc0',
        status: 'MOTTATT',
        journalpostId: '454041697',
        dokumenter: [
            {
                journalpostId: '454041697',
                dokumentInfoId: '454454992',
                sakId: '100248G',
                tittel: 'Søknad om pleiepenger for sykt barn',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://sif-innsyn-api/dokument/454041697/454454992/ARKIV',
            },
        ],
        opprettet: '2025-11-05T09:03:07.948Z',
        endret: '2025-11-05T09:03:20.000Z',
        søknadstype: 'PP_SYKT_BARN',
        søknad: {
            arbeidsgivere: [
                {
                    erAnsatt: true,
                    navn: 'SNILL TORPEDO',
                    organisasjonsnummer: '967170232',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            fraOgMed: '2025-11-17T00:00:00.000Z',
            tilOgMed: '2025-11-23T00:00:00.000Z',
        },
    },
];

export const ingenSakerMockData = {
    søker,
    soknader,
    saksbehandlingstid,
};
