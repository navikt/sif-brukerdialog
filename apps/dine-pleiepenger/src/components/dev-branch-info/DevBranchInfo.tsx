import { Tag } from '@navikt/ds-react';
import { useRef } from 'react';

import { getServerEnv } from '../../utils/env';

const DevBranchInfo = () => {
    const tagRef = useRef<HTMLDivElement>(null);
    const { GITHUB_REF_NAME, NEXT_PUBLIC_APPSTATUS_DATASET } = getServerEnv();

    if (
        !GITHUB_REF_NAME ||
        GITHUB_REF_NAME === 'undefined' ||
        GITHUB_REF_NAME === 'main' ||
        NEXT_PUBLIC_APPSTATUS_DATASET !== 'staging'
    ) {
        return null;
    }

    const deleteTag = () => {
        if (tagRef.current) {
            tagRef.current.remove();
        }
    };

    return (
        <Tag
            role="presentation"
            aria-hidden={true}
            ref={tagRef}
            onClick={deleteTag}
            variant="info"
            size="small"
            title="Klikk for å fjerne denne taggen. Den vises kun i dev-modus."
            style={{
                cursor: 'pointer',
                position: 'fixed',
                bottom: 0,
                left: 0,
                margin: '.25rem',
                padding: '.25rem',
                boxShadow: '0 0 6px rgba(0,0,0,0.3)',
                background: 'rgba(255,255,255, 0.6)',
            }}>
            Github-branch: {GITHUB_REF_NAME}
        </Tag>
    );
};

export default DevBranchInfo;
