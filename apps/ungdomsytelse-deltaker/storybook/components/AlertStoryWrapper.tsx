import { Heading, VStack } from '@navikt/ds-react';
import { I18nMessagesPreview } from '@sif/soknad-ui';
import { ReactNode } from 'react';

import { storybookIntlUtils } from '../utils/intlUtils';
import ShadowBox from './ShadowBox';

const AlertStoryWrapper = ({
    title,
    children,
    intlScope,
}: {
    title: string;
    children: ReactNode;
    intlScope?: string;
}) => {
    const messages = intlScope
        ? storybookIntlUtils.getIntlMessagesFromKeys(storybookIntlUtils.getScopedIntlKeys(intlScope))
        : undefined;
    return (
        <>
            <ShadowBox>
                <VStack gap="space-16">
                    <Heading level="3" size="small">
                        {title}
                    </Heading>
                    <div>{children}</div>
                </VStack>
            </ShadowBox>
            {messages && <I18nMessagesPreview nb={messages.nb} nn={messages.nn} />}
        </>
    );
};

export default AlertStoryWrapper;
