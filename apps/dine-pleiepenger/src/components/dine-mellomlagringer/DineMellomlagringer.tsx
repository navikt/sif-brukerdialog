import { HGrid } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import dayjs from 'dayjs';
import { MellomlagringEndring, MellomlagringPSB } from '../../types/Mellomlagring';
import { browserEnv } from '../../utils/env';
import MellomlagringLinkPanel from './MellomlagringLinkPanel';

interface Props {
    søknad?: MellomlagringPSB;
    endring?: MellomlagringEndring;
}

const getDatoOgTidTilSlettSøknadString = (date: Date): string => {
    return dayjs(date).add(72, 'hours').format('D. MMMM [kl.] HH:mm.');
};

const DineMellomlagringer = ({ endring, søknad }: Props) => {
    const intl = useIntl();

    if (!endring && !søknad) {
        return null;
    }

    const datoNårSøknadSlettes = søknad?.metadata?.updatedTimestamp
        ? getDatoOgTidTilSlettSøknadString(søknad?.metadata?.updatedTimestamp)
        : undefined;
    const datoNårEndringSlettes = endring?.metadata?.updatedTimestamp
        ? getDatoOgTidTilSlettSøknadString(endring?.metadata?.updatedTimestamp)
        : undefined;

    return (
        <div className="p-2 bg-deepblue-800 rounded-lg">
            <HGrid gap="1" columns={{ sm: 1, md: 2 }}>
                {datoNårSøknadSlettes && (
                    <MellomlagringLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL}
                        title={intlHelper(intl, 'påbegyntSøknad.info.title')}
                        description={intlHelper(intl, 'påbegyntSøknad.info', {
                            datoNårSlettes: datoNårSøknadSlettes,
                        })}
                    />
                )}
                {datoNårEndringSlettes && (
                    <MellomlagringLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKJEMA_ENDRINGSMELDING_URL}
                        title={intlHelper(intl, 'påbegyntEndring.info.title')}
                        description={intlHelper(intl, 'påbegyntEndring.info', {
                            datoNårSlettes: datoNårEndringSlettes,
                        })}
                    />
                )}
            </HGrid>
        </div>
    );
};

export default DineMellomlagringer;
