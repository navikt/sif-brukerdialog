import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ErrorGuide from '@navikt/sif-common-core/lib/components/error-guide/ErrorGuide';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Lenke from 'nav-frontend-lenker';
import { Ingress } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';

interface ErrorWithFrontpageUrlProps {
    soknadFrontpageUrl?: string;
}

export interface LastAvailableStepInfo {
    route: string;
    title: string;
}

const SoknadErrorMessage = ({
    titleKey,
    contentKey,
    soknadFrontpageUrl,
    children,
}: {
    titleKey: string;
    contentKey: string;
    soknadFrontpageUrl?: string;
    children?: React.ReactNode;
}) => {
    const intl = useIntl();
    return (
        <ErrorGuide title={intlHelper(intl, titleKey)}>
            <Ingress tag="div">
                <p>
                    <FormattedMessage id={contentKey} />
                </p>
                {soknadFrontpageUrl && (
                    <Lenke href={soknadFrontpageUrl}>
                        <FormattedMessage id="common.soknadErrorMessages.gotoSoknadFrontpage" />
                    </Lenke>
                )}
                {children}
            </Ingress>
        </ErrorGuide>
    );
};

const GeneralApplicationError = () => (
    <SoknadErrorMessage
        titleKey="common.soknadErrorMessages.defaultTitle"
        contentKey="common.soknadErrorMessages.generalError.content"
    />
);

const GeneralSoknadError = ({ soknadFrontpageUrl }: ErrorWithFrontpageUrlProps) => (
    <SoknadErrorMessage
        titleKey="common.soknadErrorMessages.defaultTitle"
        contentKey="common.soknadErrorMessages.generalSoknadError.content"
        soknadFrontpageUrl={soknadFrontpageUrl}
    />
);

const MissingSoknadDataError = ({
    soknadFrontpageUrl,
    lastAvailableStep,
}: ErrorWithFrontpageUrlProps & {
    lastAvailableStep?: { route: string; title: string };
}) =>
    lastAvailableStep === undefined ? (
        <SoknadErrorMessage
            titleKey="common.soknadErrorMessages.missingSoknadData.title"
            contentKey="common.soknadErrorMessages.missingSoknadData.content"
            soknadFrontpageUrl={soknadFrontpageUrl}
        />
    ) : (
        <SoknadErrorMessage
            titleKey="common.soknadErrorMessages.unavailableSoknadStep.title"
            contentKey="common.soknadErrorMessages.unavailableSoknadStep.content">
            <Link to={lastAvailableStep.route}>
                <FormattedMessage
                    id="common.soknadErrorMessages.unavailableSoknadStep.linkText"
                    values={{ steg: lastAvailableStep.title }}
                />
            </Link>
        </SoknadErrorMessage>
    );

const MissingApiDataError = ({ soknadFrontpageUrl }: ErrorWithFrontpageUrlProps) => (
    <SoknadErrorMessage
        titleKey="common.soknadErrorMessages.missingApiData.title"
        contentKey="common.soknadErrorMessages.missingApiData.content"
        soknadFrontpageUrl={soknadFrontpageUrl}
    />
);

const ApplicationUnavailable = () => (
    <SoknadErrorMessage
        titleKey="common.soknadErrorMessages.applicationUnavailable.title"
        contentKey="common.soknadErrorMessages.applicationUnavailable.content"
    />
);

const UnknownRoute = () => (
    <SoknadErrorMessage
        titleKey="common.soknadErrorMessages.unknownRoute.title"
        contentKey="common.soknadErrorMessages.unknownRoute.content"
    />
);

const SoknadErrorMessages = {
    ApplicationUnavailable,
    GeneralApplicationError,
    UnknownRoute,
    GeneralSoknadError,
    MissingSoknadDataError,
    MissingApiDataError,
};
export default SoknadErrorMessages;
