import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { KursFormFields, KursFormValues } from '../KursStep';
import { AppText, useAppIntl } from '../../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { YesOrNo } from '@navikt/sif-common-core-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakListAndDialog';
import { getFerieperioderValidator } from '../utils/kursStepUtils';

interface Props {
    values: Partial<KursFormValues>;
    gyldigSøknadsperiode: DateRange;
    søknadsperiode?: DateRange;
    disabledDateRanges: DateRange[];
    kursperioder: DateRange[];
}

const { YesOrNoQuestion } = getTypedFormComponents<KursFormFields, KursFormValues, ValidationError>();

const FerieQuestions = ({ values, gyldigSøknadsperiode, søknadsperiode, disabledDateRanges, kursperioder }: Props) => {
    const { text } = useAppIntl();
    return (
        <>
            <YesOrNoQuestion
                name={KursFormFields.skalTaUtFerieIPerioden}
                legend={text('steg.kurs.skalTaUtFerieIPerioden.label')}
                validate={getYesOrNoValidator()}
            />

            {values[KursFormFields.skalTaUtFerieIPerioden] === YesOrNo.YES && (
                <FormLayout.QuestionBleedTop>
                    <FormLayout.Panel>
                        <FerieuttakListAndDialog
                            labels={{
                                addLabel: text('steg.kurs.ferie.addLabel'),
                                modalTitle: text('steg.kurs.ferie.modalTitle'),
                                listTitle: text('steg.kurs.ferie.listTitle'),
                                modalDescription: <AppText id="steg.kurs.ferie.modalDescription" />,
                            }}
                            name={KursFormFields.ferieuttak}
                            minDate={søknadsperiode?.from || gyldigSøknadsperiode.from}
                            maxDate={søknadsperiode?.to || gyldigSøknadsperiode.to}
                            disabledDateRanges={disabledDateRanges}
                            validate={getFerieperioderValidator(kursperioder)}
                        />
                    </FormLayout.Panel>
                </FormLayout.QuestionBleedTop>
            )}
        </>
    );
};

export default FerieQuestions;
