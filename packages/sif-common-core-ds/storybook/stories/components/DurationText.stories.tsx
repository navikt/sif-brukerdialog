import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ISODurationToDuration } from '@navikt/sif-common-utils/lib';
import DurationText, { getDurationString } from '../../../src/components/duration-text/DurationText';
import { Table } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import StoryWrapper from '../../decorators/StoryWrapper';

export default {
    title: 'Component/DurationText',
    component: DurationText,
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
} as Meta<typeof DurationText>;

const duration = ISODurationToDuration('PT8H0M');

const Template: StoryFn<typeof DurationText> = (args) => {
    const intl = useIntl();

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Output</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.DataCell>Komponent</Table.DataCell>
                        <Table.DataCell>
                            <DurationText {...args} />
                        </Table.DataCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.DataCell>getDurationString</Table.DataCell>
                        <Table.DataCell>{getDurationString(intl, args)}</Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    duration,
};

Default.parameters = {};
