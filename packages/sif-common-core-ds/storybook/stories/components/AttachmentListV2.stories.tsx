import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import AttachmentListV2 from '../../../src/components/attachment-list-v2/AttachmentListV2';
import { Attachment, PersistedFile } from '../../../src/types/Attachment';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/AttachmentListV2',
    component: AttachmentListV2,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as Meta<typeof AttachmentListV2>;

const file1: PersistedFile = {
    isPersistedFile: true,
    name: 'Name of file',
    type: 'jpg',
    size: 12301,
    lastModified: 123,
};
const file2: PersistedFile = {
    isPersistedFile: true,
    name: '67649823370__219882E6-AE3B-4BB9-A8B6-4FDEA46149F9.jpeg',
    type: 'jpg',
    size: 0,
    lastModified: 123,
};

const Template: StoryFn<typeof AttachmentListV2> = () => {
    const [vedlegg, setVedlegg] = useState<Attachment[]>([
        { file: file1, pending: false, uploaded: true, url: 'url1' },
        { file: file2, pending: true, uploaded: false, url: 'url2' },
        { file: file2, pending: false, uploaded: true, url: 'url2' },
    ]);

    const onDelete = (attachment: Attachment) => {
        setVedlegg(vedlegg.filter((i) => i.url !== attachment.url));
    };

    return <AttachmentListV2 attachments={vedlegg} showFileSize={true} onDelete={onDelete} />;
};

export const Default = Template.bind({});
