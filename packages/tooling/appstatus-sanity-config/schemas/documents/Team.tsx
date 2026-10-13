import { defineField, defineType } from 'sanity';

import StatusIcon from '../../components/status-icon/StatusIcon';
import {
    getStatusIconStatusFromApplicationStatus,
    getStatusSubTitleFromApplicationStatus,
} from '../../utils/previewUtils';

const Team = defineType({
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
        defineField({
            title: 'Navn',
            name: 'name',
            type: 'string',
        }),
        defineField({
            title: 'ID',
            name: 'key',
            type: 'string',
        }),
        defineField({
            title: "Global status for teams' applications",
            name: 'teamApplicationStatus',
            type: 'teamApplicationStatus',
        }),
        defineField({
            title: 'Listen for sanity changes',
            name: 'liveUpdate',
            type: 'boolean',
        }),
        defineField({
            title: 'Message',
            name: 'message',
            type: 'array',
            of: [{ type: 'statusMessage' }],
            deprecated: {
                reason: 'Message is no longer shown in the applications. Use "Notice" on the application instead.',
            },
            validation: (rule) => rule.max(1),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            applicationStatus: 'teamApplicationStatus',
        },
        prepare({ title, applicationStatus }) {
            return {
                title,
                subtitle: getStatusSubTitleFromApplicationStatus(applicationStatus?.status),
                media: <StatusIcon status={getStatusIconStatusFromApplicationStatus(applicationStatus?.status)} />,
            };
        },
    },
});

export default Team;
