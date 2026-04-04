import { formatName } from '@navikt/sif-common-utils';
import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';

import { SøknadStepId } from '../setup/config/soknadStepConfig';
import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';

export const getSøknadApiDataFromSøknad = ({
    søker,
    søknadsdata,
    registrerteBarn,
    språk = 'nb',
}: {
    søknadsdata: Søknadsdata;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    språk?: 'nb' | 'nn';
}): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
    const barn = søknadsdata[SøknadStepId.BARN];
    const bosted = søknadsdata[SøknadStepId.BOSTED];
    const vedlegg = søknadsdata[SøknadStepId.VEDLEGG];
    const { harForståttRettigheterOgPlikter } = søknadsdata;

    const registrertBarn = registrerteBarn.find((item) => item.aktørId === barn?.barnetSøknadenGjelder);

    if (!barn || !registrertBarn || !harForståttRettigheterOgPlikter || !bosted) {
        return undefined;
    }

    return {
        søkerNorskIdent: søker.fødselsnummer,
        språk,
        barn: {
            aktørId: registrertBarn.aktørId,
            navn: formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn),
            fødselsdato: registrertBarn.fødselsdato,
        },
        borITrondheim: bosted.borITrondheim,
        vedlegg: vedlegg?.vedlegg.map((file) => file.id) ?? [],
        harForståttRettigheterOgPlikter,
    };
};
