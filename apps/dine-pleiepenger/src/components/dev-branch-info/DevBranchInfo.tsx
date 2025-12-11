import { Tag } from '@navikt/ds-react';
import { useRef } from 'react';

interface DevBranchInfoProps {
    githubRefName?: string;
    dataset?: string;
}

const DevBranchInfo = ({ githubRefName, dataset }: DevBranchInfoProps) => {
    const tagRef = useRef<HTMLDivElement>(null);

    if (!githubRefName || githubRefName === 'undefined' || githubRefName === 'main' || dataset !== 'staging') {
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
            GitHub-branch: {githubRefName}
        </Tag>
    );
};

export default DevBranchInfo;
