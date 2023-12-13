import { useSøknadContext } from '@hooks';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { getDateRangeText } from '@navikt/sif-common-utils';

export const useSakUtledet = () => {
    const {
        state: { sak, søker },
    } = useSøknadContext();

    const søkersNavn = formatName(søker.fornavn, søker.etternavn, søker.mellomnavn);
    const barnetsNavn = formatName(sak.barn.fornavn, sak.barn.etternavn, sak.barn.mellomnavn);

    return {
        søkersNavn,
        søkersFornavn: søker.fornavn,
        barnetsNavn,
        samletSøknadsperiodeTekst: getDateRangeText(sak.samletSøknadsperiode, {
            compact: false,
            includeDayName: true,
        }),
    };
};
