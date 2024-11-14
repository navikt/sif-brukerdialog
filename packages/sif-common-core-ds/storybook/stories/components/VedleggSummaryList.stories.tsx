import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import VedleggSummaryList from '../../../src/components/vedlegg-summary-list/VedleggSummaryList';
import { Vedlegg } from '../../../src/types/Vedlegg';
import StoryWrapper from '../../decorators/StoryWrapper';

const meta: Meta<typeof VedleggSummaryList> = {
    component: VedleggSummaryList,
    title: 'Component/VedleggSummaryList',
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof VedleggSummaryList>;

export const Default: Story = {
    render: () => {
        return <VedleggSummaryList vedlegg={exampleFiles} />;
    },
};

const filePdf = new File(['abc'.repeat(100000)], 'document.pdf');
const fileJpg = new File(['abc'.repeat(500000)], 'document.doc');
const exampleFiles: Vedlegg[] = [
    { file: filePdf, error: false, pending: false, uploaded: true, info: { id: '123', url: '#' } },
    { file: fileJpg, error: true, reasons: ['fileType'], uploaded: false, pending: false },
];
