import { Tag } from '@navikt/ds-react';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { useRef } from 'react';

const DevBranchInfo = () => {
    const tagRef = useRef<HTMLDivElement>(null);
    const devBranchName = getEnvironmentVariable('GITHUB_REF_NAME');

    if (!devBranchName || devBranchName === 'undefined' || getEnvironmentVariable('APP_VERSION') !== 'dev') {
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
