import React from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { ErrorPage, SoknadErrorMessages } from '@navikt/sif-common-soknad-ds/lib';
import appSentryLogger from '../../utils/appSentryLogger';

interface Props {
    pathName: string;
    onReset?: () => void;
}

const UnknownRoutePage: React.FunctionComponent<Props> = ({ pathName, onReset }) => {
    useEffectOnce(() => {
        appSentryLogger.logError('UnknownRoute', pathName);
    });
    return (
        <ErrorPage
            pageTitle="Det oppstod en feil"
            bannerTitle="Det oppstod en feil"
            contentRenderer={() => {
                return <SoknadErrorMessages.UnknownRoute onReset={onReset} />;
            }}
        />
    );
};

export default UnknownRoutePage;
