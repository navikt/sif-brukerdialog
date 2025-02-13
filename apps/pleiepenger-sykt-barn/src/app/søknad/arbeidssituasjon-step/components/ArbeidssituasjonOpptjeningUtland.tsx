import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';

const ArbeidssituasjonOpptjeningUtland = () => {
    const { text } = useAppIntl();
    const { values } = useFormikContext<SøknadFormValues>();

    return (
        <>
            <div data-testid="arbeidssituasjonOpptjeningUtland">
                <SøknadFormComponents.YesOrNoQuestion
                    legend={text('steg.arbeidssituasjon.opptjeningUtland.spm')}
                    name={SøknadFormField.harOpptjeningUtland}
                    validate={getYesOrNoValidator()}
                />
                {values.harOpptjeningUtland === YesOrNo.YES && (
                    <FormBlock>
                        <ResponsivePanel border={true}>
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
                        </ResponsivePanel>
                    </FormBlock>
                )}
            </div>
            <FormBlock>
                <div data-testid="arbeidssituasjonUtenlandskNæring">
                    <SøknadFormComponents.YesOrNoQuestion
                        legend={text('steg.arbeidssituasjon.utenlandskNæring.spm')}
                        name={SøknadFormField.harUtenlandskNæring}
                        validate={getYesOrNoValidator()}
                    />
                    {values.harUtenlandskNæring === YesOrNo.YES && (
                        <FormBlock>
                            <ResponsivePanel border={true}>
                                <UtenlandskNæringListAndDialog
                                    name={SøknadFormField.utenlandskNæring}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til næringsvirksomhet i et annet EØS-land',
                                        listTitle: 'Næringsvirksomhet i et annet EØS-land',
                                        modalTitle: 'Virksomhet',
                                    }}
                                />
                            </ResponsivePanel>
                        </FormBlock>
                    )}
                </div>
            </FormBlock>
        </>
    );
};

export default ArbeidssituasjonOpptjeningUtland;
