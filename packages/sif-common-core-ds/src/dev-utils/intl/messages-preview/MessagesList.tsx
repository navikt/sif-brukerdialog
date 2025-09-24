import './messagesList.scss';

import { Alert, BodyShort, Box, Button, HStack, Pagination, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { createMultiLocaleObject, MessageFileFormat } from '../devIntlUtils';
import { useTranslation } from './useTranslation';

interface Props {
    messages: MessageFileFormat;
}

export const PlainMessageList = ({ messages, locale }: Props & { locale: 'nb' | 'nn' }) => {
    const allMessages = createMultiLocaleObject(messages);
    return (
        <table>
            {Object.keys(allMessages).map((key) => (
                <>
                    <tr>
                        <th style={{ textAlign: 'left' }}>
                            <code
                                style={{
                                    marginTop: '1rem',
                                    background: '#e7e7e7',
                                    padding: '.4rem',
                                    fontSize: '.8rem',
                                    fontWeight: 'normal',
                                    fontStyle: 'italic',
                                    display: 'block',
                                }}>
                                {key}
                            </code>
                        </th>
                    </tr>
                    <tr style={{ border: '1px solid #e7e7e7' }}>
                        <td style={{ border: '1px solid #e7e7e7', padding: '.4rem' }}>
                            <BodyShort>{allMessages[key][locale]}</BodyShort>
                        </td>
                    </tr>
                </>
            ))}
        </table>
    );
};

export const MessagesTable = ({
    messages,
    nbOnly = false,
    keyStrip = '',
}: {
    messages: MessageFileFormat;
    nbOnly?: boolean;
    keyStrip?: string;
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const allMessages = createMultiLocaleObject(messages);

    const messagesPerPage = 400;
    const totalMessages = Object.keys(allMessages).length;
    const totalPages = Math.ceil(totalMessages / messagesPerPage);

    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const currentMessageKeys = Object.keys(allMessages).slice(startIndex, endIndex);

    return (
        <VStack gap="4">
            {messagesPerPage < totalMessages && (
                <HStack gap="1" align="center">
                    <BodyShort size="large" weight="semibold">
                        Sider:
                    </BodyShort>
                    <Pagination
                        page={currentPage}
                        onPageChange={setCurrentPage}
                        count={totalPages}
                        boundaryCount={1}
                        siblingCount={1}
                        size="small"
                    />
                </HStack>
            )}

            <table className="messageList">
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Bokmål</th>
                        <th>Nynorsk (evt. bokmål som fallback)</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMessageKeys.map((key) => {
                        return (
                            <tr key={key}>
                                <th>
                                    <code>{keyStrip ? key.replace(keyStrip, '') : key}</code>
                                </th>
                                <td key="nb" className={allMessages[key]['nb'] ? '' : 'missingText'}>
                                    {allMessages[key]['nb']}
                                </td>
                                <td key="nn" className={allMessages[key]['nn'] ? '' : 'missingText'}>
                                    {nbOnly ? <>&nbsp;</> : allMessages[key]['nn']}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </VStack>
    );
};

const MessagesList = ({ messages }: Props) => {
    const allMessages = createMultiLocaleObject(messages);
    const [translation, setTranslation] = useState<Record<string, string> | undefined>();

    const numMessages = Object.keys(allMessages).length;

    const { translate } = useTranslation();

    const oversettAlle = async () => {
        const keys = Object.keys(allMessages);
        const text = keys.map((key) => allMessages[key]['nb']).join(' || ');
        const result = await translate(text).then((res) => res.split(' || '));

        const translations: Record<string, string> = {};
        keys.forEach((key, index) => {
            translations[key] = result[index];
        });
        setTranslation(translations);
    };
    return (
        <>
            <Tabs defaultValue="messages" size="small">
                <Tabs.List>
                    <Tabs.Tab value="messages" label="Alle tekster" />
                    <Tabs.Tab value="kompaktNB" label="Kun bokmål" />
                    <Tabs.Tab value="kompaktNN" label="Kun nynorsk" />
                    <Tabs.Tab value="json" label="JSON" />
                    {/* <Tabs.Tab value="translate" label="Automatisk oversettelse" /> */}
                </Tabs.List>
                <Tabs.Panel value="messages">
                    <Box marginBlock="8">
                        <MessagesTable messages={messages} nbOnly={false} />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="kompaktNB">
                    <Box marginBlock="8">
                        <PlainMessageList messages={messages} locale="nb" />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="kompaktNN">
                    <Box marginBlock="8">
                        <PlainMessageList messages={messages} locale="nn" />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="json" className="h-24 w-full bg-gray-50 p-4">
                    <Box marginBlock="8">
                        <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(messages, null, 2)}</pre>
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="translate" className="h-24 w-full bg-gray-50 p-4">
                    {numMessages > 120 ? (
                        <Box marginBlock="8">
                            <Alert variant="info">Det er for mange tekster til at en kan foreslå oversettelse</Alert>
                        </Box>
                    ) : (
                        <>
                            <Box marginBlock="8">
                                <Button
                                    variant="secondary"
                                    size="small"
                                    type="button"
                                    onClick={(evt) => {
                                        oversettAlle();
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                    }}>
                                    Foreslå oversetting til nynorsk
                                </Button>
                            </Box>
                            {translation !== undefined ? (
                                <Box marginBlock="8">
                                    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(translation, null, 2)}</pre>
                                </Box>
                            ) : null}
                        </>
                    )}
                </Tabs.Panel>
            </Tabs>
        </>
    );
};

export default MessagesList;
