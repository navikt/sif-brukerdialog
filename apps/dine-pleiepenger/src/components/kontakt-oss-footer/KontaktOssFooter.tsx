import { Dialog, Send, Telephone } from '@navikt/ds-icons';
import { BodyLong, Box, HGrid, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import React from 'react';

interface Props {}

const KontaktOssFooter: React.FunctionComponent<Props> = ({}) => {
    return (
        <VStack gap="10">
            <Heading level="2" size="medium">
                Finner du ikke svaret her? Ta kontakt med oss
            </Heading>
            <HGrid columns={{ md: 3 }} gap="10">
                <Box>
                    <Heading level="3" size="small" spacing={true}>
                        <Link href="https://www.nav.no/pleiepenger-barn#">
                            <HStack gap="2" align={'center'}>
                                <Dialog />
                                Chat med oss
                            </HStack>
                        </Link>
                    </Heading>
                    <BodyLong>
                        Du møter først chatbot Frida som har døgnåpent. Mellom klokken 9 og 15 på hverdager kan du be
                        Frida om å få chatte med en veileder.
                    </BodyLong>
                </Box>
                <Box>
                    <Heading level="3" size="small" spacing={true}>
                        <Link href="https://www.nav.no/kontaktoss#skriv-til-oss">
                            <HStack gap="2" align={'center'}>
                                <Send />
                                Skriv til oss
                            </HStack>
                        </Link>
                    </Heading>
                    <BodyLong>Send beskjed eller nye opplysninger i saken din. Du kan også sende spørsmål.</BodyLong>
                    <BodyLong>Svartid er 4 arbeidsdager. Hvis du vil ha svar raskere, kan du bruke chat.</BodyLong>
                </Box>
                <Box>
                    <Heading level="3" size="small" spacing={true}>
                        <Link href="tel:55553333">
                            <HStack gap="2" align={'center'}>
                                <Telephone />
                                Ring oss på 55 55 33 33
                            </HStack>
                        </Link>
                    </Heading>
                    <BodyLong as="div">
                        <p>Åpent hverdager kl. 9–15. Vi kan ringe deg tilbake hvis ventetiden er over 5 min.</p>
                        <p>
                            <Link href="https://www.nav.no/kontaktoss#ring-oss" className="nav-ds-link">
                                Se flere telefonnummer og tastevalg
                            </Link>
                        </p>
                    </BodyLong>
                </Box>
            </HGrid>
        </VStack>
    );
};

export default KontaktOssFooter;

// import { NavRoutes } from 'app/routes/routes';
// import { bemUtils, intlUtils } from '@navikt/fp-common';
// import './kontaktOss.css';
// import { BodyShort, Heading, Link } from '@navikt/ds-react';
// import { useIntl } from 'react-intl';
// import { Dialog, Send, Telephone } from '@navikt/ds-icons';

// const KontaktOss: React.FunctionComponent = () => {
//     const bem = bemUtils('kontaktOss');
//     const intl = useIntl();

//     return (
//         <div className={bem.block}>
//             <div className={bem.element('wrapper')}>
//                 <div className={bem.element('title')}>
//                     <Heading size="medium">{intlUtils(intl, 'saksoversikt.kontaktOss')}</Heading>
//                 </div>
//                 <div className={bem.element('content')}>
//                     <div className={bem.element('content_left')}>
//                         <Link href={NavRoutes.CHAT_MED_OSS} className={bem.element('link')}>
//                             <Dialog className={bem.element('linkIcon')}></Dialog>
//                             <BodyShort className={bem.element('linkTitle')}>
//                                 {intlUtils(intl, 'kontaktOss.chatMedOss')}
//                             </BodyShort>
//                         </Link>
//                         <BodyShort size="medium"> {intlUtils(intl, 'kontaktOss.informasjonOmChat')}</BodyShort>
//                     </div>
//                     <div className={bem.element('content_middle')}>
//                         <Link href={NavRoutes.SKRIV_TIL_OSS} className={bem.element('link')}>
//                             <Send className={bem.element('linkIcon')}></Send>
//                             <BodyShort className={bem.element('linkTitle')}>
//                                 {intlUtils(intl, 'kontaktOss.skrivTilOss')}
//                             </BodyShort>
//                         </Link>
//                         <BodyShort size="medium">{intlUtils(intl, 'kontaktOss.skrivTilOss.del1')}</BodyShort>
//                         <BodyShort size="medium" className={bem.element('content_text')}>
//                             {intlUtils(intl, 'kontaktOss.skrivTilOss.del2')}
//                         </BodyShort>
//                     </div>
//                     <div className={bem.element('content_right')}>
//                         <Link href={NavRoutes.RING_OSS} className={bem.element('link')}>
//                             <Telephone className={bem.element('linkIcon')}></Telephone>
//                             <BodyShort className={bem.element('linkTitle')}>
//                                 {intlUtils(intl, 'kontaktOss.ringOss')}
//                             </BodyShort>
//                         </Link>
//                         <BodyShort size="medium">{intlUtils(intl, 'kontaktOss.ringOss.åpningstider')}</BodyShort>
//                         <Link href={NavRoutes.SE_FLERE_TLF_NR_OG_TASTEVALG}>
//                             <BodyShort size="medium" className={bem.element('content_text')}>
//                                 {intlUtils(intl, 'kontaktOss.ringOss.flereTelefonnummere')}
//                             </BodyShort>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default KontaktOss;
