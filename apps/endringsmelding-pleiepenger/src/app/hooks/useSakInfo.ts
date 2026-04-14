import { useSøknadContext } from '@app/hooks';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateFormatter, getDateRangeText } from '@navikt/sif-common-utils';

import { useAppIntl } from '../i18n';

const getBarnetsNavn = (barn): string => {
    /** Midlertidig håndtering av anonymisert barn */
    if (barn.fornavn === '' && barn.etternavn === '') {
        return '';
    }
    return formatName(barn.fornavn, barn.etternavn, barn.mellomnavn);
};

export const useSakUtledet = () => {
    // const { locale } = useIntl();
    const { text, locale } = useAppIntl();
    const {
        state: { sak, søker },
    } = useSøknadContext();

    const søkersNavn = formatName(søker.fornavn, søker.etternavn, søker.mellomnavn);
    const barnetsNavn = getBarnetsNavn(sak.barn);

    return {
        søkersNavn,
        søkersFornavn: søker.fornavn,
        barnetsNavn,
        samletSøknadsperiodeTekst: getDateRangeText(sak.samletSøknadsperiode, locale, {
            compact: false,
            includeDayName: true,
        }),
        samletSøknadsperiodeTekstVariant2: text('samletSøknadsperiodeTekstVariant2', {
            fra: dateFormatter.dayDateMonthYear(sak.samletSøknadsperiode.from, locale),
            til: dateFormatter.dayDateMonthYear(sak.samletSøknadsperiode.to, locale),
        }),
        samletSøknadsperiodeTekstVariant3: text('samletSøknadsperiodeTekstVariant3', {
            fra: dateFormatter.dayDateMonthYear(sak.samletSøknadsperiode.from, locale),
            til: dateFormatter.dayDateMonthYear(sak.samletSøknadsperiode.to, locale),
        }),
    };
};
