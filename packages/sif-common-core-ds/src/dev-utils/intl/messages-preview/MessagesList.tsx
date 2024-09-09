import { Alert, BodyShort, Box, Button, HGrid, Tabs, Tag, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Block from '../../../atoms/block/Block';
import { createMultiLocaleObject, MessageFileFormat } from '../devIntlUtils';
import { useTranslation } from './useTranslation';
import './messagesList.scss';

interface Props {
    messages: MessageFileFormat;
}

const Translation = ({ locale, text }: { locale: string; text: string }) => {
    return (
        <HGrid gap="4" columns={'2rem auto'} align="center">
            <Box>
                <Tag variant="info" size="small">
                    {locale}
                </Tag>
            </Box>
            <Box borderRadius="medium" borderColor="border-info" borderWidth="1" padding="2">
                {text}
            </Box>
        </HGrid>
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
            <Tabs defaultValue="messages">
                <Tabs.List>
                    <Tabs.Tab value="messages" label="Tekster" />
                    <Tabs.Tab value="forOversetter3" label="For oversetter" />
                    <Tabs.Tab value="json" label="JSON" />
                    <Tabs.Tab value="translate" label="Oversettelse" />
                </Tabs.List>
                <Tabs.Panel value="forOversetter">
                    <Block margin="xl">
                        {/* <ul style={{ listStyle: 'none' }}> */}
                        {Object.keys(allMessages).map((key) => (
                            <p key={key}>
                                <Box marginBlock={'0 2'}>
                                    <code style={{ fontSize: '.75rem', color: 'GrayText' }}>[{key}]:</code>
                                    <br />
                                    {allMessages[key]['nb']}
                                </Box>
                            </p>
                        ))}
                        {/* </ul> */}
                    </Block>
                </Tabs.Panel>
                <Tabs.Panel value="forOversetter2">
                    <Block margin="xl">
                        {Object.keys(allMessages).map((key) => (
                            <Box key={key} marginBlock={'0 10'}>
                                <Box marginBlock={'0 2'} background="bg-subtle" padding={'2'}>
                                    <code style={{ fontSize: '.8rem', fontWeight: 'bold' }}>{key}</code>
                                </Box>
                                <VStack gap="2" padding={'2'}>
                                    <Translation locale="nb" text={allMessages[key]['nb']} />
                                    <Translation locale="nn" text={allMessages[key]['nn']} />
                                </VStack>
                            </Box>
                        ))}
                    </Block>
                </Tabs.Panel>
                <Tabs.Panel value="forOversetter3">
                    <Block margin="xl">
                        <table style={{ border: '1px solid #dfdfdf' }}>
                            {Object.keys(allMessages).map((key) => (
                                <>
                                    <tr>
                                        <th colSpan={2} style={{ textAlign: 'left' }}>
                                            <code
                                                style={{
                                                    fontSize: '.8rem',
                                                    fontWeight: 'bold',
                                                    paddingTop: '.4rem',
                                                    display: 'block',
                                                }}>
                                                {key}
                                            </code>
                                        </th>
                                    </tr>
                                    <tr style={{ border: '1px solid #dfdfdf' }}>
                                        <td style={{ border: '1px solid #dfdfdf' }}>
                                            <BodyShort size="small">{allMessages[key]['nb']}</BodyShort>
                                        </td>
                                        <td style={{ border: '1px solid #dfdfdf' }}>
                                            <BodyShort size="small">{allMessages[key]['nb']}</BodyShort>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </table>
                    </Block>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <Block margin="xl">
                        <table className="messageList">
                            <thead>
                                <tr>
                                    <th>Kode</th>
                                    <th>Bokmål</th>
                                    <th>Nynorsk</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(allMessages).map((key) => {
                                    return (
                                        <tr key={key}>
                                            <th>
                                                <code>{key}</code>
                                            </th>
                                            <td key="nb" className={allMessages[key]['nb'] ? '' : 'missingText'}>
                                                {allMessages[key]['nb']}
                                            </td>
                                            <td key="nn" className={allMessages[key]['nn'] ? '' : 'missingText'}>
                                                {/* {allMessages[key]['nn']} */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Block>
                </Tabs.Panel>
                <Tabs.Panel value="json" className="h-24 w-full bg-gray-50 p-4">
                    <Block margin="xl">
                        <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(messages, null, 2)}</pre>
                    </Block>
                </Tabs.Panel>
                <Tabs.Panel value="translate" className="h-24 w-full bg-gray-50 p-4">
                    {numMessages > 50 ? (
                        <Block margin="xl">
                            <Alert variant="info">Det er for mange tekster til at en kan foreslå oversettelse</Alert>
                        </Block>
                    ) : (
                        <>
                            <Block margin="xl">
                                <Button onClick={oversettAlle}>Foreslå oversetting til nynorsk</Button>
                            </Block>
                            {translation !== undefined ? (
                                <Block margin="xl">
                                    <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(translation, null, 2)}</pre>
                                </Block>
                            ) : null}
                        </>
                    )}
                </Tabs.Panel>
            </Tabs>
        </>
    );
};

export default MessagesList;
