import { VStack } from '@navikt/ds-react';
import { JaNeiSvar, useUiIntl } from '@navikt/sif-common-ui';
import { getCountryName, prettifyDate } from '@navikt/sif-common-utils';
import { YesOrNo } from '@sif/rhf';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Næringstype, Virksomhet } from './types';
import { VirksomhetSummaryBlock } from './VirksomhetSummaryBlock';
import { erFiskerNæringstype, erVirksomhetRegnetSomNyoppstartet } from './virksomhetUtils';

interface Props {
    virksomhet: Virksomhet;
    harFlereVirksomheter?: boolean;
}

export const VirksomhetSummary = ({ virksomhet, harFlereVirksomheter }: Props) => {
    const sifIntl = useSifSoknadFormsIntl();
    const { locale } = useUiIntl();
    const { text } = sifIntl;
    const erNyoppstartet = erVirksomhetRegnetSomNyoppstartet(virksomhet.fom);

    const land = virksomhet.registrertILand
        ? getCountryName(virksomhet.registrertILand, locale)
        : getCountryName('NO', locale);

    const getNæringstypeLabel = () => {
        if (erFiskerNæringstype(virksomhet.næringstype) && virksomhet.fiskerErPåBladB !== undefined) {
            const næringstekst = text(`@sifSoknadForms.virksomhet.form.næringstype.${Næringstype.FISKE}`);
            const bladBTekst =
                virksomhet.fiskerErPåBladB === YesOrNo.YES
                    ? text('@sifSoknadForms.virksomhet.summary.fisker.påBladB')
                    : text('@sifSoknadForms.virksomhet.summary.fisker.ikkePåBladB');
            return `${næringstekst} (${bladBTekst})`;
        }
        return text(`@sifSoknadForms.virksomhet.form.næringstype.${virksomhet.næringstype}`);
    };

    return (
        <VStack gap="space-8">
            <div>
                {text('@sifSoknadForms.virksomhet.summary.navn')}: {virksomhet.navnPåVirksomheten}.
            </div>
            <div>
                {text('@sifSoknadForms.virksomhet.summary.næringstype')}: {getNæringstypeLabel()}.
            </div>
            <div>
                {text('@sifSoknadForms.virksomhet.summary.land')}: {land}
                {virksomhet.registrertINorge === YesOrNo.YES && virksomhet.organisasjonsnummer
                    ? ` (org.nr. ${virksomhet.organisasjonsnummer})`
                    : ''}
                .
            </div>
            <div>
                {text('@sifSoknadForms.virksomhet.summary.startet')}: {prettifyDate(virksomhet.fom)}
                {!virksomhet.tom && ` (${text('@sifSoknadForms.virksomhet.summary.pågående')})`}
            </div>
            {virksomhet.tom && (
                <div>
                    {text('@sifSoknadForms.virksomhet.summary.avsluttet')}: {prettifyDate(virksomhet.tom)}
                </div>
            )}

            {erNyoppstartet && virksomhet.næringsinntekt !== undefined && (
                <VirksomhetSummaryBlock
                    header={
                        harFlereVirksomheter
                            ? text('@sifSoknadForms.virksomhet.form.næringsinntekt.flereVirksomheter.label')
                            : text('@sifSoknadForms.virksomhet.form.næringsinntekt.label')
                    }>
                    {virksomhet.næringsinntekt.toLocaleString()}
                </VirksomhetSummaryBlock>
            )}

            {erNyoppstartet && virksomhet.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene !== undefined && (
                <>
                    <VirksomhetSummaryBlock header={text('@sifSoknadForms.virksomhet.form.harBlittYrkesaktiv.legend')}>
                        <JaNeiSvar
                            harSvartJa={
                                virksomhet.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === YesOrNo.YES
                            }
                        />
                    </VirksomhetSummaryBlock>
                    {virksomhet.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === YesOrNo.YES &&
                        virksomhet.blittYrkesaktivDato && (
                            <VirksomhetSummaryBlock
                                header={text('@sifSoknadForms.virksomhet.form.blittYrkesaktivDato.label')}>
                                {prettifyDate(virksomhet.blittYrkesaktivDato)}
                            </VirksomhetSummaryBlock>
                        )}
                </>
            )}

            {!erNyoppstartet && virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined && (
                <>
                    <VirksomhetSummaryBlock header={text('@sifSoknadForms.virksomhet.form.varigEndring.legend')}>
                        <JaNeiSvar
                            harSvartJa={virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES}
                        />
                    </VirksomhetSummaryBlock>
                    {virksomhet.varigEndringINæringsinntekt_dato && (
                        <>
                            <VirksomhetSummaryBlock
                                header={text('@sifSoknadForms.virksomhet.form.varigEndring.dato.label')}>
                                {prettifyDate(virksomhet.varigEndringINæringsinntekt_dato)}
                            </VirksomhetSummaryBlock>
                            {virksomhet.varigEndringINæringsinntekt_inntektEtterEndring !== undefined && (
                                <VirksomhetSummaryBlock
                                    header={text('@sifSoknadForms.virksomhet.form.varigEndring.inntekt.label')}>
                                    {virksomhet.varigEndringINæringsinntekt_inntektEtterEndring.toLocaleString()}
                                </VirksomhetSummaryBlock>
                            )}
                            {virksomhet.varigEndringINæringsinntekt_forklaring && (
                                <VirksomhetSummaryBlock
                                    header={text('@sifSoknadForms.virksomhet.form.varigEndring.forklaring.label')}>
                                    {virksomhet.varigEndringINæringsinntekt_forklaring}
                                </VirksomhetSummaryBlock>
                            )}
                        </>
                    )}
                </>
            )}

            {virksomhet.registrertINorge === YesOrNo.YES && (
                <VirksomhetSummaryBlock header={text('@sifSoknadForms.virksomhet.form.harRegnskapsfører.legend')}>
                    {virksomhet.harRegnskapsfører === YesOrNo.YES && virksomhet.regnskapsfører_navn ? (
                        `${virksomhet.regnskapsfører_navn}, tlf. ${virksomhet.regnskapsfører_telefon}`
                    ) : (
                        <JaNeiSvar harSvartJa={false} />
                    )}
                </VirksomhetSummaryBlock>
            )}
        </VStack>
    );
};
