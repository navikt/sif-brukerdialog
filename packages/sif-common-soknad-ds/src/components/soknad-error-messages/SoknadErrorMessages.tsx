import { Button, Link as DSLink } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

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
        <SifGuidePanel mood="uncertain" title={intlHelper(intl, titleKey)}>
            <p>
                <FormattedMessage id={contentKey} />
            </p>
            {soknadFrontpageUrl && (
                <DSLink href={soknadFrontpageUrl}>
                    <FormattedMessage id="scs.soknadErrorMessages.gotoSoknadFrontpage" />
                </DSLink>
            )}
            {children}
        </SifGuidePanel>
    );
};

const GeneralApplicationError = () => (
    <SoknadErrorMessage
        titleKey="scs.soknadErrorMessages.defaultTitle"
        contentKey="scs.soknadErrorMessages.generalError.content"
    />
);

const GeneralSoknadError = ({ soknadFrontpageUrl }: ErrorWithFrontpageUrlProps) => (
    <SoknadErrorMessage
        titleKey="scs.soknadErrorMessages.defaultTitle"
        contentKey="scs.soknadErrorMessages.generalSoknadError.content"
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
            titleKey="scs.soknadErrorMessages.missingSoknadData.title"
            contentKey="scs.soknadErrorMessages.missingSoknadData.content"
            soknadFrontpageUrl={soknadFrontpageUrl}
        />
    ) : (
        <SoknadErrorMessage
            titleKey="scs.soknadErrorMessages.unavailableSoknadStep.title"
            contentKey="scs.soknadErrorMessages.unavailableSoknadStep.content">
            <Link to={lastAvailableStep.route}>
                <FormattedMessage
                    id="scs.soknadErrorMessages.unavailableSoknadStep.linkText"
                    values={{ steg: lastAvailableStep.title }}
                />
            </Link>
        </SoknadErrorMessage>
    );

const MissingApiDataError = ({ soknadFrontpageUrl }: ErrorWithFrontpageUrlProps) => (
    <SoknadErrorMessage
        titleKey="scs.soknadErrorMessages.missingApiData.title"
        contentKey="scs.soknadErrorMessages.missingApiData.content"
        soknadFrontpageUrl={soknadFrontpageUrl}
    />
);

const ApplicationUnavailable = () => (
    <SoknadErrorMessage
        titleKey="scs.soknadErrorMessages.applicationUnavailable.title"
        contentKey="scs.soknadErrorMessages.applicationUnavailable.content"
    />
);

const UnknownRoute = ({ onReset }: { onReset?: () => void }) => (
    <SoknadErrorMessage
        titleKey="scs.soknadErrorMessages.unknownRoute.title"
        contentKey="scs.soknadErrorMessages.unknownRoute.content">
        <p>
            <FormattedMessage id="scs.soknadErrorMessages.unknownRoute.reset" />
        </p>
        {onReset && (
            <Button type="button" onClick={onReset} variant="secondary" size="small">
                <FormattedMessage id="scs.soknadErrorMessages.unknownRoute.reset.buttonLabel" />
            </Button>
        )}
    </SoknadErrorMessage>
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
