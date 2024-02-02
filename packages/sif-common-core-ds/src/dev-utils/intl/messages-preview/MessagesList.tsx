import { Alert, Button, Tabs } from '@navikt/ds-react';
import { createMultiLocaleObject, MessageFileFormat } from '../devIntlUtils';
import { useTranslation } from './useTranslation';
import './messagesList.scss';
import Block from '../../../atoms/block/Block';
import { useState } from 'react';

interface Props {
    messages: MessageFileFormat;
}

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
                    <Tabs.Tab value="translate" label="Oversettelse" />
                </Tabs.List>
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
                                                {allMessages[key]['nn']}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
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
