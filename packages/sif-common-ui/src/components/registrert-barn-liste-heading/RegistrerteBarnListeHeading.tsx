import { Heading, HeadingProps, HStack } from '@navikt/ds-react';

import RegistrerteBarnKildeInfo from '../registrerte-barn-kilde/RegistrerteBarnKildeInfo';

export interface RegistrerteBarnListeHeadingProps extends HeadingProps {
    children: string;
}

const RegistrerteBarnListeHeading = ({ children, ...rest }: RegistrerteBarnListeHeadingProps) => {
    return (
        <HStack gap="space-8">
            <Heading {...rest} aria-label={children}>
                {children}
            </Heading>
            <RegistrerteBarnKildeInfo />
        </HStack>
    );
};

export default RegistrerteBarnListeHeading;
