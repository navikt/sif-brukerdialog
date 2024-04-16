import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ErrorPage, LoadingPage, SoknadErrorMessages } from '@navikt/sif-common-soknad-ds';
import useSoknadEssentials from '../hooks/useSoknadEssentials';
import IkkeTilgangPage from '../pages/ikke-tilgang-page/ikkeTilgangPage';
import { RequestStatus } from '../types/RequestStatus';
import { Søknadstype } from '../types/Søknadstype';
import { redirectTo } from '../utils/navigationUtils';
import Soknad from './Soknad';

const getSøknadstypeFromUrlParam = (param?: string): Søknadstype | undefined => {
    switch (param) {
        case 'omsorgspenger':
            return Søknadstype.omsorgspenger;
        case 'ekstraomsorgsdager':
            return Søknadstype.ekstraomsorgsdager;
        case 'utbetaling':
            return Søknadstype.utbetaling;
        case 'utbetalingarbeidstaker':
            return Søknadstype.utbetalingarbeidstaker;
        case 'regnetsomalene':
            return Søknadstype.regnetsomalene;
        case 'pleiepenger':
            return Søknadstype.pleiepengerSyktBarn;
        case 'pleiepenger-livets-sluttfase':
        case 'pleiepengerLivetsSluttfase':
            return Søknadstype.pleiepengerLivetsSluttfase;
    }
    return undefined;
};

const SoknadRemoteDataFetcher = (): JSX.Element => {
    const intl = useIntl();
    const { soknadstype } = useParams();
    const søknadstype = getSøknadstypeFromUrlParam(soknadstype);

    if (!søknadstype) {
        redirectTo('/');
        return <LoadingPage />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const initialData = useSoknadEssentials(søknadstype);
    const { status } = initialData;

    if (status === 'loading') {
        return <LoadingPage />;
    }

    if (status === 'error') {
        return (
            <ErrorPage
                bannerTitle={intlHelper(intl, `application.title.${søknadstype}`)}
                contentRenderer={(): JSX.Element => (
                    <>
                        <SoknadErrorMessages.GeneralApplicationError />
                    </>
                )}
            />
        );
    }

    if (status === RequestStatus.ikkeTilgang) {
        return <IkkeTilgangPage søknadstype={søknadstype} />;
    }

    return (
        <Soknad
            søker={initialData.data.søker}
            barn={initialData.data.barn}
            søknadstype={søknadstype}
            soknadTempStorage={initialData.data.mellomlagring}
        />
    );
};

export default SoknadRemoteDataFetcher;
