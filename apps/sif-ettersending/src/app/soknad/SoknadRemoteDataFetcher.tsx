import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import RemoteDataHandler from '@navikt/sif-common-soknad-ds/lib/remote-data-handler/RemoteDataHandler';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import LoadingPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/LoadingPage';
import SoknadErrorMessages from '@navikt/sif-common-soknad-ds/lib/soknad-error-messages/SoknadErrorMessages';
import useSoknadEssentials, { SoknadEssentials } from '../hooks/useSoknadEssentials';
import Soknad from './Soknad';
import { isForbidden } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { ApplicationType } from '../types/ApplicationType';
import IkkeTilgangPage from '../components/pages/ikke-tilgang-page/ikkeTilgangPage';
import { useParams } from 'react-router-dom';

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
    //TODO - IF søknadstype undefined
    const soknadEssentials = useSoknadEssentials(søknadstype);

    if (!søknadstype) {
        return <>ugyldig path</>;
    }

    return (
        <RemoteDataHandler<SoknadEssentials>
            remoteData={soknadEssentials}
            initializing={(): React.ReactNode => <LoadingPage />}
            loading={(): React.ReactNode => <LoadingPage />}
            error={(error): React.ReactNode => (
                <>
                    {isForbidden(error) && <IkkeTilgangPage søknadstype={søknadstype} />}
                    {!isForbidden(error) && (
                        <ErrorPage
                            bannerTitle={intlHelper(intl, 'application.title')}
                            contentRenderer={(): JSX.Element => <SoknadErrorMessages.GeneralApplicationError />}
                        />
                    )}
                </>
            )}
            success={([person, soknadTempStorage]): React.ReactNode => {
                return <Soknad søker={person} søknadstype={søknadstype} soknadTempStorage={soknadTempStorage} />;
            }}
        />
    );
};

export default SoknadRemoteDataFetcher;
