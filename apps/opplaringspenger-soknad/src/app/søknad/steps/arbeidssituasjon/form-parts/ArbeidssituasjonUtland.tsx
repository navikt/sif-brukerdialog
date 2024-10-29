import { Heading, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../../../i18n';
import { FormLayout } from '@navikt/sif-common-ui';
import { FormikYesOrNoQuestion, YesOrNo } from '@navikt/sif-common-formik-ds';
import { ArbeidssituasjonFormFields } from '../ArbeidssituasjonStep';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';

interface Props {
    harOpptjeningUtland?: YesOrNo;
    harUtenlandskNæring?: YesOrNo;
}

export const ArbeidssituasjonUtland = ({ harOpptjeningUtland, harUtenlandskNæring }: Props) => {
    const { text } = useAppIntl();
    return (
        <>
            <Heading level="2" size="medium">
                <AppText id="steg.arbeidssituasjon.opptjeningUtland.tittel" />
            </Heading>
            <FormLayout.Questions>
                <VStack gap="3">
                    <FormikYesOrNoQuestion
                        legend={text('steg.arbeidssituasjon.opptjeningUtland.spm')}
                        name={ArbeidssituasjonFormFields.harOpptjeningUtland}
                        validate={getYesOrNoValidator()}
                    />
                    {harOpptjeningUtland === YesOrNo.YES && (
                        <FormLayout.Panel>
                            <OpptjeningUtlandListAndDialog
                                minDate={getDate1YearAgo()}
                                maxDate={getDate1YearFromNow()}
                                name={ArbeidssituasjonFormFields.opptjeningUtland}
                                validate={getListValidator({ required: true })}
                                labels={{
                                    addLabel: text('steg.arbeidssituasjon.opptjeningUtland.addLabel'),
                                    listTitle: text('steg.arbeidssituasjon.opptjeningUtland.listTitle'),
                                    modalTitle: text('steg.arbeidssituasjon.opptjeningUtland.modalTitle'),
                                }}
                            />
                        </FormLayout.Panel>
                    )}
                </VStack>

                <VStack gap="3">
                    <FormikYesOrNoQuestion
                        legend={text('steg.arbeidssituasjon.utenlandskNæring.spm')}
                        name={ArbeidssituasjonFormFields.harUtenlandskNæring}
                        validate={getYesOrNoValidator()}
                    />
                    {harUtenlandskNæring === YesOrNo.YES && (
                        <FormLayout.Panel>
                            <UtenlandskNæringListAndDialog
                                name={ArbeidssituasjonFormFields.utenlandskNæring}
                                validate={getListValidator({ required: true })}
                                labels={{
                                    addLabel: text('steg.arbeidssituasjon.utenlandskNæring.addLabel'),
                                    listTitle: text('steg.arbeidssituasjon.utenlandskNæring.listTitle'),
                                    modalTitle: text('steg.arbeidssituasjon.utenlandskNæring.modalTitle'),
                                }}
                            />
                        </FormLayout.Panel>
                    )}
                </VStack>
            </FormLayout.Questions>
        </>
    );
};
