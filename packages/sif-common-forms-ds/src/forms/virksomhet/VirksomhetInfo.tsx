import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { DatoSvar, JaNeiSvar, Sitat, SummaryBlock, TallSvar, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyApiDate } from '@navikt/sif-common-utils';
import { Næringstype, VirksomhetApiData } from './types';
import { useVirksomhetIntl, VirksomhetIntlShape } from './virksomhetMessages';
import { erVirksomhetRegnetSomNyoppstartet } from './virksomhetUtils';

interface Props {
    virksomhet: VirksomhetApiData;
}

const renderVirksomhetSummary = (virksomhet: VirksomhetApiData, { text }: VirksomhetIntlShape) => {
    const land = virksomhet.registrertIUtlandet ? virksomhet.registrertIUtlandet.landnavn : 'Norge';
    const næringstype = text(`@forms.virksomhet.næringstype_${virksomhet.næringstype}`);

    const fiskerinfo =
        virksomhet.næringstype === Næringstype.FISKE && virksomhet.fiskerErPåBladB !== undefined
            ? {
                  erPåBladB: virksomhet.fiskerErPåBladB !== undefined && virksomhet.fiskerErPåBladB === true,
              }
            : undefined;

    const tidsinfo = virksomhet.tilOgMed
        ? text('@forms.virksomhet.summary.tidsinfo.avsluttet', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
              tilOgMed: prettifyApiDate(virksomhet.tilOgMed),
          })
        : text('@forms.virksomhet.summary.tidsinfo.pågående', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
          });

    return (
        <SummaryBlock header={virksomhet.navnPåVirksomheten} margin="none">
            <Block margin="m">
                {text('@forms.virksomhet.summary.næringstype')}: {næringstype}.
            </Block>
            {fiskerinfo && (
                <div>
                    {fiskerinfo.erPåBladB === false ? (
                        <FormattedMessage id="@forms.virksomhet.summary.fisker.ikkePåBladB" />
                    ) : (
                        <FormattedMessage id="@forms.virksomhet.summary.fisker.påBladB" />
                    )}
                </div>
            )}

            <div>
                <FormattedMessage id="@forms.virksomhet.summary.registrertILand" values={{ land }} />
                {virksomhet.registrertINorge && (
                    <FormattedMessage
                        id="@forms.virksomhet.summary.registrertILand.orgnr"
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
    const virksomhetIntl = useVirksomhetIntl();
    const { text } = virksomhetIntl;
    const erRegnetSomNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISODateToDate(virksomhet.fraOgMed));

    return (
        <>
            {renderVirksomhetSummary(virksomhet, virksomhetIntl)}
            <Block margin="m">
                <ExpandableInfo title="Vis flere detaljer">
                    {virksomhet.næringsinntekt !== undefined && (
                        <SummaryBlock header={text('@forms.virksomhet.næringsinntekt')}>
                            <FormattedMessage id="@forms.virksomhet.summary.næringsinntekst" />
                            {` `}
                            <TallSvar verdi={virksomhet.næringsinntekt} />
                        </SummaryBlock>
                    )}

                    {erRegnetSomNyoppstartet === true && (
                        <>
                            <SummaryBlock header={text('@forms.virksomhet.har_blitt_yrkesaktiv')}>
                                {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene === undefined && (
                                    <JaNeiSvar
                                        harSvartJa={virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined}
                                    />
                                )}
                                {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined && (
                                    <FormattedMessage
                                        id="@forms.virksomhet.summary.yrkesaktiv.jaStartetDato"
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
                            <SummaryBlock header={text('@forms.virksomhet.varig_endring_spm')}>
                                <JaNeiSvar harSvartJa={virksomhet.varigEndring !== undefined} />
                            </SummaryBlock>
                            {virksomhet.varigEndring && (
                                <>
                                    <SummaryBlock header={text('@forms.virksomhet.summary.varigEndring.dato')}>
                                        <DatoSvar isoDato={virksomhet.varigEndring.dato} />
                                    </SummaryBlock>
                                    <SummaryBlock
                                        header={text('@forms.virksomhet.summary.varigEndring.næringsinntekt')}>
                                        <TallSvar verdi={virksomhet.varigEndring.inntektEtterEndring} />
                                    </SummaryBlock>
                                    <SummaryBlock header={text('@forms.virksomhet.summary.varigEndring.beskrivelse')}>
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
                        <SummaryBlock header={text('@forms.virksomhet.regnskapsfører_spm')}>
                            {virksomhet.regnskapsfører === undefined && <JaNeiSvar harSvartJa={false} />}
                            {virksomhet.regnskapsfører !== undefined && (
                                <FormattedMessage
                                    id="@forms.virksomhet.summary.regnskapsfører.info"
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
