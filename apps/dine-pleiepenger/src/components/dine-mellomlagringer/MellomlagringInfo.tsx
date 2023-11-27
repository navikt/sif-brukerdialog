import { HGrid } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { browserEnv } from '../../utils/env';
import { MellomlagringEndring, MellomlagringPSB } from '../../types/Mellomlagring';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';
import intlHelper from '../../utils/intlUtils';
import { Edit } from '@navikt/ds-icons';

interface Props {
    søknad?: MellomlagringPSB;
    endring?: MellomlagringEndring;
}

const getDatoOgTidTilSlettSøknadString = (date: Date): string => {
    return dayjs(date).add(72, 'hours').format('D. MMMM YYYY [kl.] HH:mm');
};

const MellomlagringInfo = ({ endring, søknad }: Props) => {
    const intl = useIntl();

    if (!endring && !søknad) {
        return null;
    }

    const datoNårSøknadSlettes = søknad?.metadata?.updatedTimestamp
        ? getDatoOgTidTilSlettSøknadString(søknad?.metadata?.updatedTimestamp)
        : undefined;
    const datoNårEndringSlettes = søknad?.metadata?.updatedTimestamp
        ? getDatoOgTidTilSlettSøknadString(søknad?.metadata?.updatedTimestamp)
        : undefined;

    return (
        <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
            {datoNårSøknadSlettes && (
                <SnarveiLinkPanel
                    icon={<Edit role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />}
                    href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_URL}
                    title={intlHelper(intl, 'påbegyntSøknad.info.title')}
                    description={intlHelper(intl, 'påbegyntSøknad.info', {
                        datoNårSlettes: datoNårSøknadSlettes,
                    })}
                />
            )}
            {datoNårEndringSlettes && (
                <SnarveiLinkPanel
                    icon={<Edit role="presentation" aria-hidden={true} width="1.25rem" height="1.25rem" />}
                    href={browserEnv.NEXT_PUBLIC_ENDRINGSDIALOG_URL}
                    title={intlHelper(intl, 'påbegyntEndring.info.title')}
                    description={intlHelper(intl, 'påbegyntEndring.info', {
                        datoNårSlettes: datoNårSøknadSlettes,
                    })}
                />
            )}
        </HGrid>
    );
};

export default MellomlagringInfo;
