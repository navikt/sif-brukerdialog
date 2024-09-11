import { Heading, VStack } from '@navikt/ds-react';
import ShadowBox from './ShadowBox';
import { ReactNode } from 'react';

const AlertStoryWrapper = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <ShadowBox>
            <VStack gap="4">
                <Heading level="3" size="small">
                    {title}
                </Heading>
                <div>{children}</div>
            </VStack>
        </ShadowBox>
    );
};

export default AlertStoryWrapper;
