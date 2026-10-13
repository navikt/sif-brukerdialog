import type { PortableTextBlock } from 'sanity';

import { StatusIconStatusKey } from '../components/status-icon/StatusIcon';
import { APPLICATION_STATUS } from '../types';

export const shortenText = (text: string): string => {
    if (text && typeof text === 'string' && text.length > 28) {
        return `${text.substring(0, 25)}...`;
    }
    return text;
};

export const toPlainText = (blocks: PortableTextBlock[] = []): string => {
    return blocks
        .map((block) => {
            if (block._type !== 'block' || !Array.isArray(block.children)) {
                return '';
            }
            return block.children.map((child: { text?: string }) => child.text ?? '').join('');
        })
        .join('\n\n');
};

export const getStatusIconStatusFromApplicationStatus = (status?: APPLICATION_STATUS): StatusIconStatusKey => {
    switch (status) {
        case APPLICATION_STATUS.unavailable:
            return 'feil';
        case APPLICATION_STATUS.team:
        case APPLICATION_STATUS.normal:
        case undefined:
        default:
            return 'suksess';
    }
};

export const getStatusSubTitleFromApplicationStatus = (status?: APPLICATION_STATUS): string => {
    switch (status) {
        case APPLICATION_STATUS.unavailable:
            return 'Unavailable';
        case APPLICATION_STATUS.team:
        case APPLICATION_STATUS.normal:
        case undefined:
        default:
            return 'All good';
    }
};
