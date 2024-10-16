/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import StatusIcon from '../../components/status-icon/StatusIcon';
import {
    getStatusIconStatusFromApplicationStatus,
    getStatusSubTitleFromApplicationStatus,
} from '../../utils/previewUtils';

const Team = {
    title: 'Team',
    name: 'team',
    type: 'document',
    fieldsets: [
        {
            name: 'schedule',
            title: 'Common schedule',
        },
    ],
    fields: [
        {
            title: 'Navn',
            name: 'name',
            type: 'string',
        },
        {
            title: 'ID',
            name: 'key',
            type: 'string',
        },
        {
            title: "Global status for teams' applications",
            name: 'teamApplicationStatus',
            type: 'teamApplicationStatus',
        },
        {
            title: 'Listen for sanity changes',
            name: 'liveUpdate',
            type: 'boolean',
        },

        {
            title: 'Message',
            name: 'message',
            type: 'array',
            of: [{ type: 'statusMessage' }],
            validation: (Rule: { max: (num: number) => any }) => Rule.max(1),
        },
    ],
    preview: {
        select: {
            title: 'name',
            applicationStatus: 'teamApplicationStatus',
        },
        prepare(props: any): any {
            return {
                title: props.title,
                subtitle: getStatusSubTitleFromApplicationStatus(props.applicationStatus.status),
                media: <StatusIcon status={getStatusIconStatusFromApplicationStatus(props.applicationStatus.status)} />,
            };
        },
    },
};

export default Team;
