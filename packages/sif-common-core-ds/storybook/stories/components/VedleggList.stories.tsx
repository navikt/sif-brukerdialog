import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import VedleggList from '../../../src/components/vedlegg-list/VedleggList';
import { Vedlegg } from '../../../src/types/Vedlegg';
import StoryWrapper from '../../decorators/StoryWrapper';

const meta: Meta<typeof VedleggList> = {
    component: VedleggList,
    title: 'Component/VedleggList',
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof VedleggList>;

export const Default: Story = {
    render: () => {
        return <VedleggList vedlegg={exampleFiles} />;
    },
};

const filePdf = new File(['abc'.repeat(100000)], 'document.pdf');
const fileJpg = new File(['abc'.repeat(500000)], 'document.doc');
const exampleFiles: Vedlegg[] = [
    { file: filePdf, error: false, pending: false, uploaded: true },
    { file: fileJpg, error: true, reasons: ['fileType'], uploaded: false, pending: false },
];
