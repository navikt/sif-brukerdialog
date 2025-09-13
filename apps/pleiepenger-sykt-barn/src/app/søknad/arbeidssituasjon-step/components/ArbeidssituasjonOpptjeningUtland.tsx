import { useAppIntl } from '@i18n/index';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';

const ArbeidssituasjonOpptjeningUtland = () => {
    const { text } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();

    return (
        <FormLayout.Questions>
            <div data-testid="arbeidssituasjonOpptjeningUtland">
                <SøknadFormComponents.YesOrNoQuestion
                    legend={text('steg.arbeidssituasjon.opptjeningUtland.spm')}
                    name={SøknadFormField.harOpptjeningUtland}
                    validate={getYesOrNoValidator()}
                />
            </div>
            {values.harOpptjeningUtland === YesOrNo.YES && (
                <FormLayout.Panel bleedTop={true}>
                    <OpptjeningUtlandListAndDialog
                        minDate={getDate1YearAgo()}
                        maxDate={getDate1YearFromNow()}
                        name={SøknadFormField.opptjeningUtland}
                        validate={getListValidator({ required: true })}
                        labels={{
                            addLabel: text('steg.arbeidssituasjon.opptjeningUtland.listAndDialog.addLabel'),
                            listTitle: text('steg.arbeidssituasjon.opptjeningUtland.listAndDialog.listTitle'),
                            modalTitle: text('steg.arbeidssituasjon.opptjeningUtland.listAndDialog.modalTitle'),
                        }}
                    />
                </FormLayout.Panel>
            )}

            <div data-testid="arbeidssituasjonUtenlandskNæring">
                <SøknadFormComponents.YesOrNoQuestion
                    legend={text('steg.arbeidssituasjon.utenlandskNæring.spm')}
                    name={SøknadFormField.harUtenlandskNæring}
                    validate={getYesOrNoValidator()}
                />
            </div>
            {values.harUtenlandskNæring === YesOrNo.YES && (
                <FormLayout.Panel bleedTop={true}>
                    <UtenlandskNæringListAndDialog
                        name={SøknadFormField.utenlandskNæring}
                        validate={getListValidator({ required: true })}
                        labels={{
                            addLabel: 'Legg til næringsvirksomhet i et annet EØS-land',
                            listTitle: 'Næringsvirksomhet i et annet EØS-land',
                            modalTitle: 'Virksomhet',
                        }}
                    />
                </FormLayout.Panel>
            )}
        </FormLayout.Questions>
    );
};

export default ArbeidssituasjonOpptjeningUtland;
