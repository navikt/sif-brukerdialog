import { BodyShort, Heading, LinkPanel, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { browserEnv } from '../../utils/env';
import { MellomlagringEndring, MellomlagringPSB } from '../../types/Mellomlagring';

interface Props {
    søknad?: MellomlagringPSB;
    endring?: MellomlagringEndring;
}

const getDatoOgTidTilSlettSøknadString = (date: Date): string => {
    return dayjs(date).add(72, 'hours').format('D. MMMM YYYY [kl.] HH:mm');
};

const MellomlagringInfo = ({ endring, søknad }: Props) => {
    if (!endring && !søknad) {
        return null;
    }

    // const intl = useIntl();
    const datoNårSøknadSlettes = søknad?.metadata?.updatedTimestamp
        ? getDatoOgTidTilSlettSøknadString(søknad?.metadata?.updatedTimestamp)
        : undefined;
    const datoNårEndringSlettes = søknad?.metadata?.updatedTimestamp
        ? getDatoOgTidTilSlettSøknadString(søknad?.metadata?.updatedTimestamp)
        : undefined;
    // const datoNårEndringSlettes = endringUpdatedTimestamp
    //     ? getDatoOgTidTilSlettSøknadString(endringUpdatedTimestamp)
    //     : undefined;

    // const title = isFeatureEnabled(Feature.ENDRINGSDIALOG)
    //     ? intlHelper(intl, 'page.dinOversikt.påbegyntEndringEllerSøknad.title')
    //     : intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title');

    // const ingenEndringTekst = isFeatureEnabled(Feature.ENDRINGSDIALOG)
    //     ? intlHelper(intl, 'page.dinOversikt.påbegyntEndringEllerSøknad.ingenPåbegynt')
    //     : intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt');

    return (
        <VStack gap="2">
            {datoNårSøknadSlettes && (
                <LinkPanel href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_URL} border={true}>
                    <Heading level="3" size="small">
                        <FormattedMessage id="påbegyntSøknad.info.title" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="påbegyntSøknad.info" values={{ datoNårSlettes: datoNårSøknadSlettes }} />
                    </BodyShort>
                </LinkPanel>
            )}
            {datoNårEndringSlettes && (
                <LinkPanel href={browserEnv.NEXT_PUBLIC_ENDRINGSDIALOG_URL} border={true}>
                    <Heading level="3" size="small">
                        <FormattedMessage id="påbegyntEndring.info.title" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage
                            id="påbegyntEndring.info"
                            values={{ datoNårSlettes: datoNårEndringSlettes }}
                        />
                    </BodyShort>
                </LinkPanel>
            )}
            {/* {datoNårEndringSlettes && (
                <div className={bem.block}>
                    <LenkepanelBase href={getLenker().endringsdialogPleiepenger} border={true}>
                        <div className={bem.element('content')}>
                            <div className={bem.element('title')}>
                                {intlHelper(intl, 'page.dinOversikt.påbegyntEndringsmelding.info.title')}
                            </div>

                            {intlHelper(intl, `page.dinOversikt.påbegyntEndringsmelding.info`, {
                                datoNårSlettes: datoNårEndringSlettes,
                            })}
                        </div>
                    </LenkepanelBase>
                </div>
            )}
            {!datoNårSøknadSlettes && !datoNårEndringSlettes && <Box>{ingenEndringTekst}</Box>} */}
        </VStack>
    );
};

export default MellomlagringInfo;
