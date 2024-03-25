import { BodyLong, Box, Heading, HGrid, HStack, Link, VStack } from '@navikt/ds-react';
import { Dialog, DialogFilled, Send, SendFilled, Telephone, TelephoneFilled } from '@navikt/ds-icons';
import { Msg } from '../../i18n';

const KontaktOss = () => {
    return (
        <VStack gap="8" className="mb-10">
            <Heading level="2" size="medium">
                <Msg id="kontaktOss.tittel" />
            </Heading>
            <HGrid columns={{ md: 3 }} gap="8">
                <Box>
                    <Heading level="3" size="small" spacing={true}>
                        <Link href="https://www.nav.no/kontaktoss#chat-med-oss" className="group">
                            <HStack gap="2" align={'center'} wrap={false}>
                                <div role="presentation">
                                    <Dialog role="presentation" className="group-hover:hidden" />
                                    <DialogFilled role="presentation" className="hidden group-hover:block" />
                                </div>
                                <Msg id="kontaktOss.chatLenke" />
                            </HStack>
                        </Link>
                    </Heading>
                    <BodyLong>
                        <Msg id="kontaktOss.frida" />
                    </BodyLong>
                </Box>
                <Box>
                    <Heading level="3" size="small" spacing={true}>
                        <Link href="https://www.nav.no/kontaktoss#skriv-til-oss" className="group">
                            <HStack gap="2" align={'center'} wrap={false}>
                                <div role="presentation">
                                    <Send role="presentation" className="group-hover:hidden" />
                                    <SendFilled role="presentation" className="hidden group-hover:block" />
                                </div>
                                <Msg id="kontaktOss.skrivTilOssLenke" />
                            </HStack>
                        </Link>
                    </Heading>
                    <Msg id="kontaktOss.skrivTilOssInfo" values={{ p: (chunk) => <BodyLong>{chunk}</BodyLong> }} />
                </Box>
                <Box>
                    <Heading level="3" size="small" spacing={true}>
                        <Link href="tel:55553333" className="group">
                            <HStack gap="2" align={'center'} wrap={false}>
                                <div role="presentation">
                                    <Telephone role="presentation" className="group-hover:hidden" />
                                    <TelephoneFilled role="presentation" className="hidden group-hover:block" />
                                </div>
                                <Msg id="kontaktOss.ringOssLenke" />
                            </HStack>
                        </Link>
                    </Heading>
                    <BodyLong as="div">
                        <p className="mb-2">
                            <Msg id="kontaktOss.ringOssInfo" />
                        </p>
                        <p>
                            <Link href="https://www.nav.no/kontaktoss#ring-oss" className="nav-ds-link">
                                <Msg id="kontaktOss.ringOssSeTelefonnummer" />
                            </Link>
                        </p>
                    </BodyLong>
                </Box>
            </HGrid>
        </VStack>
    );
};

export default KontaktOss;
