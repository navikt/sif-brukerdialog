import { Tag } from '@navikt/ds-react';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { useRef } from 'react';

const DevBranchInfo = () => {
    const tagRef = useRef<HTMLDivElement>(null);
    if (getEnvironmentVariable('APP_VERSION') === 'production') {
        return null;
    }

    const deleteTag = () => {
        if (tagRef.current) {
            tagRef.current.remove();
        }
    };
    const devBranchName = getEnvironmentVariable('GITHUB_REF');
    if (devBranchName) {
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
    }
    return null;
};

export default DevBranchInfo;
