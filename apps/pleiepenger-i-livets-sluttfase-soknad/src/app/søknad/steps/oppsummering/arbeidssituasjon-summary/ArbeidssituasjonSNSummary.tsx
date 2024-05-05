import { useIntl } from 'react-intl';
import { SelvstendigNæringsdrivendeApiData } from '../../../../types/søknadApiData/SøknadApiData';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock } from '@navikt/sif-common-ui';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetSummary';
import { Label } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

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
                        <p>
                            <AppText id={'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN'} />
                        </p>
                    </li>
                </ul>
            )}
            {virksomhet && arbeidsforhold && (
                <>
                    <ul>
                        <li>
                            <AppText id="oppsummering.arbeidssituasjon.selvstendig.erSn" />
                        </li>
                        <li>
                            {virksomhet.harFlereAktiveVirksomheter ? (
                                <AppText id="oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter" />
                            ) : (
                                <AppText id="oppsummering.arbeidssituasjon.selvstendig.enVirksomhet" />
                            )}
                        </li>
                        {arbeidsforhold.jobberNormaltTimer && (
                            <>
                                <li>
                                    <AppText
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
