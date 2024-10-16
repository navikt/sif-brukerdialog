import { APPLICATION_STATUS } from '../types';
import { StatusIconStatusKey } from '../components/status-icon/StatusIcon';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const shortenText = (text: string): string => {
    if (text && typeof text === 'string' && text.length > 28) {
        return `${text.substr(0, 25)}...`;
    }
    return text;
};

export const toPlainText = (blocks: any[] = []) => {
    return (
        blocks
            // loop through each block
            .map((block) => {
                // if it's not a text block with children,
                // return nothing
                if (block._type !== 'block' || !block.children) {
                    return '';
                }
                // loop through the children spans, and join the
                // text strings
                return block.children.map((child: any) => child.text).join('');
            })
            // join the parapgraphs leaving split by two linebreaks
            .join('\n\n')
    );
};

export const getStatusIconStatusFromApplicationStatus = (status: APPLICATION_STATUS): StatusIconStatusKey => {
    switch (status) {
        case APPLICATION_STATUS.unavailable:
            return 'feil';
        default:
            return 'suksess';
    }
};

export const getStatusSubTitleFromApplicationStatus = (status: APPLICATION_STATUS): string => {
    switch (status) {
        case APPLICATION_STATUS.unavailable:
            return 'Unavailable';
        default:
            return 'All good';
    }
};
