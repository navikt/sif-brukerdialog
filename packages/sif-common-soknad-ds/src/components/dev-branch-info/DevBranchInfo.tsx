import { Tag } from '@navikt/ds-react';
import { useRef } from 'react';
import { getEnv, isDevMode } from '@navikt/sif-common-env';

const DevBranchInfo = () => {
    const tagRef = useRef<HTMLDivElement>(null);
    const devBranchName = getEnv('GITHUB_REF_NAME');

    if (!devBranchName || devBranchName === 'undefined' || !isDevMode()) {
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
            Github-branch: {devBranchName}
        </Tag>
    );
};

export default DevBranchInfo;
