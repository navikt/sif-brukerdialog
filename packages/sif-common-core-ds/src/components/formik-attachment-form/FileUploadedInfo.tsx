import { Attachment } from '../../types';

interface Props {
    attachments: Attachment[];
}

const FileUploadedInfo = ({ attachments }: Props) => (
    <>
        {`${attachments.length} ${attachments.length === 1 ? 'fil' : 'filer'} ble lastet opp (${attachments.map((a) => a.file.name).join(',')}).`}
    </>
);

export default FileUploadedInfo;
