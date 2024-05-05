import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock, SummaryList } from '@navikt/sif-common-ui';
import { prettifyApiDate } from '@navikt/sif-common-utils';
import { UtenlandskNæringApi } from '../../../../types/søknadApiData/SøknadApiData';
import { AppText } from '../../../../i18n';

interface Props {
    utenlandskNæring: UtenlandskNæringApi[];
}

function UtenlandskNæringSummary({ utenlandskNæring }: Props) {
    const intl = useIntl();
    const renderUtenlandskNæring = (næring: UtenlandskNæringApi): React.ReactNode => {
        const land = næring.land.landnavn;

        const næringstype = intlHelper(intl, `@forms.utenlandskNæringForm.næringstype_${næring.næringstype}`);

        const tidsinfo = næring.tilOgMed
            ? intlHelper(intl, '@forms.utenlandskNæringForm.summary.tidsinfo.avsluttet', {
                  fraOgMed: prettifyApiDate(næring.fraOgMed),
                  tilOgMed: prettifyApiDate(næring.tilOgMed),
              })
            : intlHelper(intl, '@forms.utenlandskNæringForm.summary.tidsinfo.pågående', {
                  fraOgMed: prettifyApiDate(næring.fraOgMed),
              });
        return (
            <Block margin="m" padBottom="l" key={næring.navnPåVirksomheten}>
                <div>
                    {`${intlHelper(intl, '@forms.utenlandskNæringForm.summary.navn')}: ${næring.navnPåVirksomheten}.`}
                </div>
                <div>{`${intlHelper(intl, '@forms.utenlandskNæringForm.summary.næringstype')}: ${næringstype}.`}</div>

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
        <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.utenlandskNæring.listetittel')}>
            {utenlandskNæring.length === 0 ? (
                <AppText id={'oppsummering.arbeidssituasjon.utenlandskNæring.nei'} />
            ) : (
                <SummaryList items={utenlandskNæring} itemRenderer={renderUtenlandskNæring} />
            )}
        </SummaryBlock>
    );
}

export default UtenlandskNæringSummary;
