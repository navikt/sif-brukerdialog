import { FormattedMessage, useIntl } from 'react-intl';
import { SelvstendigNæringsdrivendeApiData } from '../../../../types/søknadApiData/SøknadApiData';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock } from '@navikt/sif-common-soknad-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetSummary';
import { Label } from '@navikt/ds-react';

interface Props {
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivendeApiData;
}

function ArbeidssituasjonSNSummary({ selvstendigNæringsdrivende }: Props) {
    const intl = useIntl();
    const { arbeidsforhold, virksomhet } = selvstendigNæringsdrivende || {};
    return (
        <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.selvstendig.header')}>
            {selvstendigNæringsdrivende === undefined && (
                <ul>
                    <li>
                        <FormattedMessage id={'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN'} tagName="p" />
                    </li>
                </ul>
            )}
            {virksomhet && arbeidsforhold && (
                <>
                    <ul>
                        <li>
                            <FormattedMessage id="oppsummering.arbeidssituasjon.selvstendig.erSn" />
                        </li>
                        <li>
                            {virksomhet.harFlereAktiveVirksomheter ? (
                                <FormattedMessage id="oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter" />
                            ) : (
                                <FormattedMessage id="oppsummering.arbeidssituasjon.selvstendig.enVirksomhet" />
                            )}
                        </li>
                        {arbeidsforhold.jobberNormaltTimer && (
                            <>
                                <li>
                                    <FormattedMessage
                                        id={`oppsummering.arbeidssituasjon.tid`}
                                        values={{ timer: arbeidsforhold.jobberNormaltTimer }}
                                    />
                                </li>
                            </>
                        )}
                    </ul>
                    <Label>{intlHelper(intl, 'summary.virksomhet.virksomhetInfo.tittel')}</Label>
                    <Block margin="m">
                        <div style={{ paddingLeft: '1rem' }}>
                            <VirksomhetSummary virksomhet={virksomhet} />
                        </div>
                    </Block>
                </>
            )}
        </SummaryBlock>
    );
}

export default ArbeidssituasjonSNSummary;
