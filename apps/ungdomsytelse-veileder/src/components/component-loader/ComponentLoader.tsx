import { BodyShort, Loader, VStack } from '@navikt/ds-react';
import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

interface Props {
    title?: string;
    fallback?: React.ReactNode;
}

const ComponentLoader: React.FunctionComponent<Props> = ({ title, fallback }) =>
    fallback ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="opacity-60">{fallback}</div>
        </SkeletonTheme>
    ) : (
        <div className="p-5 text-center">
            <VStack gap="4" align="center">
                <Loader size="2xlarge" title={title} />
                {title ? <BodyShort size="large">{title}</BodyShort> : null}
            </VStack>
        </div>
    );

export default ComponentLoader;
