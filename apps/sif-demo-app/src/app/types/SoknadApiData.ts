export type SøknadApiData = {
    språk: string;
    søkerNorskIdent: string;
    barn: {
        aktørId: string;
        navn: string;
        fødselsdato: string;
    };
    borITrondheim: boolean;
    vedlegg: string[];
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
};
