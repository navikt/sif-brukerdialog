import { Heading, VStack } from '@navikt/ds-react';
import { Arbeidsgivere } from '@navikt/sif-common';
import ShadowBox from './ShadowBox';

interface Props {
    arbeidsgivere: Arbeidsgivere;
}

const Organisasjon = ({ organisasjon }: { organisasjon: Arbeidsgivere['organisasjoner'][0] }) => {
    return (
        <ShadowBox>
            <VStack gap="2">
                <Heading level="2" size="medium">
                    {organisasjon.navn}
                </Heading>
            </VStack>
        </ShadowBox>
    );
};

const ArbeidsgiverInfo = ({ arbeidsgivere: { organisasjoner } }: Props) => {
    return (
        <VStack gap="8">
            {organisasjoner.length > 0 ? (
                organisasjoner.map((o) => <Organisasjon key={o.organisasjonsnummer} organisasjon={o} />)
            ) : (
                <ShadowBox>Ingen arbeidsgiver registrert</ShadowBox>
            )}
        </VStack>
    );
};

export default ArbeidsgiverInfo;
