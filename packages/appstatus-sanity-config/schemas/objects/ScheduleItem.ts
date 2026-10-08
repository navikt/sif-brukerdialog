import dayjs from 'dayjs';
import { defineField, defineType } from 'sanity';

const formatTime = (dateString: string): string => dayjs(dateString).format('DD. MMM. yyyy hh:mm');

const ScheduleItem = defineType({
    title: 'Schedule item',
    name: 'scheduleItem',
    type: 'object',
    fields: [
        defineField({
            title: 'Internal name',
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Starts at',
            name: 'starts',
            type: 'datetime',
        }),
        defineField({
            title: 'Ends at',
            name: 'ends',
            type: 'datetime',
        }),
        defineField({
            title: 'Disable application',
            name: 'disableApplication',
            type: 'boolean',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Message',
            name: 'message',
            type: 'statusMessage',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            starts: 'starts',
            ends: 'ends',
        },
        prepare({ title, starts, ends }) {
            const subtitle = `${formatTime(starts)} - ${ends ? formatTime(ends) : 'No end-time set'}`;
            return {
                title,
                subtitle,
            };
        },
    },
});

export default ScheduleItem;
