import { Button, Link as DSLink } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import { soknadErrorMessages } from './soknadError.messages';

interface ErrorWithFrontpageUrlProps {
    soknadFrontpageUrl?: string;
}

export interface LastAvailableStepInfo {
    route: string;
    title: string;
}

type SoknadErrorMessageKeys = keyof typeof soknadErrorMessages.nb;

const SoknadErrorMessage = ({
    titleKey,
    contentKey,
    soknadFrontpageUrl,
    children,
}: {
    titleKey: SoknadErrorMessageKeys;
    contentKey: SoknadErrorMessageKeys;
    soknadFrontpageUrl?: string;
    children?: React.ReactNode;
}) => {
    const { text } = useSoknadIntl();
    return (
        <SifGuidePanel mood="uncertain" title={text(titleKey)}>
            <p>{text(contentKey)}</p>
            {soknadFrontpageUrl && (
                <DSLink href={soknadFrontpageUrl}>{text('@soknad.soknadErrorMessages.gotoSoknadFrontpage')}</DSLink>
            )}
            {children}
        </SifGuidePanel>
    );
};

const GeneralApplicationError = () => (
    <SoknadErrorMessage
        titleKey="@scs.soknadErrorMessages.defaultTitle"
        contentKey="@scs.soknadErrorMessages.generalError.content"
    />
);

const GeneralSoknadError = ({ soknadFrontpageUrl }: ErrorWithFrontpageUrlProps) => (
    <SoknadErrorMessage
        titleKey="@scs.soknadErrorMessages.defaultTitle"
        contentKey="@scs.soknadErrorMessages.generalSoknadError.content"
        soknadFrontpageUrl={soknadFrontpageUrl}
    />
);

const MissingSoknadDataError = ({
    soknadFrontpageUrl,
    lastAvailableStep,
}: ErrorWithFrontpageUrlProps & {
    lastAvailableStep?: { route: string; title: string };
}) => {
    const { text } = useSoknadIntl();
    return lastAvailableStep === undefined ? (
        <SoknadErrorMessage
            titleKey="@scs.soknadErrorMessages.missingSoknadData.title"
            contentKey="@scs.soknadErrorMessages.missingSoknadData.content"
            soknadFrontpageUrl={soknadFrontpageUrl}
        />
    ) : (
        <SoknadErrorMessage
            titleKey="@scs.soknadErrorMessages.unavailableSoknadStep.title"
            contentKey="@scs.soknadErrorMessages.unavailableSoknadStep.content">
            <Link to={lastAvailableStep.route}>
                {text('@soknad.soknadErrorMessages.unavailableSoknadStep.linkText', { steg: lastAvailableStep.title })}
            </Link>
        </SoknadErrorMessage>
    );
};

const MissingApiDataError = ({ soknadFrontpageUrl }: ErrorWithFrontpageUrlProps) => (
    <SoknadErrorMessage
        titleKey="@scs.soknadErrorMessages.missingApiData.title"
        contentKey="@scs.soknadErrorMessages.missingApiData.content"
        soknadFrontpageUrl={soknadFrontpageUrl}
    />
);

const ApplicationUnavailable = () => (
    <SoknadErrorMessage
        titleKey="@scs.soknadErrorMessages.applicationUnavailable.title"
        contentKey="@scs.soknadErrorMessages.applicationUnavailable.content"
    />
);

const UnknownRoute = ({ onReset }: { onReset?: () => void }) => {
    const { text } = useSoknadIntl();
    return (
        <SoknadErrorMessage
            titleKey="@scs.soknadErrorMessages.unknownRoute.title"
            contentKey="@scs.soknadErrorMessages.unknownRoute.content">
            <p>{text('@soknad.soknadErrorMessages.unknownRoute.reset')}</p>
            {onReset && (
                <Button type="button" onClick={onReset} variant="secondary" size="small">
                    {text('@soknad.soknadErrorMessages.unknownRoute.reset.buttonLabel')}
                </Button>
            )}
        </SoknadErrorMessage>
    );
};

const SoknadErrorMessages = {
    ApplicationUnavailable,
    GeneralApplicationError,
    UnknownRoute,
    GeneralSoknadError,
    MissingSoknadDataError,
    MissingApiDataError,
};
export default SoknadErrorMessages;
