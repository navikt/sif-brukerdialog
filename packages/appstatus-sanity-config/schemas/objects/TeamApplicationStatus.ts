import { APPLICATION_STATUS } from '../../types';

const TeamApplicationStatus = {
    title: 'TeamApplicationStatus',
    name: 'teamApplicationStatus',
    type: 'object',
    fields: [
        {
            title: 'Status',
            name: 'status',
            type: 'string',
            options: {
                layout: 'radio',
                list: [
                    { title: 'All good', value: APPLICATION_STATUS.normal },
                    { title: 'Unavailable', value: APPLICATION_STATUS.unavailable },
                ],
            },
        },
    ],
};

export default TeamApplicationStatus;
