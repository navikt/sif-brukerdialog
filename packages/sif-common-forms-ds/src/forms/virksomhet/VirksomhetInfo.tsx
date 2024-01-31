import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DatoSvar, JaNeiSvar, Sitat, SummaryBlock, TallSvar, TextareaSvar } from '@navikt/sif-common-ui';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ISODateToDate, prettifyApiDate } from '@navikt/sif-common-utils';
// import DatoSvar, { prettifyApiDate } from '../../components/summary/DatoSvar';
import IntlLabelValue from '../../components/summary/IntlLabelValue';
import { Næringstype, VirksomhetApiData } from './types';
import { erVirksomhetRegnetSomNyoppstartet } from './virksomhetUtils';

interface Props {
    virksomhet: VirksomhetApiData;
}

const renderVirksomhetSummary = (virksomhet: VirksomhetApiData, intl: IntlShape) => {
    const land = virksomhet.registrertIUtlandet ? virksomhet.registrertIUtlandet.landnavn : 'Norge';
    const næringstype = intlHelper(intl, `sifForms.virksomhet.næringstype_${virksomhet.næringstype}`);

    const fiskerinfo =
        virksomhet.næringstype === Næringstype.FISKE && virksomhet.fiskerErPåBladB !== undefined
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
            <IntlLabelValue labelKey="sifForms.virksomhet.summary.næringstype">{næringstype}. </IntlLabelValue>
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
    const erRegnetSomNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISODateToDate(virksomhet.fraOgMed));

    return (
        <>
            {renderVirksomhetSummary(virksomhet, intl)}
            <Block margin="m">
                <ExpandableInfo title="Vis flere detaljer">
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
                                                virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene.oppstartsdato,
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
                                        <DatoSvar isoDato={virksomhet.varigEndring.dato} />
                                    </SummaryBlock>
                                    <SummaryBlock
                                        header={intlHelper(
                                            intl,
                                            'sifForms.virksomhet.summary.varigEndring.næringsinntekt',
                                        )}>
                                        <TallSvar verdi={virksomhet.varigEndring.inntektEtterEndring} />
                                    </SummaryBlock>
                                    <SummaryBlock
                                        header={intlHelper(
                                            intl,
                                            'sifForms.virksomhet.summary.varigEndring.beskrivelse',
                                        )}>
                                        <Sitat>
                                            <TextareaSvar text={virksomhet.varigEndring.forklaring} />
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
            </Block>
        </>
    );
};

export default VirksomhetSummary;
