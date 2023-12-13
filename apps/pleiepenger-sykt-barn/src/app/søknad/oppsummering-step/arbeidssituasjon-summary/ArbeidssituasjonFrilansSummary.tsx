import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad-ds/src/components/summary-block/SummaryBlock';
import { dateFormatter, DateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../types';
import { FrilansApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { Frilanstype } from '../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../utils/frilanserUtils';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';

interface Props {
    frilans: FrilansApiData;
    frilansoppdrag: Arbeidsgiver[];
    søknadsperiode: DateRange;
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag, søknadsperiode }: Props) => {
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

    if (frilans.type === Frilanstype.HONORAR && frilans._misterInntektSomFrilanser === false) {
        return (
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
                <ul data-testid="arbeidssituasjon-frilanser">
                    <li>
                        <FormattedMessage id={`oppsummering.arbeidssituasjon.frilans.HONORAR`} />
                    </li>
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.HONORAR.misterIkkeHonorar'} />
                    </li>
                </ul>
            </SummaryBlock>
        );
    }

    return (
        <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
            <ul data-testid="arbeidssituasjon-frilanser">
                <li>
                    <FormattedMessage id={`oppsummering.arbeidssituasjon.frilans.${frilans.type}`} />
                </li>

                {frilans.type === Frilanstype.HONORAR && frilans.misterHonorar === false && (
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.HONORAR.misterIkkeHonorar'} />
                    </li>
                )}
                {frilans.type === Frilanstype.HONORAR && frilans.misterHonorar === true && (
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.HONORAR.misterHonorar'} />
                    </li>
                )}
                <li>
                    <NormalarbeidstidSummary normalarbeidstidApiData={frilans.arbeidsforhold.normalarbeidstid} />
                </li>
                {frilans.startetFørSisteTreHeleMåneder ? (
                    <li>
                        <FormattedMessage
                            id="oppsummering.arbeidssituasjon.frilans.startetFørSisteTreHeleMåneder"
                            values={{
                                opptjeningStartdato: dateFormatter.full(getStartdatoForNySomFrilanser(søknadsperiode)),
                            }}
                        />
                    </li>
                ) : (
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
