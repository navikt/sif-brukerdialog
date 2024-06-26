import React from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { UtenlandskNæringApiData } from '../../../types/søknad-api-data/SøknadApiData';

interface Props {
    utenlandskNæring: UtenlandskNæringApiData[];
}

function UtenlandskNæringSummary({ utenlandskNæring }: Props) {
    const { text } = useAppIntl();
    const renderUtenlandskNæring = (næring: UtenlandskNæringApiData): React.ReactNode => {
        const land = næring.land.landnavn;

        const næringstype = text(`@forms.utenlandskNæringForm.næringstype_${næring.næringstype}`);

        const tidsinfo = næring.tilOgMed
            ? text('@forms.utenlandskNæringForm.summary.tidsinfo.avsluttet', {
                  fraOgMed: prettifyDate(ISODateToDate(næring.fraOgMed)),
                  tilOgMed: prettifyDate(ISODateToDate(næring.tilOgMed)),
              })
            : text('@forms.utenlandskNæringForm.summary.tidsinfo.pågående', {
                  fraOgMed: prettifyDate(ISODateToDate(næring.fraOgMed)),
              });
        return (
            <li key={næring.navnPåVirksomheten}>
                <Block margin="m" padBottom="l">
                    <div data-testid="oppsummering-utenlandskNæring-navn">
                        {`${text('@forms.utenlandskNæringForm.summary.navn')}: ${næring.navnPåVirksomheten}.`}
                    </div>
                    <div data-testid="oppsummering-utenlandskNæring-næringstype">
                        {`${text('@forms.utenlandskNæringForm.summary.næringstype')}: ${næringstype}.`}
                    </div>

                    <div data-testid="oppsummering-utenlandskNæring-registrertILand">
                        <AppText id="@forms.utenlandskNæringForm.summary.registrertILand" values={{ land }} />
                        {næring.organisasjonsnummer !== undefined && (
                            <AppText
                                id="@forms.utenlandskNæringForm.summary.registrertILand.orgnr"
                                values={{ orgnr: næring.organisasjonsnummer }}
                            />
                        )}
                        .
                    </div>
                    <div data-testid="oppsummering-utenlandskNæring-tidsinfo">{tidsinfo}</div>
                </Block>
            </li>
        );
    };
    return (
        <div data-testid="arbeidssituasjon-utenlandskNæring">
            <SummaryBlock header={text('oppsummering.arbeidssituasjon.utenlandskNæring.listetittel')}>
                {utenlandskNæring.length === 0 && (
                    <p data-testid={'arbeidssituasjon-harUtenlandskNæringSvar'}>
                        {text('oppsummering.arbeidssituasjon.utenlandskNæring.nei')}
                    </p>
                )}
                {utenlandskNæring.length > 0 && (
                    <ul>{utenlandskNæring.map((næring) => renderUtenlandskNæring(næring))}</ul>
                )}
            </SummaryBlock>
        </div>
    );
}

export default UtenlandskNæringSummary;
