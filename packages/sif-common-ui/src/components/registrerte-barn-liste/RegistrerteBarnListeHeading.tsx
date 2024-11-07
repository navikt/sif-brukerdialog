import { Heading, HeadingProps, HStack } from '@navikt/ds-react';
import RegistrerteBarnHelpText from './RegistrerteBarnHelpText';

export interface RegistrerteBarnListeHeadingProps extends HeadingProps {
    children: string;
}

const RegistrerteBarnListeHeading = ({ children: tittel, ...rest }: RegistrerteBarnListeHeadingProps) => {
    return (
        <HStack gap="2">
            <Heading {...rest} aria-label={tittel}>
                {tittel}
            </Heading>
            <RegistrerteBarnHelpText />
        </HStack>
    );
};

export default RegistrerteBarnListeHeading;
