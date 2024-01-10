import { FormattedMessage, useIntl } from 'react-intl';
import { FrilansApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock } from '@navikt/sif-common-soknad-ds';
import { prettifyApiDate } from '@navikt/sif-common-soknad-ds/src/components/summary-answers/DatoSvar';

interface Props {
    frilans?: FrilansApiData;
    frilansoppdrag?: Arbeidsgiver[];
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag }: Props) => {
    const intl = useIntl();
    if (frilans === undefined) {
        return (
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.frilanser.header')}>
                <ul>
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
                {frilans.harHattInntektSomFrilanser === false && (
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                    </li>
                )}

                <li>
                    <FormattedMessage
                        id="oppsummering.arbeidssituasjon.frilans.startet"
                        values={{ dato: prettifyApiDate(frilans.startdato) }}
                    />
                </li>
                {frilans.sluttdato && (
                    <li>
                        <FormattedMessage
                            id="oppsummering.arbeidssituasjon.frilans.sluttet"
                            values={{ dato: prettifyApiDate(frilans.sluttdato) }}
                        />
                    </li>
                )}
                {frilans.jobberFortsattSomFrilans && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidssituasjon.frilans.fortsattFrilanser" />
                    </li>
                )}
                {frilans.arbeidsforhold && (
                    <>
                        <li>
                            <FormattedMessage
                                id={`oppsummering.arbeidssituasjon.tid`}
                                values={{ timer: frilans.arbeidsforhold.jobberNormaltTimer }}
                            />
                        </li>
                    </>
                )}
                {/* Hvis bruker fortsatt er frilanser i perioden (arbeidsforhold finnes), og har frilansoppdrag */}
                {frilans.arbeidsforhold && frilansoppdrag && frilansoppdrag.length > 0 && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidssituasjon.frilans.frilansoppdrag" />
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
