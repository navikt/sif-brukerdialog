import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/atoms/loading-spinner/LoadingSpinner';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ErrorPage, SoknadErrorMessages } from '@navikt/sif-common-soknad-ds';
import useSoknadEssentials from '../hooks/useSoknadEssentials';
import IkkeTilgangPage from '../pages/ikke-tilgang-page/ikkeTilgangPage';
import { RequestStatus } from '../types/RequestStatus';
import { Søknadstype } from '../types/Søknadstype';
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
        case 'pleiepengerLivetsSluttfase':
            return Søknadstype.pleiepengerLivetsSluttfase;
    }
    return undefined;
};

// const isSøknadstype = (type: string): type is Søknadstype => {
//     return [
//         Søknadstype.omsorgspenger,
//         Søknadstype.pleiepengerSyktBarn,
//         Søknadstype.pleiepengerLivetsSluttfase,
//     ].includes(type as any);
// };

const SoknadRemoteDataFetcher = (): JSX.Element => {
    const intl = useIntl();
    const { soknadstype } = useParams();
    const søknadstype = getSøknadstypeFromUrlParam(soknadstype);

    if (!søknadstype) {
        return <>ugyldig path</>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const initialData = useSoknadEssentials(søknadstype);
    const { status } = initialData;

    if (status === 'loading') {
        return <LoadingSpinner size="3xlarge" style="block" />;
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
            søknadstype={søknadstype}
            soknadTempStorage={initialData.data.mellomlagring}
        />
    );
};

export default SoknadRemoteDataFetcher;
