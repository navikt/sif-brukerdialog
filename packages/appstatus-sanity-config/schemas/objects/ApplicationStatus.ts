/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { APPLICATION_STATUS } from '../../types';

const ApplicationStatus = {
    title: 'ApplicationStatus',
    name: 'applicationStatus',
    type: 'object',
    fields: [
        {
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
            validation: (Rule: { required: () => any }) => Rule.required(),
        },
    ],
};

export default ApplicationStatus;
