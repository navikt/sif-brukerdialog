import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, Heading, InfoCard, Link } from '@navikt/ds-react';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { AppText } from '../../../../i18n';
import { appEnv } from '../../../../utils/appEnv';
import { UtledetVedtakInfo } from '../omBarnetStepUtils';

interface Props {
    barnetsFornavn: string;
    vedtak: UtledetVedtakInfo;
}

const VedtakForBarnInfo = ({ barnetsFornavn, vedtak }: Props) => {
    if (vedtak.erTidsbegrenset === false) {
        return (
            <InfoCard data-color="info">
                <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                    <Heading level="3" size="small" spacing>
                        <AppText id="steg.omBarnet.alert.trengerIkkeSøke.tittel" values={{ barnetsFornavn }} />
                    </Heading>
                    <BodyLong>
                        <AppText
                            id="steg.omBarnet.alert.trengerIkkeSøke.tekst"
                            values={{
                                barnetsFornavn,
                                Lenke: (child: ReactNode) => <Link href={appEnv.SIF_PUBLIC_MINSIDE_URL}>{child}</Link>,
                            }}
                        />
                    </BodyLong>
                </InfoCard.Message>
            </InfoCard>
        );
    }
    return (
        <InfoCard data-color="warning">
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <Heading level="3" size="small" spacing>
                    <AppText id="steg.omBarnet.alert.tidsbegrensetVedtak.tittel" values={{ barnetsFornavn }} />
                </Heading>
                <BodyLong>
                    <AppText
                        id="steg.omBarnet.alert.tidsbegrensetVedtak.tekst.1"
                        values={{
                            barnetsFornavn,
                            vedtakTomDato: dateFormatter.compact(ISODateToDate(vedtak.vedtakTomDato)),
                            førsteMuligeSøknadsdato: dateFormatter.compact(
                                ISODateToDate(vedtak.førsteMuligeSøknadsdato),
                            ),
                        }}
                    />
                </BodyLong>
                <BodyLong>
                    <AppText
                        id="steg.omBarnet.alert.tidsbegrensetVedtak.tekst.2"
                        values={{
                            Lenke: (child: ReactNode) => <Link href={appEnv.SIF_PUBLIC_MINSIDE_URL}>{child}</Link>,
                        }}
                    />
                </BodyLong>
            </InfoCard.Message>
        </InfoCard>
    );
};

export default VedtakForBarnInfo;
