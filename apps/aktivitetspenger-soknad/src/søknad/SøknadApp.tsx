import { Theme } from '@navikt/ds-react';

import { SøknadProvider } from './context/SøknadContext';
import { useBarn } from './hooks/api/useBarn';
import { useKontonummer } from './hooks/api/useKontonummer';
import SøknadRoutes from './SøknadRouter';
import { HarKontonummerEnum } from './steg/oppsummering/oppsummeringUtils';
import { KontonummerOppslagInfo } from './types';
import { formaterKontonummer } from './utils/formaterKontonummer';
import { useAppIntl } from '../i18n';
import { ApiErrorKey, useAnalyticsInstance } from '../analytics/analytics';
import { LoadingPage } from '@navikt/sif-common-soknad-ds';
import AppErrorPage from '../pages/HentAppInfoErrorPage';
import { Søker } from '@navikt/sif-common-api';
import AppRouter from '../AppRouter';

interface Props {
    søker: Søker;
}

const SøknadApp = ({ søker }: Props) => {
    const kontonummer = useKontonummer();
    const barn = useBarn();
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
                <SøknadProvider søker={søker} kontonummerInfo={getKontonummerInfo()} barn={barn.data || []}>
                    <SøknadRoutes />
                </SøknadProvider>
            </AppRouter>
        </Theme>
    );
};

export default SøknadApp;
