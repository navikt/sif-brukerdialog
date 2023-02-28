import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@navikt/sif-common-core-ds/lib/components/loading-spinner/LoadingSpinner';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import SoknadErrorMessages from '@navikt/sif-common-soknad-ds/lib/soknad-error-messages/SoknadErrorMessages';
import useSoknadEssentials from '../hooks/useSoknadEssentials';
import { ApplicationType } from '../types/ApplicationType';
import Soknad from './Soknad';
import { RequestStatus } from '../types/RequestStatus';
import IkkeTilgangPage from '../pages/ikke-tilgang-page/ikkeTilgangPage';

const getSøknadstypeFromYtelse = (param?: string): ApplicationType | undefined => {
    switch (param) {
        case 'omsorgspenger':
            return ApplicationType.omsorgspenger;
        case 'ekstraomsorgsdager':
            return ApplicationType.ekstraomsorgsdager;
        case 'utbetaling':
            return ApplicationType.utbetaling;
        case 'utbetalingarbeidstaker':
            return ApplicationType.utbetalingarbeidstaker;
        case 'regnetsomalene':
            return ApplicationType.regnetsomalene;
        case 'deling':
            return ApplicationType.deling;
        case 'pleiepenger':
            return ApplicationType.pleiepengerBarn;
        case 'pleiepenger-livets-sluttfase':
            return ApplicationType.pleiepengerLivetsSluttfase;
    }
    return undefined;
};

const SoknadRemoteDataFetcher = (): JSX.Element => {
    const intl = useIntl();
    const { ytelse } = useParams();
    const søknadstype = getSøknadstypeFromYtelse(ytelse);

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
