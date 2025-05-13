import { CopyButton, HStack, VStack } from '@navikt/ds-react';
import { getAppEnv } from '../utils/appEnv';

const DevUserList = () => {
    return getAppEnv().IS_LOCAL ? (
        <VStack>
            Testbrukere lokalt:
            <HStack gap="2" align="center">
                <CopyButton copyText="03867198392" size="small" /> 03867198392 - registrert
            </HStack>
            <HStack gap="2" align="center">
                <CopyButton copyText="56857102105" size="small" /> 56857102105 - ikke registrert
            </HStack>
            <HStack gap="2" align="center">
                <CopyButton copyText="27857798800" size="small" /> 27857798800 - finnes ikke
            </HStack>
            <HStack gap="2" align="center">
                <CopyButton copyText="09847696068" size="small" /> 09847696068 - kode 6/7
            </HStack>
        </VStack>
    ) : null;
};

export default DevUserList;
