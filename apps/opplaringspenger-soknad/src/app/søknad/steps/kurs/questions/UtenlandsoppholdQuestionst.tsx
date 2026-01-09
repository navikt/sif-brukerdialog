import { KursFormComponents, KursFormFields, KursFormValues } from '../KursStepForm';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { YesOrNo } from '@navikt/sif-common-core-ds';
import { useAppIntl } from '../../../../i18n';
import { FormLayout } from '@navikt/sif-common-ui';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { DateRange } from '@navikt/sif-common-utils';
import { getUtenlandsoppholdValidator } from '../utils/kursStepUtils';

interface Props {
    values: Partial<KursFormValues>;
    gyldigSøknadsperiode: DateRange;
    søknadsperiode?: DateRange;
    disabledDateRanges: DateRange[];
    kursperioder: DateRange[];
}

const UtenlandsoppholdQuestions = ({
    values,
    gyldigSøknadsperiode,
    søknadsperiode,
    disabledDateRanges,
    kursperioder,
}: Props) => {
    const { text } = useAppIntl();
    const skalOppholdeSegIUtlandetIPerioden = values[KursFormFields.skalOppholdeSegIUtlandetIPerioden] === YesOrNo.YES;

    return (
        <>
            <KursFormComponents.YesOrNoQuestion
                legend={text('steg.kurs.utenlandsopphold.spm')}
                name={KursFormFields.skalOppholdeSegIUtlandetIPerioden}
                validate={getYesOrNoValidator()}
            />

            {skalOppholdeSegIUtlandetIPerioden && (
                <FormLayout.Panel bleedTop={true}>
                    <UtenlandsoppholdListAndDialog<KursFormFields>
                        name={KursFormFields.utenlandsoppholdIPerioden}
                        minDate={søknadsperiode?.from || gyldigSøknadsperiode.from}
                        maxDate={søknadsperiode?.to || gyldigSøknadsperiode.to}
                        variant="enkel"
                        labels={{
                            modalTitle: text('steg.kurs.utenlandsopphold.modalTitle'),
                            listTitle: text('steg.kurs.utenlandsopphold.listTitle'),
                            addLabel: text('steg.kurs.utenlandsopphold.addLabel'),
                        }}
                        disabledDateRanges={disabledDateRanges}
                        validate={getUtenlandsoppholdValidator(kursperioder)}
                    />
                </FormLayout.Panel>
            )}
        </>
    );
};

export default UtenlandsoppholdQuestions;
