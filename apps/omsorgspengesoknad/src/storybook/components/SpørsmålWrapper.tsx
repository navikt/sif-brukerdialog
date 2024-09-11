import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import * as React from 'react';
import ShadowBox from '../components/ShadowBox';
import { StoryFormikWrapper } from './StoryFormikWrapper';
import StoryIntlProvider from './StoryIntlProvider';
import '@navikt/ds-css';

interface Props {
    formErrorHandlerIntlKey: string;
    spørsmål: React.ReactNode;
    messages?: React.ReactNode;
}

export const SpørsmålWrapper: React.FunctionComponent<Props> = (props) => {
    const { spørsmål, messages, formErrorHandlerIntlKey } = props;

    return (
        <StoryIntlProvider locale="nb">
            <VStack gap="10">
                <StoryFormikWrapper parameters={{ formErrorHandlerIntlKey, maxWidth: 'none', includeButtons: false }}>
                    <Box>
                        <Heading size="medium" level="2" spacing={true}>
                            Spørsmål
                        </Heading>
                        <ShadowBox>
                            <VStack gap="4">
                                {spørsmål}
                                <Box>
                                    <Button type="submit" variant="primary">
                                        Valider felt
                                    </Button>
                                </Box>
                            </VStack>
                        </ShadowBox>
                    </Box>
                </StoryFormikWrapper>

                <Box>
                    <Heading size="medium" level="2" spacing={true}>
                        Tekster
                    </Heading>
                    <ShadowBox>{messages}</ShadowBox>
                </Box>
            </VStack>
        </StoryIntlProvider>
    );
};
