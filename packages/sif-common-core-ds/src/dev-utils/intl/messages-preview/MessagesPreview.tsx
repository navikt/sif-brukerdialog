import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import bemUtils from '../../../utils/bemUtils';
import { createMultiLocaleObject, getMissingMessageKeys, MessageFileFormat } from '../devIntlUtils';
import MessagesPreviewExplanation from './MessagePreviewExplanation';
import MessagesList from './MessagesList';
import './messagesPreview.scss';

export interface MessagesPreviewProps {
    title?: string;
    showMissingTextSummary?: boolean;
    showExplanation?: boolean;
    messages: MessageFileFormat;
}

const bem = bemUtils('messagesPreview');

const validateMessageKeys = (nb: Record<string, string>, nn: Record<string, string>) => {
    const nbKeys = Object.keys(nb);
    const nnKeys = Object.keys(nn);

    const missingInNn = nbKeys.filter((key) => !nnKeys.includes(key));
    const missingInNb = nnKeys.filter((key) => !nbKeys.includes(key));

    const placeholdersMismatch = nbKeys.filter((key) => {
        const nbPlaceholders = (nb[key].match(/{\w+}/g) || []).sort();
        const nnPlaceholders = (nn[key]?.match(/{\w+}/g) || []).sort();
        return JSON.stringify(nbPlaceholders) !== JSON.stringify(nnPlaceholders);
    });

    return {
        missingInNn,
        missingInNb,
        placeholdersMismatch,
    };
};

const MessagesPreview = ({
    messages,
    title,
    showMissingTextSummary = true,
    showExplanation = true,
}: MessagesPreviewProps) => {
    const allMessages = createMultiLocaleObject(messages);
    const missingMessages = getMissingMessageKeys(allMessages);
    const { placeholdersMismatch } = validateMessageKeys(messages['nb'], messages['nn']);
    return (
        <div className={bem.block}>
            {title && (
                <Heading level="3" size="medium" spacing={true}>
                    {title}
                </Heading>
            )}

            {placeholdersMismatch.length > 0 && (
                <VStack gap="4" marginBlock="8">
                    <Heading size="small" level="3">
                        Tekstnøkler med ulikhet i placeholdere
                    </Heading>

                    <Alert variant="error">
                        <pre className={bem.element('missingList')}>
                            {placeholdersMismatch.map((key) => (
                                <div key={key}>{key}</div>
                            ))}
                        </pre>
                    </Alert>
                </VStack>
            )}
            {missingMessages && showMissingTextSummary && (
                <VStack gap="4" marginBlock="8">
                    <Heading size="small" level="3">
                        Tekstnøkler som ikke er oversatt
                    </Heading>

                    <Alert variant="error">
                        <pre className={bem.element('missingList')}>
                            {Object.keys(missingMessages).map((key) => (
                                <div key={key}>
                                    {missingMessages[key]}: {key}
                                </div>
                            ))}
                        </pre>
                    </Alert>
                </VStack>
            )}
            {showExplanation && (
                <Box paddingBlock="0 6">
                    <MessagesPreviewExplanation />
                </Box>
            )}
            <MessagesList messages={messages} />
        </div>
    );
};

export default MessagesPreview;
