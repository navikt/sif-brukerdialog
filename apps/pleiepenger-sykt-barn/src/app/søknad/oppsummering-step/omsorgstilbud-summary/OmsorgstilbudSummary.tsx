import { Box, FormSummary } from '@navikt/ds-react';
import React from 'react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { DateRange, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import TidEnkeltdager from '../../../local-sif-common-pleiepenger/components/dager-med-tid/TidEnkeltdager';
import TidFasteDager from '../../../local-sif-common-pleiepenger/components/dager-med-tid/TidFasteDager';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { søkerFortidOgFremtid, søkerKunFortid, søkerKunFremtid } from '../../../utils/søknadsperiodeUtils';

interface Props {
    søknadsperiode: DateRange;
    apiValues: SøknadApiData;
    onEdit?: () => void;
}

const OmsorgstilbudSummary: React.FC<Props> = ({ apiValues: { omsorgstilbud }, søknadsperiode, onEdit }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText
                        id="steg.oppsummering.omsorgstilbud.header"
                        values={{
                            fra: prettifyDateExtended(søknadsperiode.from),
                            til: prettifyDateExtended(søknadsperiode.to),
                        }}
                    />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                {omsorgstilbud === undefined && (
                    <>
                        {(søkerKunFortid(søknadsperiode) || søkerFortidOgFremtid(søknadsperiode)) && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="steg.oppsummering.omsorgstilbud.fortid.spm" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText id={`steg.oppsummering.omsorgstilbud.fortid.svar.NEI`} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                        {(søkerKunFremtid(søknadsperiode) || søkerFortidOgFremtid(søknadsperiode)) && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText
                                        id={
                                            søkerFortidOgFremtid(søknadsperiode)
                                                ? 'steg.oppsummering.omsorgstilbud.fremtid.spm'
                                                : 'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid'
                                        }
                                    />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <AppText id={`steg.oppsummering.omsorgstilbud.fremtid.svar.NEI`} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.svarFortid && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.omsorgstilbud.fortid.spm" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText id={`steg.oppsummering.omsorgstilbud.fortid.svar.${omsorgstilbud.svarFortid}`} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.svarFremtid && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText
                                id={
                                    søkerFortidOgFremtid(søknadsperiode)
                                        ? 'steg.oppsummering.omsorgstilbud.fremtid.spm'
                                        : 'steg.oppsummering.omsorgstilbud.fremtid.spm.kunFremtid'
                                }
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText id={`steg.oppsummering.omsorgstilbud.fremtid.svar.${omsorgstilbud.svarFremtid}`} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.ukedager && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText
                                id={
                                    søkerKunFortid(søknadsperiode)
                                        ? 'steg.oppsummering.omsorgstilbud.fast.header.fortid'
                                        : 'steg.oppsummering.omsorgstilbud.fast.header'
                                }
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <TidFasteDager fasteDager={omsorgstilbud.ukedager} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {omsorgstilbud !== undefined && omsorgstilbud.enkeltdager && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="steg.oppsummering.omsorgstilbud.enkeltdager.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <Box marginBlock="6 0">
                                <TidEnkeltdager dager={omsorgstilbud.enkeltdager} />
                            </Box>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmsorgstilbudSummary;
