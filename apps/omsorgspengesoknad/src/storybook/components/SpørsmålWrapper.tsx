import { Box, Button, Heading, Tabs, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { MessagesTable } from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import ShadowBox from '../components/ShadowBox';
import { getIntlMessagesFromKeys } from '../utils/intlUtils';
import { StoryFormikWrapper } from './StoryFormikWrapper';
import StoryIntlProvider from './StoryIntlProvider';
import '@navikt/ds-css';

export interface SpørsmålWrapperProps {
    formErrorHandlerIntlKey: string;
    spørsmål: React.ReactNode;
    messageIntlKeys?: string[];
    validationErrorIntlKeys?: string[];
}

export const SpørsmålWrapper: React.FunctionComponent<SpørsmålWrapperProps> = (props) => {
    const { spørsmål, messageIntlKeys = [], validationErrorIntlKeys = [], formErrorHandlerIntlKey } = props;
    const infoMessages = getIntlMessagesFromKeys(messageIntlKeys);
    const validationMessages = getIntlMessagesFromKeys(validationErrorIntlKeys);
    const allMessages = getIntlMessagesFromKeys([...messageIntlKeys, ...validationErrorIntlKeys]);

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
                    <ShadowBox>
                        <Tabs defaultValue="alle">
                            <VStack gap="4">
                                <Tabs.List>
                                    <Tabs.Tab value="alle" label="Alle" />
                                    <Tabs.Tab value="innhold" label="Kun innhold" />
                                    <Tabs.Tab value="validering" label="Kun validering" />
                                </Tabs.List>
                                <Tabs.Panel value="alle">
                                    <MessagesTable messages={allMessages} />
                                </Tabs.Panel>
                                <Tabs.Panel value="innhold">
                                    <MessagesTable messages={infoMessages} />
                                </Tabs.Panel>
                                <Tabs.Panel value="validering">
                                    <MessagesTable messages={validationMessages} />
                                </Tabs.Panel>
                            </VStack>
                        </Tabs>
                    </ShadowBox>
                </Box>
            </VStack>
        </StoryIntlProvider>
    );
};
