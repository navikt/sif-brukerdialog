import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import AttachmentListWithDeletion from '../../../src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import { Attachment, PersistedFile } from '../../../src/types/Attachment';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/AttachmentListWithDeletion',
    component: AttachmentListWithDeletion,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as Meta<typeof AttachmentListWithDeletion>;

const file1: PersistedFile = {
    isPersistedFile: true,
    name: 'Name of file',
    type: 'jpg',
    size: 0,
    lastModified: 123,
};
const file2: PersistedFile = {
    isPersistedFile: true,
    name: '67649823370__219882E6-AE3B-4BB9-A8B6-4FDEA46149F9.jpeg',
    type: 'jpg',
    size: 0,
    lastModified: 123,
};

const Template: StoryFn<typeof AttachmentListWithDeletion> = () => {
    const [attachments, setAttachments] = useState<Attachment[]>([
        { file: file1, pending: false, uploaded: true, url: 'url1' },
        { file: file2, pending: false, uploaded: true, url: 'url2' },
    ]);

    const onDelete = (attachment: Attachment) => {
        setAttachments(attachments.filter((i) => i.url !== attachment.url));
    };

    return (
        <>
            <AttachmentListWithDeletion attachments={attachments} onRemoveAttachmentClick={onDelete} />
        </>
    );
};

export const Default = Template.bind({});
