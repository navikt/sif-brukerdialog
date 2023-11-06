import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import OpptjeningUtlandListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import UtenlandskNæringListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';

const ArbeidssituasjonOpptjeningUtland = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SøknadFormValues>();

    return (
        <>
            <div data-testid="arbeidssituasjonOpptjeningUtland">
                <SøknadFormComponents.YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.arbeidssituasjon.opptjeningUtland.spm')}
                    name={SøknadFormField.harOpptjeningUtland}
                    validate={getYesOrNoValidator()}
                />
                {values.harOpptjeningUtland === YesOrNo.YES && (
                    <FormBlock>
                        <ResponsivePanel border={true}>
                            <OpptjeningUtlandListAndDialog
                                minDate={date1YearAgo}
                                maxDate={date1YearFromNow}
                                name={SøknadFormField.opptjeningUtland}
                                validate={getListValidator({ required: true })}
                                labels={{
                                    addLabel: intlHelper(
                                        intl,
                                        'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.addLabel',
                                    ),
                                    listTitle: intlHelper(
                                        intl,
                                        'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.listTitle',
                                    ),
                                    modalTitle: intlHelper(
                                        intl,
                                        'steg.arbeidssituasjon.opptjeningUtland.listAndDialog.modalTitle',
                                    ),
                                }}
                            />
                        </ResponsivePanel>
                    </FormBlock>
                )}
            </div>
            <FormBlock>
                <div data-testid="arbeidssituasjonUtenlandskNæring">
                    <SøknadFormComponents.YesOrNoQuestion
                        legend={intlHelper(intl, 'steg.arbeidssituasjon.utenlandskNæring.spm')}
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
