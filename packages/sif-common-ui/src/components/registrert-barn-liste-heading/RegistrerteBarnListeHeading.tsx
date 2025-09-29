import { Heading, HeadingProps, HStack } from '@navikt/ds-react';

import RegistrerteBarnKildeInfo from '../registrerte-barn-kilde/RegistrerteBarnKildeInfo';

export interface RegistrerteBarnListeHeadingProps extends HeadingProps {
    children: string;
}

const RegistrerteBarnListeHeading = ({ children: tittel, ...rest }: RegistrerteBarnListeHeadingProps) => {
    return (
        <HStack gap="2">
            <Heading {...rest} aria-label={tittel}>
                {tittel}
            </Heading>
            <RegistrerteBarnKildeInfo />
        </HStack>
    );
};

export default RegistrerteBarnListeHeading;
