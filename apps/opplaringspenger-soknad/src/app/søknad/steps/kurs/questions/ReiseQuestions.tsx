import { DateRange } from '@navikt/sif-common-formik-ds';
import { KursFormComponents, KursFormFields, KursFormValues } from '../KursStep';
import { AppText, useAppIntl } from '../../../../i18n';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { YesOrNo } from '@navikt/sif-common-core-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import ReiseInfo from '../info/ReiseInfo';
import ReisedagerFormPart from '../parts/reisedager-form-part/ReisedagerFormPart';
import { Alert } from '@navikt/ds-react';

interface Props {
    values: Partial<KursFormValues>;
    gyldigSøknadsperiode: DateRange;
    søknadsperiode?: DateRange;
    disabledDateRanges: DateRange[];
    kursperioder: DateRange[];
}

const ReiseQuestions = ({ values, søknadsperiode, disabledDateRanges, kursperioder }: Props) => {
    const { text } = useAppIntl();
    const reiserUtenforKursdager = values[KursFormFields.reiserUtenforKursdager] === YesOrNo.YES;
    return (
        <>
            <KursFormComponents.YesOrNoQuestion
                name={KursFormFields.reiserUtenforKursdager}
                legend={text('steg.kurs.reiserUtenforKursdager.label')}
                validate={getYesOrNoValidator()}
                description={<ReiseInfo />}
            />
            {reiserUtenforKursdager ? (
                <FormLayout.QuestionBleedTop>
                    {søknadsperiode ? (
                        <ReisedagerFormPart
                            reisedager={values[KursFormFields.reisedager] || []}
                            disabledDateRanges={disabledDateRanges}
                            søknadsperiode={søknadsperiode}
                            kursperioder={kursperioder}
                        />
                    ) : (
                        <Alert variant="info">
                            <AppText id="steg.kurs.reisedager.førPeriodeLagtTil" />
                        </Alert>
                    )}
                </FormLayout.QuestionBleedTop>
            ) : null}
        </>
    );
};

export default ReiseQuestions;
