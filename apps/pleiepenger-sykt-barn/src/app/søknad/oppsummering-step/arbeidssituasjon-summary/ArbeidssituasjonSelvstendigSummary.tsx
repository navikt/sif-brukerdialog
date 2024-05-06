import { Heading } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetSummary';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { AppText } from '../../../i18n';
import { SelvstendigApiData } from '../../../types/søknad-api-data/SøknadApiData';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';

interface Props {
    selvstendig: SelvstendigApiData;
}

function ArbeidssituasjonSelvstendigSummary({ selvstendig }: Props) {
    const { intl } = useAppIntl();
    return (
        <div data-testid="arbeidssituasjon-sn">
            <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.selvstendig.header')}>
                {selvstendig.harInntektSomSelvstendig === false && (
                    <ul>
                        <li>
                            <p>
                                <AppText id={'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN'} />
                            </p>
                        </li>
                    </ul>
                )}
                {selvstendig.harInntektSomSelvstendig && (
                    <>
                        <ul>
                            <li>
                                <AppText id="oppsummering.arbeidssituasjon.selvstendig.erSn" />
                            </li>
                            <li>
                                {selvstendig.virksomhet.harFlereAktiveVirksomheter ? (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter" />
                                ) : (
                                    <AppText id="oppsummering.arbeidssituasjon.selvstendig.enVirksomhet" />
                                )}
                            </li>
                            <li>
                                <NormalarbeidstidSummary
                                    normalarbeidstidApiData={selvstendig.arbeidsforhold.normalarbeidstid}
                                    erAnsatt={true}
                                />
                            </li>
                        </ul>
                        <Heading level="4" size="xsmall">
                            {intlHelper(intl, 'summary.virksomhet.virksomhetInfo.tittel')}
                        </Heading>
                        <Block margin="m">
                            <div style={{ paddingLeft: '1rem' }}>
                                <VirksomhetSummary virksomhet={selvstendig.virksomhet} />
                            </div>
                        </Block>
                    </>
                )}
            </SummaryBlock>
        </div>
    );
}

export default ArbeidssituasjonSelvstendigSummary;
