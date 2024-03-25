import { createMultiLocaleObject, MessageFileFormat } from '../devIntlUtils';
import './messagesList.scss';

interface Props {
    messages: MessageFileFormat;
}

const MessagesList = ({ messages }: Props) => {
    const allMessages = createMultiLocaleObject(messages);
    return (
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
    );
};

export default MessagesList;
