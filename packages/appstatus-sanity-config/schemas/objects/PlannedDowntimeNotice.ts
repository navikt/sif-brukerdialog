import { defineField, defineType } from 'sanity';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const PlannedDowntimeNotice = defineType({
    title: 'Planned downtime',
    name: 'plannedDowntimeNotice',
    type: 'object',
    description: 'Shows a predefined message about planned downtime. The text is defined in the application.',
    fields: [
        defineField({
            title: 'Date',
            name: 'date',
            type: 'date',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'From (HH:mm)',
            name: 'from',
            type: 'string',
            validation: (rule) => rule.required().regex(TIME_REGEX, { name: 'HH:mm' }),
        }),
        defineField({
            title: 'To (HH:mm)',
            name: 'to',
            type: 'string',
            validation: (rule) =>
                rule
                    .required()
                    .regex(TIME_REGEX, { name: 'HH:mm' })
                    .custom((to, context) => {
                        const from = (context.parent as { from?: string } | undefined)?.from;
                        if (typeof to === 'string' && typeof from === 'string' && to <= from) {
                            return 'To must be after from';
                        }
                        return true;
                    }),
        }),
    ],
    preview: {
        select: {
            date: 'date',
            from: 'from',
            to: 'to',
        },
        prepare({ date, from, to }) {
            return {
                title: 'Planned downtime',
                subtitle: `${date ?? '?'} ${from ?? '?'} - ${to ?? '?'}`,
            };
        },
    },
});
