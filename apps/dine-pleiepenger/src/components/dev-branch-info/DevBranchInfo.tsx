import { Tag } from '@navikt/ds-react';
import { useRef } from 'react';
import { browserEnv, getServerEnv } from '../../utils/env';

const DevBranchInfo = () => {
    const tagRef = useRef<HTMLDivElement>(null);
    const { NEXT_PUBLIC_APPSTATUS_DATASET } = browserEnv;
    const { NEXT_PUBLIC_GITHUB_REF_NAME } = getServerEnv();

    if (
        !NEXT_PUBLIC_GITHUB_REF_NAME ||
        NEXT_PUBLIC_GITHUB_REF_NAME === 'undefined' ||
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
            }}>
            Github-branch: {NEXT_PUBLIC_GITHUB_REF_NAME}
        </Tag>
    );
};

export default DevBranchInfo;
