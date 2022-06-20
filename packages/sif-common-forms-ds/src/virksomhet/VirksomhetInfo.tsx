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
import { VirksomhetApiData } from './types';
import { erVirksomhetRegnetSomNyoppstartet, harFiskerNæringstype } from './virksomhetUtils';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import Box from '@navikt/sif-common-core/lib/components/box/Box';

interface Props {
    virksomhet: VirksomhetApiData;
}

const renderVirksomhetSummary = (virksomhet: VirksomhetApiData, intl: IntlShape) => {
    const land = virksomhet.registrertIUtlandet ? virksomhet.registrertIUtlandet.landnavn : 'Norge';
    const næringstyper = virksomhet.næringstyper
        .map((næring) => intlHelper(intl, `sifForms.virksomhet.næringstype_${næring}`))
        .join(', ');
    const fiskerinfo =
        harFiskerNæringstype(virksomhet.næringstyper) && virksomhet.fiskerErPåBladB !== undefined
            ? {
                  erPåBladB: virksomhet.fiskerErPåBladB !== undefined && virksomhet.fiskerErPåBladB === true,
              }
            : undefined;

    const tidsinfo = virksomhet.tilOgMed
        ? intlHelper(intl, 'sifForms.virksomhet.summary.tidsinfo.avsluttet', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
              tilOgMed: prettifyApiDate(virksomhet.tilOgMed),
          })
        : intlHelper(intl, 'sifForms.virksomhet.summary.tidsinfo.pågående', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
          });

    return (
        <SummaryBlock header={virksomhet.navnPåVirksomheten} margin="none">
            <IntlLabelValue labelKey="sifForms.virksomhet.summary.næringstype">{næringstyper}. </IntlLabelValue>
            {fiskerinfo && (
                <div>
                    {fiskerinfo.erPåBladB === false ? (
                        <FormattedMessage id="sifForms.virksomhet.summary.fisker.ikkePåBladB" />
                    ) : (
                        <FormattedMessage id="sifForms.virksomhet.summary.fisker.påBladB" />
                    )}
                </div>
            )}

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
        </SummaryBlock>
    );
};

const VirksomhetSummary: React.FunctionComponent<Props> = ({ virksomhet }) => {
    const intl = useIntl();
    const erRegnetSomNyoppstartet = erVirksomhetRegnetSomNyoppstartet(apiStringDateToDate(virksomhet.fraOgMed));

    return (
        <>
            {renderVirksomhetSummary(virksomhet, intl)}
            <Box margin="m">
                <ExpandableInfo title="Vis flere detaljer" filledBackground={false}>
                    {virksomhet.næringsinntekt !== undefined && (
                        <SummaryBlock header={intlHelper(intl, 'sifForms.virksomhet.næringsinntekt')}>
                            <FormattedMessage id="sifForms.virksomhet.summary.næringsinntekst" />
                            {` `}
                            <TallSvar verdi={virksomhet.næringsinntekt} />
                        </SummaryBlock>
                    )}

                    {erRegnetSomNyoppstartet === true && (
                        <>
                            <SummaryBlock header={intlHelper(intl, 'sifForms.virksomhet.har_blitt_yrkesaktiv')}>
                                {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene === undefined && (
                                    <JaNeiSvar
                                        harSvartJa={virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined}
                                    />
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
                                    <SummaryBlock
                                        header={intlHelper(intl, 'sifForms.virksomhet.summary.varigEndring.dato')}>
                                        <DatoSvar apiDato={virksomhet.varigEndring.dato} />
                                    </SummaryBlock>
                                    <SummaryBlock
                                        header={intlHelper(
                                            intl,
                                            'sifForms.virksomhet.summary.varigEndring.næringsinntekt'
                                        )}>
                                        <TallSvar verdi={virksomhet.varigEndring.inntektEtterEndring} />
                                    </SummaryBlock>
                                    <SummaryBlock
                                        header={intlHelper(
                                            intl,
                                            'sifForms.virksomhet.summary.varigEndring.beskrivelse'
                                        )}>
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
                </ExpandableInfo>
            </Box>
        </>
    );
};

export default VirksomhetSummary;
