import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { Infolist } from '@navikt/sif-common-core-ds';
import { BodyShort, Link, VStack } from '@navikt/ds-react';

const SøknadSendtInformasjon = () => {
    return (
        <Kvittering tittel="Vi har mottatt søknaden din om ungdomsprogramytelse">
            <VStack gap="8">
                <Infolist heading="Hva skjer videre?">
                    <li>Du vil abc</li>
                    <li>Så vil def</li>
                </Infolist>
                <BodyShort as="div">
                    Gå til <Link href="/">din ungdomsprogramytelse</Link>
                </BodyShort>
            </VStack>
        </Kvittering>
    );
};

export default SøknadSendtInformasjon;
