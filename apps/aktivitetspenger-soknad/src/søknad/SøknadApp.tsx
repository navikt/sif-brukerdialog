import { Theme } from '@navikt/ds-react';
import { Søker, useKontonummer, useRegistrerteBarn } from '@navikt/sif-common-query';
import { LoadingPage } from '@navikt/sif-common-soknad-ds';

import { ApiErrorKey, useAnalyticsInstance } from '../analytics/analytics';
import AppRouter from '../AppRouter';
import { useAppIntl } from '../i18n';
import AppErrorPage from '../pages/HentAppInfoErrorPage';
import { formaterKontonummer } from '../utils/formaterKontonummer';
import { SøknadProvider } from './context/SøknadContext';
import SøknadRoutes from './SøknadRouter';
import { HarKontonummerEnum } from './steg/oppsummering/oppsummeringUtils';
import { KontonummerOppslagInfo } from './types';

interface Props {
    søker: Søker;
}

const SøknadApp = ({ søker }: Props) => {
    const kontonummer = useKontonummer();
    const barn = useRegistrerteBarn();
    const { text } = useAppIntl();
    const { logApiError } = useAnalyticsInstance();

    if (barn.isLoading || kontonummer.isLoading) {
        return <LoadingPage />;
    }

    if (barn.isError) {
        const { context, message, type } = barn.error;
        logApiError(ApiErrorKey.barn, { error: { context, message, type } });

        return <AppErrorPage error={text('søknadApp.loading.error')} />;
    }

    const getKontonummerInfo = (): KontonummerOppslagInfo => {
        if (kontonummer.error) {
            return {
                harKontonummer: HarKontonummerEnum.UVISST,
            };
        }

        return kontonummer.data?.harKontonummer && kontonummer.data.kontonummer
            ? {
                  harKontonummer: HarKontonummerEnum.JA,
                  kontonummerFraRegister: kontonummer.data.kontonummer,
                  formatertKontonummer: formaterKontonummer(kontonummer.data.kontonummer),
              }
            : {
                  harKontonummer: HarKontonummerEnum.NEI,
              };
    };

    return (
        <Theme hasBackground={true}>
            <AppRouter>
                <SøknadProvider søker={søker} kontonummerInfo={getKontonummerInfo()} registrerteBarn={barn.data || []}>
                    <SøknadRoutes />
                </SøknadProvider>
            </AppRouter>
        </Theme>
    );
};

export default SøknadApp;
