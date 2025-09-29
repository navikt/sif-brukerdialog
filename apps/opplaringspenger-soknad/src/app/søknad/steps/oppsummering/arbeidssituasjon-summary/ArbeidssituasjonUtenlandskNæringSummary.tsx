import { FormSummary, Heading, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import React from 'react';
import { SummaryList } from '@navikt/sif-common-ui';
import { prettifyApiDate } from '@navikt/sif-common-utils';
import { AppIntlShape, AppText, useAppIntl } from '../../../../i18n';
import { UtenlandskNæringApi } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    utenlandskNæring: UtenlandskNæringApi[];
}

const renderUtenlandskNæring = (næring: UtenlandskNæringApi, { text }: AppIntlShape): React.ReactNode => {
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
        <div key={næring.navnPåVirksomheten}>
            <div>{`${text('@forms.utenlandskNæringForm.summary.næringstype')}: ${næringstype}`}</div>
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
            </div>
            <div>{tidsinfo}</div>
        </div>
    );
};

function UtenlandskNæringSummary({ utenlandskNæring }: Props) {
    const appIntl = useAppIntl();
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="oppsummering.arbeidssituasjon.utenlandskNæring.tittel" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            {utenlandskNæring.length === 0 ? (
                                <AppText id="oppsummering.arbeidssituasjon.utenlandskNæring.nei" />
                            ) : (
                                <AppText id="oppsummering.arbeidssituasjon.utenlandskNæring.ja" />
                            )}
                        </List.Item>
                        {utenlandskNæring.length > 0 && (
                            <ListItem
                                title={appIntl.text(
                                    utenlandskNæring.length === 1
                                        ? 'oppsummering.arbeidssituasjon.utenlandskNæring.næring'
                                        : 'oppsummering.arbeidssituasjon.utenlandskNæring.næringer',
                                )}>
                                <SummaryList
                                    items={utenlandskNæring}
                                    variant="blocks"
                                    itemTitleRenderer={(næring: UtenlandskNæringApi) =>
                                        `${appIntl.text('@forms.utenlandskNæringForm.summary.navn')}: ${næring.navnPåVirksomheten}`
                                    }
                                    itemRenderer={(næring: UtenlandskNæringApi) =>
                                        renderUtenlandskNæring(næring, appIntl)
                                    }
                                />
                            </ListItem>
                        )}
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
}

export default UtenlandskNæringSummary;
