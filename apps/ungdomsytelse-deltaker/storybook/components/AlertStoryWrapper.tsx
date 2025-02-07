import { Heading, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import MessagesList from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import ShadowBox from './ShadowBox';
import { storybookIntlUtils } from '../utils/intlUtils';

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
                <VStack gap="4">
                    <Heading level="3" size="small">
                        {title}
                    </Heading>
                    <div>{children}</div>
                </VStack>
            </ShadowBox>

            {messages && <MessagesList messages={messages} />}
        </>
    );
};

export default AlertStoryWrapper;
