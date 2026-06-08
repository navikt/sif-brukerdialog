import '@navikt/ds-css';

import { Box, Button, Tabs, VStack } from '@navikt/ds-react';
import { MessagesTable } from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import * as React from 'react';

import ShadowBox from '../components/ShadowBox';
import { storybookIntlUtils } from '../utils/intlUtils';
import { StoryFormikWrapper } from './StoryFormikWrapper';

export interface SpørsmålWrapperProps {
    formErrorHandlerIntlKey: string;
    spørsmål: React.ReactNode;
    messageIntlKeys?: string[];
    validationErrorIntlKeys?: string[];
}

const { getIntlMessagesFromKeys } = storybookIntlUtils;

export const SpørsmålWrapper = (props: SpørsmålWrapperProps) => {
    const { spørsmål, messageIntlKeys = [], validationErrorIntlKeys = [], formErrorHandlerIntlKey } = props;
    const infoMessages = getIntlMessagesFromKeys(messageIntlKeys);
    const validationMessages = getIntlMessagesFromKeys(validationErrorIntlKeys);
    const allMessages = getIntlMessagesFromKeys([...messageIntlKeys, ...validationErrorIntlKeys]);

    return (
        <VStack gap="space-40">
            <StoryFormikWrapper parameters={{ formErrorHandlerIntlKey, maxWidth: 'none', includeButtons: false }}>
                <Box>
                    <ShadowBox>
                        <VStack gap="space-16">
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
                <Tabs defaultValue="alle">
                    <VStack gap="space-16">
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
            </Box>
        </VStack>
    );
};
