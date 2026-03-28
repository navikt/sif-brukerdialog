import { Heading, HeadingProps, HelpText, HStack } from '@navikt/ds-react';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../../i18n';

export interface RegistrerteBarnListeHeadingProps extends HeadingProps {
    children: string;
}

const RegistrerteBarnListeHeading = ({ children, ...rest }: RegistrerteBarnListeHeadingProps) => {
    const { text } = useSifSoknadUiIntl();
    return (
        <HStack gap="space-8">
            <Heading {...rest} aria-label={children}>
                {children}
            </Heading>
            <HelpText title={text('registrerteBarnKildeInfo.helpTextTooltip')}>
                <SifSoknadUiText id="registrerteBarnKildeInfo.kilde" />
            </HelpText>
        </HStack>
    );
};

export default RegistrerteBarnListeHeading;
