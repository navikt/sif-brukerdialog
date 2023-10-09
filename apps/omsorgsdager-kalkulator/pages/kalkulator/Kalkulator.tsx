import { useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { YesOrNo } from '../../components/sif-formik/types';
import { getTypedFormComponents } from '../../components/sif-formik/getTypedFormComponents';
import { ValidationError } from '../../components/sif-formik/validation/types';
import getIntlFormErrorHandler from '../../components/sif-formik/validation/intlFormErrorHandler';
import { mapBarnKalkulatorToBarn, summerAntallOmsorgsdager } from '../../utils/utils';
import { beregnOmsorgsdager } from '../../components/kalkulerOmsorgsdager/kalkulerOmsorgsdager';
import ResultatArea from '../../components/result/ResultatArea';
import { useState } from 'react';
import { ResultView, empty, noValidChildrenOrange } from '../../components/result/ResultView';
import Omsorgsprinsipper from '../../components/kalkulerOmsorgsdager/types/Omsorgsprinsipper';
import FormikValuesObserver from '../../components/sif-formik/helpers/formik-values-observer/FormikValuesObserver';
import BarnFormPart from '../../components/kalkulator-form-parts/BarnFormPart';
import AntallBarnFormPart from '../../components/kalkulator-form-parts/AntallBarnFormPart';

export interface BarnKalkulator {
    årFødt: number;
    kroniskSykt?: YesOrNo;
    borSammen?: YesOrNo;
    aleneOmOmsorgen?: YesOrNo;
    id: string;
}

export enum BarnFormFiels {
    kroniskSykt = 'kroniskSykt',
    årFødt = 'årFødt',
    borSammen = 'borSammen',
    aleneOmOmsorgen = 'aleneOmOmsorgen',
    id = 'id',
}

export enum KlakulatorFormFields {
    antallBarn = 'antallBarn',
    barn = 'barn',
}

export interface KlakulatorFormValues {
    [KlakulatorFormFields.antallBarn]: number;
    [KlakulatorFormFields.barn]: BarnKalkulator[];
}

const { FormikWrapper, Form } = getTypedFormComponents<KlakulatorFormFields, KlakulatorFormValues, ValidationError>();

const Kalkulator = () => {
    const intl = useIntl();
    const [openBarnPanel, setOpenBarnPanel] = useState<boolean | undefined>(undefined);
    const [resultViewData, setResultViewData] = useState<ResultView<number>>(empty);

    const onValidSubmit = (values: Partial<KlakulatorFormValues>) => {
        const mappedBarn = values.barn ? mapBarnKalkulatorToBarn(values.barn) : [];

        if (mappedBarn.length === 0) {
            setResultViewData(noValidChildrenOrange);
        }

        const inkluderKoronadager = false;
        const omsorgsprinsipper: Omsorgsprinsipper = beregnOmsorgsdager(mappedBarn, inkluderKoronadager);
        const sumDager: number = summerAntallOmsorgsdager(omsorgsprinsipper);
        if (sumDager === 0) {
            setResultViewData(noValidChildrenOrange);
        } else {
            setResultViewData({ _tag: 'ResultBox', result: sumDager });
        }
    };

    const nBarnMaks = 20;

    return (
        <FormikWrapper
            initialValues={{
                antallBarn: 0,
                barn: [],
            }}
            onSubmit={(values) => {
                console.log('SUBMIT');
                return onValidSubmit(values);
            }}
            renderForm={({ values: { barn = [] }, setFieldValue }) => {
                const setBarn = (value: string) => {
                    const valueNumber = parseInt(value, 10);
                    setFieldValue(
                        KlakulatorFormFields.barn,
                        Array.from({ length: valueNumber }, (_, i) => i).map(() => {
                            return { id: uuid() };
                        }),
                    );
                };

                return (
                    <>
                        <FormikValuesObserver
                            onChange={() => {
                                setResultViewData(empty);
                            }}
                        />
                        <Form
                            includeButtons={true}
                            includeValidationSummary={true}
                            submitButtonLabel={'Beregn'}
                            showButtonArrows={false}
                            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
                            <AntallBarnFormPart setBarn={setBarn} />

                            {barn.map((b, index) => {
                                return (
                                    <BarnFormPart
                                        barn={b}
                                        index={index}
                                        antallBarn={barn.length}
                                        key={b.id}
                                        openPanel={openBarnPanel}
                                    />
                                );
                            })}
                        </Form>
                        <ResultatArea resultView={resultViewData} />
                    </>
                );
            }}
        />
    );
};

export default Kalkulator;
