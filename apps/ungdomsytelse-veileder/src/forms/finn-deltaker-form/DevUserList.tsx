import { CopyButton, HStack, VStack } from '@navikt/ds-react';
import { getAppEnv } from '../../utils/appEnv';

const DevUserList = () => {
    return getAppEnv().isLocal ? (
        <VStack>
            Testbrukere lokalt:
            <HStack gap="2" align={'center'}>
                <CopyButton copyText="03867198392" size="small" /> 03867198392 - registrert
            </HStack>
            <HStack gap="2" align={'center'}>
                <CopyButton copyText="56857102105" size="small" /> 56857102105 - ikke registrert
            </HStack>
            <HStack gap="2" align={'center'}>
                <CopyButton copyText="27857798800" size="small" /> 27857798800 - finnes ikke
            </HStack>
        </VStack>
    ) : null;
};

export default DevUserList;
