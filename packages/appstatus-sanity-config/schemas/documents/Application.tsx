import { defineField, defineType } from 'sanity';

import StatusIcon from '../../components/status-icon/StatusIcon';
import { APPLICATION_STATUS } from '../../types';
import {
    getStatusIconStatusFromApplicationStatus,
    getStatusSubTitleFromApplicationStatus,
} from '../../utils/previewUtils';

const Application = defineType({
    title: 'Application',
    name: 'application',
    type: 'document',
    fieldsets: [
        {
            name: 'config',
            title: 'Name/Id/Team',
        },
        {
            name: 'status',
            title: 'Overall status',
        },
    ],
    fields: [
        defineField({
            title: 'Name',
            name: 'name',
            type: 'string',
            fieldset: 'config',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'ID',
            name: 'key',
            type: 'string',
            fieldset: 'config',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Team',
            name: 'team',
            type: 'reference',
            to: [{ type: 'team' }],
            fieldset: 'config',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Application status',
            name: 'applicationStatus',
            type: 'applicationStatus',
        }),
        defineField({
            title: 'Listen for sanity changes',
            name: 'liveUpdate',
            type: 'boolean',
        }),
        defineField({
            title: 'Notice',
            description: 'Predefined message shown to the user',
            name: 'notice',
            type: 'array',
            of: [{ type: 'plannedDowntimeNotice' }],
            validation: (rule) => rule.max(1),
        }),
        defineField({
            title: 'Message',
            description: 'This will always override team messages',
            name: 'message',
            type: 'array',
            of: [{ type: 'statusMessage' }],
            deprecated: {
                reason: 'Message is no longer shown in the applications. Use "Notice" instead.',
            },
            validation: (rule) => rule.max(1),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            team: 'team.name',
            teamAppStatus: 'team.teamApplicationStatus',
            applicationStatus: 'applicationStatus',
        },
        prepare({ title, team, teamAppStatus, applicationStatus }) {
            const useTeamAppStatus = applicationStatus?.status === APPLICATION_STATUS.team;
            const { status = APPLICATION_STATUS.normal } = (useTeamAppStatus ? teamAppStatus : applicationStatus) ?? {};
            return {
                title,
                subtitle: `${getStatusSubTitleFromApplicationStatus(status)}${
                    useTeamAppStatus ? ' (inherited)' : ''
                } - ${team}`,
                media: <StatusIcon status={getStatusIconStatusFromApplicationStatus(status)} />,
            };
        },
    },
    orderings: [
        {
            title: 'name',
            name: 'name',
            by: [{ field: 'name', direction: 'asc' }],
        },
        {
            title: 'team asc',
            name: 'teamAsc',
            by: [{ field: 'team.name', direction: 'asc' }],
        },
        {
            title: 'team desc',
            name: 'teamDesc',
            by: [{ field: 'team.name', direction: 'desc' }],
        },
    ],
});

export default Application;
