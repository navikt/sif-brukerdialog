import { Alert, Heading } from '@navikt/ds-react';
import Block from '../../../atoms/block/Block';
import bemUtils from '../../../utils/bemUtils';
import { createMultiLocaleObject, getMissingMessageKeys, MessageFileFormat } from '../devIntlUtils';
import MessagesPreviewExplanation from './MessagePreviewExplanation';
import MessagesList from './MessagesList';
import './messagesPreview.scss';

interface Props {
    title?: string;
    showMissingTextSummary?: boolean;
    showExplanation?: boolean;
    messages: MessageFileFormat;
}

const bem = bemUtils('messagesPreview');

const MessagesPreview = ({ messages, title, showMissingTextSummary = true, showExplanation = true }: Props) => {
    const allMessages = createMultiLocaleObject(messages);
    const missingMessages = getMissingMessageKeys(allMessages);
    return (
        <div className={bem.block}>
            {title && (
                <Heading level="3" size="medium" spacing={true}>
                    {title}
                </Heading>
            )}
            {missingMessages && showMissingTextSummary && (
                <Block margin="xl">
                    <Heading size="small" level="3">
                        Tekstnøkler som ikke er oversatt
                    </Heading>
                    <Block margin="m">
                        <Alert variant="error">
                            <pre className={bem.element('missingList')}>
                                {Object.keys(missingMessages).map((key) => (
                                    <div key={key}>
                                        {missingMessages[key]}: {key}
                                    </div>
                                ))}
                            </pre>
                        </Alert>
                    </Block>
                </Block>
            )}
            {showExplanation && (
                <Block padBottom="l">
                    <MessagesPreviewExplanation />
                </Block>
            )}
            <MessagesList messages={messages} />
        </div>
    );
};

export default MessagesPreview;
