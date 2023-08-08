import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/components/summary-block/SummaryBlock';
import { Arbeidsgiver } from '../../../types';
import { FrilansApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { Frilanstype } from '../../../types/FrilansFormData';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';
import { ISODateToDate, dateFormatter } from '@navikt/sif-common-utils/lib';

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

    if (frilans.type === Frilanstype.HONORAR && frilans.misterInntektSomFrilanser === false) {
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
                <li>
                    <FormattedMessage
                        id="oppsummering.arbeidssituasjon.frilans.startet"
                        values={{ dato: dateFormatter.full(ISODateToDate(frilans.startdato)) }}
                    />
                </li>

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
