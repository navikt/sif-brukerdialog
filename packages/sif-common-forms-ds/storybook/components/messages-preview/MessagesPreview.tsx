import { Alert } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { Undertittel } from 'nav-frontend-typografi';
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

const MessagesPreview = ({
    messages,
    title = 'Tekster',
    showMissingTextSummary = true,
    showExplanation = true,
}: Props) => {
    const allMessages = createMultiLocaleObject(messages);
    const missingMessages = getMissingMessageKeys(allMessages);
    return (
        <div className={bem.block}>
            {missingMessages && showMissingTextSummary && (
                <>
                    <Undertittel>Tekstnøkler som ikke er oversatt</Undertittel>
                    <Block margin="m">
                        <Alert variant="warning">
                            <pre className={bem.element('missingList')}>
                                {Object.keys(missingMessages).map((key) => (
                                    <div key={key}>
                                        {missingMessages[key]}: {key}
                                    </div>
                                ))}
                            </pre>
                        </Alert>
                    </Block>
                </>
            )}
            <Block margin="xl" padBottom="l">
                <Undertittel>{title}</Undertittel>
            </Block>
            {showExplanation && (
                <Block>
                    <MessagesPreviewExplanation />
                </Block>
            )}
            <MessagesList messages={messages} />
        </div>
    );
};

export default MessagesPreview;
