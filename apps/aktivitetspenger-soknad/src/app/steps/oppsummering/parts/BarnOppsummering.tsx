import { BodyShort, FormSummary, List } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-utils';
import { JaNeiSvar } from '@sif/soknad-ui';

import { AppText } from '../../../i18n';
import { SøknadStepId } from '../../../setup/config/SoknadStepId';
import { useSøknadsflyt } from '../../../setup/hooks';

interface Props {
    barnErRiktig: boolean;
    barn: RegistrertBarn[];
}

export const BarnOppsummering = ({ barnErRiktig, barn }: Props) => {
    const { navigateToStep } = useSøknadsflyt();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringSteg.barn.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="barnSteg.registrerteBarn.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {barn.length > 0 ? (
                            <List>
                                {barn.map((b) => (
                                    <List.Item key={b.aktørId}>{formatName(b)}</List.Item>
                                ))}
                            </List>
                        ) : (
                            <BodyShort>
                                <AppText id="barnSteg.barnInfo.ingenBarn" />
                            </BodyShort>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText
                            id={barn.length === 0 ? 'barnSteg.spørsmål.ingenBarn' : 'barnSteg.spørsmål.harBarn'}
                            values={{
                                antallBarn: barn.length,
                            }}
                        />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={barnErRiktig} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.BARN);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
