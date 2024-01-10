import { DataBruktTilUtledningAnnetData } from '../../types/søknadApiData/SøknadApiData';
import { OmBarnetSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

/*
Disse feltene eksisterer ikke på format idag:  
        sammeAdresse,
        høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse,
Derfor sendes de som DataBruktTilUtledning til
*/
export const getOmBarnetDataBruktTilUtledningFromSøknadsdata = (
    omBarnet?: OmBarnetSøknadsdata,
): DataBruktTilUtledningAnnetData | undefined => {
    if (!omBarnet) {
        // Feil situasjon
        return undefined;
    }
    const fellesInfo: Pick<
        OmBarnetSøknadsdata,
        'sammeAdresse' | 'høyereRisikoForFravær' | 'høyereRisikoForFraværBeskrivelse'
    > = {
        sammeAdresse: omBarnet.sammeAdresse,
        høyereRisikoForFravær: omBarnet.høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse: omBarnet.høyereRisikoForFraværBeskrivelse,
    };

    switch (omBarnet.type) {
        case 'annetBarn':
            return {
                ...fellesInfo,
                relasjonTilBarnet: omBarnet.søkersRelasjonTilBarnet,
            };
        default:
            return {
                ...fellesInfo,
            };
    }
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData | undefined => {
    return getOmBarnetDataBruktTilUtledningFromSøknadsdata(søknadsdata.omBarnet);
};
