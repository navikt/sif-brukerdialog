import { FormSummary } from '@navikt/ds-react';
import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { HarKontonummerEnum, UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { JaNeiSvar } from '@sif/soknad-ui';

import { AppText } from '../../../i18n';
import { SøknadStepId } from '../../../setup/config/SoknadStepId';
import { useSøknadsflyt } from '../../../setup/hooks';

interface Props {
    kontonummerInfo: KontonummerInfo;
    kontoOppslagInfo: UtvidetKontonummerInfo;
}

export const KontonummerOppsummering = ({
    kontonummerInfo: { harKontonummer, kontonummerErRiktig },
    kontoOppslagInfo: utvidetInfo,
}: Props) => {
    const { navigateToStep } = useSøknadsflyt();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringSteg.kontonummer.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {harKontonummer === HarKontonummerEnum.JA && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText
                                id="kontonummerSteg.spørsmål.kontonummerErRiktig"
                                values={{ kontonummer: utvidetInfo.formatertKontonummer }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={kontonummerErRiktig === true} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {harKontonummer === HarKontonummerEnum.NEI && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tittel" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tekst" />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {harKontonummer === HarKontonummerEnum.UVISST && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummeringSteg.kontonummer.kontonummerInfoMangler.tittel" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <AppText id="oppsummeringSteg.kontonummer.kontonummerInfoMangler.tekst" />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.KONTONUMMER);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
