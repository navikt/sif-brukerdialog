import { YesOrNo } from '@navikt/sif-common-core-ds';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { BostedUtland, BostedUtlandListAndDialog } from '@navikt/sif-common-forms-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateRangesCollide, dateRangesExceedsRange } from '@navikt/sif-common-utils';
import { useSøknadNavigation } from '@shared/hooks/utils/useSøknadNavigation';
import { useAppIntl } from '@shared/i18n';
import SøknadSteg from '@søknad/components/søknad-steg/SøknadSteg';
import SkjemaFooter from '@søknad/components/steg-skjema/SkjemaFooter';
import { SøknadSvar, Spørsmål, Steg } from '@søknad/types';
import dayjs from 'dayjs';

import { useSøknadContext } from '../../../hooks/context/useSøknadContext';
import { getNextSteg } from '../../utils/stegUtils';

type MedlemskapFormValue = {
    harBoddIUtlandet?: YesOrNo;
    utenlandsopphold?: BostedUtland[];
};
enum MedlemskapFormFields {
    harBoddIUtlandet = 'harBoddIUtlandet',
    utenlandsopphold = 'utenlandsopphold',
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    MedlemskapFormFields,
    MedlemskapFormValue,
    ValidationError
>();

const getInitialValues = (svar: Partial<SøknadSvar>): MedlemskapFormValue => {
    return {
        harBoddIUtlandet: svar[Spørsmål.MEDLEMSKAP],
        utenlandsopphold: svar[Spørsmål.MEDLEMSKAP_PERIODER],
    };
};

const getDate5YearAgo = () => dayjs().subtract(5, 'year').toDate();

export const validateBostedUtlandetSiste5År = (formValue: any): string | undefined => {
    if (!formValue || !Array.isArray(formValue) || formValue.length === 0) {
        return 'bosted.ikke.registrert';
    }
    const dateRanges = formValue.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return 'bosted.overlapper';
    }
    if (dateRangesExceedsRange(dateRanges, { from: getDate5YearAgo(), to: dayjs().subtract(1, 'day').toDate() })) {
        return 'bosted.utenfor.periode';
    }
    return undefined;
};

const MedlemskapSteg = () => {
    const { text } = useAppIntl();
    const {
        setSpørsmålSvar,
        søknadsdata: { svar },
    } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const handleOnSubmit = (values: MedlemskapFormValue) => {
        setSpørsmålSvar(Spørsmål.MEDLEMSKAP, values.harBoddIUtlandet);
        setSpørsmålSvar(Spørsmål.MEDLEMSKAP_PERIODER, values.utenlandsopphold);
        gotoSteg(getNextSteg(Steg.MEDLEMSKAP));
    };

    return (
        <SøknadSteg tittel="Medlemskap" steg={Steg.MEDLEMSKAP}>
            <FormLayout.Guide>medlemskap</FormLayout.Guide>
            <FormikWrapper
                onSubmit={handleOnSubmit}
                initialValues={getInitialValues(svar)}
                renderForm={({ values }) => {
                    const harBoddIUtlandet = values.harBoddIUtlandet;
                    return (
                        <Form includeButtons={false}>
                            <FormLayout.Questions>
                                <YesOrNoQuestion
                                    name={MedlemskapFormFields.harBoddIUtlandet}
                                    legend="Har du bodd fast i utlandet de siste 5 årene?"
                                />
                                {harBoddIUtlandet === YesOrNo.YES && (
                                    <BostedUtlandListAndDialog
                                        name={MedlemskapFormFields.utenlandsopphold}
                                        minDate={getDate5YearAgo()}
                                        maxDate={new Date()}
                                        validate={validateBostedUtlandetSiste5År}
                                        labels={{
                                            modalTitle: 'Bosted i utlandet',
                                            listTitle: 'Bosted i utlandet',
                                            addLabel: 'Legg til opphold ',
                                        }}
                                    />
                                )}
                                <SkjemaFooter
                                    submit={{ tittel: text('søknadApp.nesteSteg.label'), erSendInn: false }}
                                    forrige={{
                                        tittel: text('søknadApp.forrigeSteg.label'),
                                        onClick: () => gotoSteg(Steg.BOSTED),
                                    }}
                                />
                            </FormLayout.Questions>
                        </Form>
                    );
                }}></FormikWrapper>
        </SøknadSteg>
    );
};

export default MedlemskapSteg;
