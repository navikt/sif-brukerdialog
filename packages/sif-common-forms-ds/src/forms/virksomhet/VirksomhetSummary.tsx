import { VStack } from '@navikt/ds-react';
import { DatoSvar, JaNeiSvar, Sitat, TallSvar, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyApiDate } from '@navikt/sif-common-utils';
import { FormattedMessage } from 'react-intl';

import { useVirksomhetIntl, VirksomhetIntlShape } from './i18n';
import SummaryBlock from './SummaryBlock';
import { Næringstype, VirksomhetApiData } from './types';
import { erVirksomhetRegnetSomNyoppstartet } from './virksomhetUtils';

interface Props {
    virksomhet: VirksomhetApiData;
    harFlereVirksomheter?: boolean;
}

const getFiskerNæringTekst = ({ text }: VirksomhetIntlShape, erPåBladB: boolean) => {
    const næringstekst = text(`@forms.virksomhet.næringstype_${Næringstype.FISKE}`);
    const bladBTekst = erPåBladB
        ? text('@forms.virksomhet.summary.fisker.påBladB')
        : text('@forms.virksomhet.summary.fisker.ikkePåBladB');
    return `${næringstekst} (${bladBTekst})`;
};

export const renderVirksomhetSummary = (virksomhet: VirksomhetApiData, intl: VirksomhetIntlShape) => {
    const { text } = intl;
    const land = virksomhet.registrertIUtlandet ? virksomhet.registrertIUtlandet.landnavn : 'Norge';

    const næringstype =
        virksomhet.næringstype === Næringstype.FISKE && virksomhet.fiskerErPåBladB !== undefined
            ? getFiskerNæringTekst(intl, virksomhet.fiskerErPåBladB)
            : text(`@forms.virksomhet.næringstype_${virksomhet.næringstype}`);

    const tidsinfo = virksomhet.tilOgMed
        ? text('@forms.virksomhet.summary.tidsinfo.avsluttet', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
              tilOgMed: prettifyApiDate(virksomhet.tilOgMed),
          })
        : text('@forms.virksomhet.summary.tidsinfo.pågående', {
              fraOgMed: prettifyApiDate(virksomhet.fraOgMed),
          });

    return (
        <VStack gap="4">
            <div>
                {text('@forms.virksomhet.summary.navn')}: {virksomhet.navnPåVirksomheten}.
            </div>
            <div>
                {text('@forms.virksomhet.summary.næringstype')}: {næringstype}.
            </div>
            <div>
                {text('@forms.virksomhet.summary.registrertILand', { land })}
                {virksomhet.registrertINorge && (
                    <FormattedMessage
                        id="@forms.virksomhet.summary.registrertILand.orgnr"
                        values={{ orgnr: virksomhet.organisasjonsnummer }}
                    />
                )}
                .
            </div>
            <div>{tidsinfo}</div>
        </VStack>
    );
};

const VirksomhetSummary = ({ virksomhet, harFlereVirksomheter }: Props) => {
    const virksomhetIntl = useVirksomhetIntl();
    const { text } = virksomhetIntl;
    const erRegnetSomNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISODateToDate(virksomhet.fraOgMed));

    return (
        <VStack gap="6">
            {renderVirksomhetSummary(virksomhet, virksomhetIntl)}
            {virksomhet.næringsinntekt !== undefined && (
                <SummaryBlock
                    level="2"
                    header={
                        harFlereVirksomheter
                            ? text('@forms.virksomhet.næringsinntekt.flereVirksomheter.spm')
                            : text('@forms.virksomhet.næringsinntekt.enVirksomhet.spm')
                    }>
                    {text('@forms.virksomhet.summary.næringsinntekst')}
                    {` `}
                    <TallSvar verdi={virksomhet.næringsinntekt} />
                </SummaryBlock>
            )}
            {erRegnetSomNyoppstartet === true && (
                <SummaryBlock level="2" header={text('@forms.virksomhet.har_blitt_yrkesaktiv')}>
                    {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene === undefined && (
                        <JaNeiSvar harSvartJa={virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined} />
                    )}
                    {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined &&
                        text('@forms.virksomhet.summary.yrkesaktiv.jaStartetDato', {
                            dato: prettifyApiDate(virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene.oppstartsdato, true),
                        })}
                </SummaryBlock>
            )}
            {erRegnetSomNyoppstartet === false && (
                <>
                    <SummaryBlock level="2" header={text('@forms.virksomhet.varig_endring_spm')}>
                        <JaNeiSvar harSvartJa={virksomhet.varigEndring !== undefined} />
                    </SummaryBlock>
                    {virksomhet.varigEndring && (
                        <>
                            <SummaryBlock level="2" header={text('@forms.virksomhet.summary.varigEndring.dato')}>
                                <DatoSvar isoDato={virksomhet.varigEndring.dato} />
                            </SummaryBlock>
                            <SummaryBlock
                                level="2"
                                header={text('@forms.virksomhet.summary.varigEndring.næringsinntekt')}>
                                <TallSvar verdi={virksomhet.varigEndring.inntektEtterEndring} />
                            </SummaryBlock>
                            <SummaryBlock level="2" header={text('@forms.virksomhet.summary.varigEndring.beskrivelse')}>
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
                <SummaryBlock level="2" header={text('@forms.virksomhet.regnskapsfører_spm')}>
                    {virksomhet.regnskapsfører === undefined && <JaNeiSvar harSvartJa={false} />}
                    {virksomhet.regnskapsfører !== undefined &&
                        text('@forms.virksomhet.summary.regnskapsfører.info', {
                            navn: virksomhet.regnskapsfører.navn,
                            telefon: virksomhet.regnskapsfører.telefon,
                        })}
                </SummaryBlock>
            )}
        </VStack>
    );
};

export default VirksomhetSummary;
