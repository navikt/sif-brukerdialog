import { Box, Button, CopyButton, HStack, VStack } from '@navikt/ds-react';
import { getAppEnv } from '../utils/appEnv';
import { mockUtils } from '../../mock/msw/mocks/mockUtils';

const DevUserList = () => {
    return getAppEnv().SIF_PUBLIC_IS_LOCAL ? (
        <VStack gap="10">
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
            <Box>
                <Button
                    variant="secondary"
                    size="small"
                    onClick={() => {
                        mockUtils.reset();
                        window.location.reload();
                    }}>
                    Reset testdata
                </Button>
            </Box>
        </VStack>
    ) : null;
};

export default DevUserList;
