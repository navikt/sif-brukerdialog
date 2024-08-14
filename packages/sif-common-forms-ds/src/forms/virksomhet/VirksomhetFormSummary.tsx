import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { DatoSvar, JaNeiSvar, Sitat, TallSvar, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyApiDate } from '@navikt/sif-common-utils';
import { Næringstype, VirksomhetApiData } from './types';
import { useVirksomhetIntl, VirksomhetIntlShape } from './virksomhetMessages';
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

const renderVirksomhetSummary = (virksomhet: VirksomhetApiData, intl: VirksomhetIntlShape) => {
    const { text } = intl;
    const land = virksomhet.registrertIUtlandet ? virksomhet.registrertIUtlandet.landnavn : 'Norge';

    const næringstype =
        virksomhet.næringstype === Næringstype.FISKE && virksomhet.fiskerErPåBladB !== undefined
            ? getFiskerNæringTekst(intl, virksomhet.fiskerErPåBladB)
            : text(`@forms.virksomhet.næringstype_${virksomhet.næringstype}`);

    return (
        <>
            <FormSummary.Answer className="navds-form-summary__answer--compact">
                <FormSummary.Label>{text('@forms.virksomhet.summary.navn')}</FormSummary.Label>
                <FormSummary.Value>{virksomhet.navnPåVirksomheten}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer className="navds-form-summary__answer--compact">
                <FormSummary.Label>{text('@forms.virksomhet.summary.næringstype')}</FormSummary.Label>
                <FormSummary.Value>{næringstype}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer className="navds-form-summary__answer--compact">
                <FormSummary.Label>Land</FormSummary.Label>
                <FormSummary.Value>{land}</FormSummary.Value>
            </FormSummary.Answer>
            {virksomhet.registrertINorge && (
                <FormSummary.Answer className="navds-form-summary__answer--compact">
                    <FormSummary.Label>Organisasjonsnummer</FormSummary.Label>
                    <FormSummary.Value>{virksomhet.organisasjonsnummer}</FormSummary.Value>
                </FormSummary.Answer>
            )}
            <FormSummary.Answer className="navds-form-summary__answer--compact">
                <FormSummary.Label>Startet</FormSummary.Label>
                <FormSummary.Value>
                    {prettifyApiDate(virksomhet.fraOgMed)}
                    {!virksomhet.tilOgMed && <> (pågående)</>}
                </FormSummary.Value>
            </FormSummary.Answer>
            {virksomhet.tilOgMed && (
                <FormSummary.Answer className="navds-form-summary__answer--compact">
                    <FormSummary.Label>Avsluttet</FormSummary.Label>
                    <FormSummary.Value>{prettifyApiDate(virksomhet.tilOgMed)}</FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    );
};

const VirksomhetFormSummaryAnswers: React.FunctionComponent<Props> = ({ virksomhet, harFlereVirksomheter }) => {
    const virksomhetIntl = useVirksomhetIntl();
    const { text } = virksomhetIntl;
    const erRegnetSomNyoppstartet = erVirksomhetRegnetSomNyoppstartet(ISODateToDate(virksomhet.fraOgMed));

    return (
        <FormSummary.Answers>
            {renderVirksomhetSummary(virksomhet, virksomhetIntl)}

            {virksomhet.næringsinntekt !== undefined && (
                <FormSummary.Answer className="navds-form-summary__answer--compact">
                    <FormSummary.Label>
                        {harFlereVirksomheter
                            ? text('@forms.virksomhet.næringsinntekt.flereVirksomheter.spm')
                            : text('@forms.virksomhet.næringsinntekt.enVirksomhet.spm')}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <TallSvar verdi={virksomhet.næringsinntekt} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
            {erRegnetSomNyoppstartet === true && (
                <FormSummary.Answer className="navds-form-summary__answer--compact">
                    <FormSummary.Label>{text('@forms.virksomhet.har_blitt_yrkesaktiv')}</FormSummary.Label>
                    <FormSummary.Value>
                        {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene === undefined && (
                            <JaNeiSvar harSvartJa={virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined} />
                        )}
                        {virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene !== undefined &&
                            text('@forms.virksomhet.summary.yrkesaktiv.jaStartetDato', {
                                dato: prettifyApiDate(
                                    virksomhet.yrkesaktivSisteTreFerdigliknedeÅrene.oppstartsdato,
                                    true,
                                ),
                            })}
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
            {erRegnetSomNyoppstartet === false && (
                <>
                    <FormSummary.Answer className="navds-form-summary__answer--compact">
                        <FormSummary.Label>{text('@forms.virksomhet.varig_endring_spm')}</FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={virksomhet.varigEndring !== undefined} />
                        </FormSummary.Value>
                    </FormSummary.Answer>

                    {virksomhet.varigEndring && (
                        <>
                            <FormSummary.Answer className="navds-form-summary__answer--compact">
                                <FormSummary.Label>
                                    {text('@forms.virksomhet.summary.varigEndring.dato')}
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <DatoSvar isoDato={virksomhet.varigEndring.dato} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer className="navds-form-summary__answer--compact">
                                <FormSummary.Label>
                                    {text('@forms.virksomhet.summary.varigEndring.næringsinntekt')}
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <TallSvar verdi={virksomhet.varigEndring.inntektEtterEndring} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer className="navds-form-summary__answer--compact">
                                <FormSummary.Label>
                                    {text('@forms.virksomhet.summary.varigEndring.beskrivelse')}
                                </FormSummary.Label>
                                <FormSummary.Value className="fullWidth">
                                    <Sitat>
                                        <TextareaSvar text={virksomhet.varigEndring.forklaring} />
                                    </Sitat>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </>
                    )}
                </>
            )}
            {/* Regnskapsfører */}
            {virksomhet.registrertINorge && (
                <FormSummary.Answer className="navds-form-summary__answer--compact">
                    <FormSummary.Label>{text('@forms.virksomhet.regnskapsfører_spm')}</FormSummary.Label>
                    <FormSummary.Value>
                        {virksomhet.regnskapsfører === undefined && <JaNeiSvar harSvartJa={false} />}
                        {virksomhet.regnskapsfører !== undefined &&
                            text('@forms.virksomhet.summary.regnskapsfører.info', {
                                navn: virksomhet.regnskapsfører.navn,
                                telefon: virksomhet.regnskapsfører.telefon,
                            })}
                    </FormSummary.Value>
                </FormSummary.Answer>
            )}
        </FormSummary.Answers>
    );
};

export default VirksomhetFormSummaryAnswers;
