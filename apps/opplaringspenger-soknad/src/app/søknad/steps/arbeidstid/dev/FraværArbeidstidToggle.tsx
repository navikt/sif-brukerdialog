import { Alert, Bleed, BodyLong, Box, Heading, Switch, Tag, VStack } from '@navikt/ds-react';

import actionsCreator from '../../../context/action/actionCreator';
import { useSøknadContext } from '../../../context/hooks/useSøknadContext';

const FraværArbeidstidToggle = () => {
    const {
        dispatch,
        state: { spørOmFraværFraJobb },
    } = useSøknadContext();
    return (
        <Bleed marginInline="space-32">
            <Box
                background="warning-soft"
                borderColor="warning-subtle"
                borderWidth="0"
                padding="space-32"
                marginBlock="space-16 space-48"
                borderRadius="16">
                <VStack gap="space-8">
                    <Bleed marginBlock="space-40 space-0" marginInline="space-40 space-0">
                        <Box marginBlock="space-0 space-16">
                            <Tag variant="strong" data-color="warning">
                                Denne meldingen vises kun i test og lokalt
                            </Tag>
                        </Box>
                    </Bleed>
                    <Heading level="2" size="medium">
                        Feature: Arbeidstid eller fraværstid
                    </Heading>
                    <BodyLong>
                        Toggle av og på om en skal spørre bruker om arbeidstid eller fravær fra jobb på grunn av kurs og
                        reise. Dette har vi her i test mens vi jobber med å snu spørsmålet om arbeidstid/fravær i
                        søknaden. Da kan vi teste begge deler mot backend.
                    </BodyLong>
                    <Switch
                        value="spørOmFraværFraJobb"
                        checked={spørOmFraværFraJobb}
                        onChange={(e) =>
                            dispatch(actionsCreator.toggleFraværArbeidstid({ spørOmFravær: e.target.checked }))
                        }>
                        Spør om fravær fra jobb i stedet for arbeidstimer
                    </Switch>
                    <Box marginBlock="space-16 space-8">
                        <Alert variant="warning">Obs! Søknad med fravær vil enn så lenge feile ved innsending</Alert>
                    </Box>
                </VStack>
            </Box>
        </Bleed>
    );
};

export default FraværArbeidstidToggle;
