import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../../../types';
import { FrilansApiData, FrilansApiType } from '../../../types/søknad-api-data/SøknadApiData';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';

interface Props {
    frilans: FrilansApiData;
    frilansoppdrag: Arbeidsgiver[];
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag }: Props) => {
    const intl = useIntl();
    if (frilans.harInntektSomFrilanser === false) {
        return (
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
                <ul data-testid="arbeidssituasjon-frilanser">
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} tagName="p" />
                    </li>
                </ul>
            </SummaryBlock>
        );
    }

    return (
        <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
            <ul>
                {frilans.type === FrilansApiType.KUN_HONORARARBEID_MISTER_IKKE_HONORAR && (
                    <li>
                        <FormattedMessage
                            id={'oppsummering.arbeidssituasjon.frilans.HONORARARBEID.misterIkkeHonorar'}
                        />
                    </li>
                )}
                {(frilans.type === FrilansApiType.KUN_FRILANSARBEID ||
                    frilans.type === FrilansApiType.FRILANSARBEID_OG_HONORARARBEID) && (
                    <>
                        <li>
                            <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.FRILANSARBEID'} />.{' '}
                            <NormalarbeidstidSummary
                                normalarbeidstidApiData={frilans.frilansarbeid.arbeidsforhold.normalarbeidstid}
                            />
                            .
                        </li>
                    </>
                )}

                {(frilans.type === FrilansApiType.KUN_HONORARARBEID_MISTER_HONORAR ||
                    frilans.type === FrilansApiType.FRILANSARBEID_OG_HONORARARBEID) && (
                    <>
                        <li>
                            <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.HONORARARBEID'} />.{' '}
                            {frilans.honorararbeid.misterHonorar && (
                                <NormalarbeidstidSummary
                                    normalarbeidstidApiData={frilans.honorararbeid.arbeidsforhold.normalarbeidstid}
                                />
                            )}
                        </li>
                    </>
                )}

                {frilans.type !== FrilansApiType.KUN_HONORARARBEID_MISTER_IKKE_HONORAR && (
                    <>
                        {frilans.startdato && (
                            <li>
                                <FormattedMessage
                                    id="oppsummering.arbeidssituasjon.frilans.startet"
                                    values={{ dato: dateFormatter.full(ISODateToDate(frilans.startdato)) }}
                                />
                            </li>
                        )}
                        {frilans.sluttdato && (
                            <li>
                                <FormattedMessage
                                    id="oppsummering.arbeidssituasjon.frilans.sluttet"
                                    values={{ dato: dateFormatter.full(ISODateToDate(frilans.sluttdato)) }}
                                />
                            </li>
                        )}
                    </>
                )}
                {frilansoppdrag && frilansoppdrag.length > 0 && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidssituasjon.frilans.frilansoppdrag" />
                        <br />
                        <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
                            {frilansoppdrag.map((oppdrag) => (
                                <li key={oppdrag.id}>{oppdrag.navn}</li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </SummaryBlock>
    );
};

export default ArbeidssituasjonFrilansSummary;
