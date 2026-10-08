import { defineField, defineType } from 'sanity';

import { APPLICATION_STATUS } from '../../types';

const ApplicationStatus = defineType({
    title: 'ApplicationStatus',
    name: 'applicationStatus',
    type: 'object',
    fields: [
        defineField({
            title: 'Status',
            name: 'status',
            type: 'string',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Inherit (same as team)', value: APPLICATION_STATUS.team },
                    { title: 'Normal', value: APPLICATION_STATUS.normal },
                    { title: 'Unavailable', value: APPLICATION_STATUS.unavailable },
                ],
            },
            validation: (rule) => rule.required(),
        }),
    ],
});

export default ApplicationStatus;
