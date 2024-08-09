import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SummaryList } from '@navikt/sif-common-ui';
import { prettifyApiDate } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../i18n';
import { UtenlandskNæringApi } from '../../../../types/søknadApiData/SøknadApiData';
import { FormSummary } from '@navikt/ds-react';

interface Props {
    utenlandskNæring: UtenlandskNæringApi[];
}

function UtenlandskNæringSummary({ utenlandskNæring }: Props) {
    const { text } = useAppIntl();
    const renderUtenlandskNæring = (næring: UtenlandskNæringApi): React.ReactNode => {
        const land = næring.land.landnavn;

        const næringstype = text(`@forms.utenlandskNæringForm.næringstype_${næring.næringstype}`);

        const tidsinfo = næring.tilOgMed
            ? text('@forms.utenlandskNæringForm.summary.tidsinfo.avsluttet', {
                  fraOgMed: prettifyApiDate(næring.fraOgMed),
                  tilOgMed: prettifyApiDate(næring.tilOgMed),
              })
            : text('@forms.utenlandskNæringForm.summary.tidsinfo.pågående', {
                  fraOgMed: prettifyApiDate(næring.fraOgMed),
              });
        return (
            <Block margin="m" padBottom="l" key={næring.navnPåVirksomheten}>
                <div>{`${text('@forms.utenlandskNæringForm.summary.navn')}: ${næring.navnPåVirksomheten}.`}</div>
                <div>{`${text('@forms.utenlandskNæringForm.summary.næringstype')}: ${næringstype}.`}</div>

                <div>
                    <AppText id="@forms.utenlandskNæringForm.summary.registrertILand" values={{ land }} />
                    {næring.organisasjonsnummer !== undefined && (
                        <>
                            <AppText
                                id="@forms.utenlandskNæringForm.summary.registrertILand.orgnr"
                                values={{ orgnr: næring.organisasjonsnummer }}
                            />
                        </>
                    )}
                    .
                </div>
                <div>{tidsinfo}</div>
            </Block>
        );
    };
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="oppsummering.arbeidssituasjon.utenlandskNæring.listetittel" />
            </FormSummary.Label>
            <FormSummary.Value>
                {utenlandskNæring.length === 0 ? (
                    <AppText id={'oppsummering.arbeidssituasjon.utenlandskNæring.nei'} />
                ) : (
                    <SummaryList items={utenlandskNæring} itemRenderer={renderUtenlandskNæring} />
                )}
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

export default UtenlandskNæringSummary;
