import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import TextareaSummary from '@navikt/sif-common-core/lib/components/textarea-summary/TextareaSummary';
import { apiStringDateToDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import DatoSvar, { prettifyApiDate } from '../components/summary/DatoSvar';
import IntlLabelValue from '../components/summary/IntlLabelValue';
import JaNeiSvar from '../components/summary/JaNeiSvar';
import Sitat from '../components/summary/Sitat';
import SummaryBlock from '../components/summary/SummaryBlock';
import TallSvar from '../components/summary/TallSvar';
import { Næringstype, VirksomhetApiData } from './types';
import { erVirksomhetRegnetSomNyoppstartet } from './virksomhetUtils';

interface Props {
    virksomhet: VirksomhetApiData;
    harFlereVirksomheter?: boolean;
}

const getFiskerNæringTekst = (intl: IntlShape, erPåBladB: boolean) => {
    const næringstekst = intlHelper(intl, `sifForms.virksomhet.næringstype_${Næringstype.FISKE}`);
    const bladBTekst = erPåBladB
        ? intlHelper(intl, 'sifForms.virksomhet.summary.fisker.påBladB')
        : intlHelper(intl, 'sifForms.virksomhet.summary.fisker.ikkePåBladB');
    return `${næringstekst} (${bladBTekst})`;
};

export const renderVirksomhetSummary = (virksomhet: VirksomhetApiData, intl: IntlShape) => {
    const land = virksomhet.registrertIUtlandet ? virksomhet.registrertIUtlandet.landnavn : 'Norge';

    const næringstyper = virksomhet.næringstyper
        .map((næring) =>
            næring === Næringstype.FISKE && virksomhet.fiskerErPåBladB !== undefined
                ? getFiskerNæringTekst(intl, virksomhet.fiskerErPåBladB)
                : intlHelper(intl, `sifForms.virksomhet.næringstype_${næring}`)
        )
        .join(', ');

    const tidsinfo = virksomhet.tilOgMed
        ? intlHelper(intl, 'sifForms.virksomhet.summary.tidsinfo.avsluttet', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
              tilOgMed: prettifyApiDate(virksomhet.tilOgMed),
          })
        : intlHelper(intl, 'sifForms.virksomhet.summary.tidsinfo.pågående', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
          });

    return (
        <>
            <IntlLabelValue labelKey="sifForms.virksomhet.summary.navn">
                {virksomhet.navnPåVirksomheten}.
            </IntlLabelValue>
            <IntlLabelValue labelKey="sifForms.virksomhet.summary.næringstype">{næringstyper}. </IntlLabelValue>
            <div>
                <FormattedMessage id="sifForms.virksomhet.summary.registrertILand" values={{ land }} />
                {virksomhet.registrertINorge && (
                    <FormattedMessage
                        id="sifForms.virksomhet.summary.registrertILand.orgnr"
                        values={{ orgnr: virksomhet.organisasjonsnummer }}
                    />
                )}
                . <br />
                {tidsinfo}
            </div>
        </>
    );
};

const VirksomhetSummary: React.FunctionComponent<Props> = ({ virksomhet, harFlereVirksomheter }) => {
    const intl = useIntl();
    const erRegnetSomNyoppstartet = erVirksomhetRegnetSomNyoppstartet(apiStringDateToDate(virksomhet.fraOgMed));

    return (
        <>
            {renderVirksomhetSummary(virksomhet, intl)}

            {virksomhet.næringsinntekt !== undefined && (
                <SummaryBlock
                    header={intlHelper(
                        intl,
                        harFlereVirksomheter
                            ? 'sifForms.virksomhet.næringsinntekt.flereVirksomheter.spm'
                            : 'sifForms.virksomhet.næringsinntekt.enVirksomhet.spm'
                    )}>
                    <FormattedMessage id="sifForms.virksomhet.summary.næringsinntekst" />
                    {` `}
                    <TallSvar verdi={virksomhet.næringsinntekt} />
                </SummaryBlock>
            )}

            {erRegnetSomNyoppstartet === true && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'sifForms.virksomhet.har_blitt_yrkesaktiv')}>
                        {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene === undefined && (
                            <JaNeiSvar harSvartJa={virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined} />
                        )}
                        {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined && (
                            <FormattedMessage
                                id="sifForms.virksomhet.summary.yrkesaktiv.jaStartetDato"
                                values={{
                                    dato: prettifyApiDate(
                                        virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene.oppstartsdato
                                    ),
                                }}
                            />
                        )}
                    </SummaryBlock>
                </>
            )}

            {erRegnetSomNyoppstartet === false && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'sifForms.virksomhet.varig_endring_spm')}>
                        <JaNeiSvar harSvartJa={virksomhet.varigEndring !== undefined} />
                    </SummaryBlock>
                    {virksomhet.varigEndring && (
                        <>
                            <SummaryBlock header={intlHelper(intl, 'sifForms.virksomhet.summary.varigEndring.dato')}>
                                <DatoSvar apiDato={virksomhet.varigEndring.dato} />
                            </SummaryBlock>
                            <SummaryBlock
                                header={intlHelper(intl, 'sifForms.virksomhet.summary.varigEndring.næringsinntekt')}>
                                <TallSvar verdi={virksomhet.varigEndring.inntektEtterEndring} />
                            </SummaryBlock>
                            <SummaryBlock
                                header={intlHelper(intl, 'sifForms.virksomhet.summary.varigEndring.beskrivelse')}>
                                <Sitat>
                                    <TextareaSummary text={virksomhet.varigEndring.forklaring} />
                                </Sitat>
                            </SummaryBlock>
                        </>
                    )}
                </>
            )}

            {/* Regnskapsfører */}
            {virksomhet.registrertINorge && (
                <SummaryBlock header={intlHelper(intl, 'sifForms.virksomhet.regnskapsfører_spm')}>
                    {virksomhet.regnskapsfører === undefined && <JaNeiSvar harSvartJa={false} />}
                    {virksomhet.regnskapsfører !== undefined && (
                        <FormattedMessage
                            id="sifForms.virksomhet.summary.regnskapsfører.info"
                            values={{
                                navn: virksomhet.regnskapsfører.navn,
                                telefon: virksomhet.regnskapsfører.telefon,
                            }}
                        />
                    )}
                </SummaryBlock>
            )}
        </>
    );
};

export default VirksomhetSummary;
