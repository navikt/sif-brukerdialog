import { Alert, BodyShort, Button, Tabs } from '@navikt/ds-react';
import { useState } from 'react';
import Block from '../../../atoms/block/Block';
import { createMultiLocaleObject, MessageFileFormat } from '../devIntlUtils';
import { useTranslation } from './useTranslation';
import './messagesList.scss';

interface Props {
    messages: MessageFileFormat;
}

export const PlainMessageList = ({ messages, nbOnly = true }: Props & { nbOnly?: boolean }) => {
    const allMessages = createMultiLocaleObject(messages);
    return (
        <table>
            {Object.keys(allMessages).map((key) => (
                <>
                    <tr>
                        <th colSpan={2} style={{ textAlign: 'left' }}>
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
                        <td style={{ width: '50%', border: '1px solid #e7e7e7', padding: '.4rem' }}>
                            <BodyShort size="small">{allMessages[key]['nb']}</BodyShort>
                        </td>
                        <td style={{ width: '50%', border: '1px solid #e7e7e7' }}>
                            {nbOnly ? <>&nbsp;</> : <BodyShort size="small">{allMessages[key]['nn']}</BodyShort>}
                        </td>
                    </tr>
                </>
            ))}
        </table>
    );
};

export const MessagesTable = ({ messages, nbOnly = true }: { messages: MessageFileFormat; nbOnly?: boolean }) => {
    const allMessages = createMultiLocaleObject(messages);
    return (
        <table className="messageList">
            <thead>
                <tr>
                    <th>Kode</th>
                    <th>Bokmål</th>
                    <th>Nynorsk (evt. bokmål som fallback)</th>
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
                                {nbOnly ? <>&nbsp;</> : allMessages[key]['nn']}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
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
                    <Tabs.Tab value="kompakt" label="For oversettelse" />
                    <Tabs.Tab value="json" label="JSON" />
                    <Tabs.Tab value="translate" label="Automatisk oversettelse" />
                </Tabs.List>
                <Tabs.Panel value="messages">
                    <Block margin="xl">
                        <MessagesTable messages={messages} nbOnly={false} />
                    </Block>
                </Tabs.Panel>
                <Tabs.Panel value="kompakt">
                    <Block margin="xl">
                        <PlainMessageList messages={messages} nbOnly={true} />
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
                                <Button
                                    type="button"
                                    onClick={(evt) => {
                                        oversettAlle();
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                    }}>
                                    Foreslå oversetting til nynorsk
                                </Button>
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
