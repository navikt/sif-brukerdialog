import { useAppContext } from '@app/context/AppContext';
import { AppText, useAppIntl } from '@app/i18n';
import { getLenker } from '@app/lenker';
import { BodyShort, Heading, Link, VStack } from '@navikt/ds-react';
import { SøknadVelkommenPage } from '@sif/soknad-app';
import { SifInfoCard } from '@sif/soknad-ui';
import dayjs from 'dayjs';

import OmSøknaden from './OmSoknaden';

const erSøker30ÅrEllerEldre = (fødselsdato?: string | null): boolean =>
    !!fødselsdato && dayjs().diff(dayjs(fødselsdato), 'year') >= 30;

export const Velkommen = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();

    return (
        <SøknadVelkommenPage
            title={text('application.title')}
            guide={{
                navn: søker.fornavn || '',
                content: (
                    <>
                        <BodyShort spacing>
                            <AppText id="page.velkommen.guide.info.1" />
                        </BodyShort>
                        <BodyShort spacing>
                            <AppText id="page.velkommen.guide.info.2" />
                        </BodyShort>
                        <BodyShort spacing>
                            <AppText id="page.velkommen.guide.info.3" />
                        </BodyShort>
                        <BodyShort spacing>
                            <AppText
                                id="page.velkommen.guide.info.4"
                                values={{ Lenke: (children) => <Link href={getLenker().navForside}>{children}</Link> }}
                            />
                        </BodyShort>
                    </>
                ),
            }}>
            <VStack gap="space-32">
                {erSøker30ÅrEllerEldre(søker.fødselsdato) && (
                    <SifInfoCard variant="warning">
                        <Heading size="xsmall" level="3" spacing>
                            <AppText id="page.velkommen.over29år.tittel" />
                        </Heading>
                        <BodyShort>
                            <AppText id="page.velkommen.over29år" />
                        </BodyShort>
                    </SifInfoCard>
                )}
                <OmSøknaden />
            </VStack>
        </SøknadVelkommenPage>
    );
};
