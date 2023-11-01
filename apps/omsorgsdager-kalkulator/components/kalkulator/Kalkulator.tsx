import { FormattedMessage, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { YesOrNo } from '../sif-formik/types';
import { getTypedFormComponents } from '../sif-formik/getTypedFormComponents';
import { ValidationError } from '../sif-formik/validation/types';
import getIntlFormErrorHandler from '../sif-formik/validation/intlFormErrorHandler';
import { mapBarnKalkulatorToBarn, summerAntallOmsorgsdager } from '../../utils/utils';
import { beregnOmsorgsdager } from '../kalkulerOmsorgsdager/kalkulerOmsorgsdager';
import ResultatArea from '../result/ResultatArea';
import { useState } from 'react';
import { ResultView, empty, noValidChildrenOrange } from '../result/ResultView';
import Omsorgsprinsipper from '../kalkulerOmsorgsdager/types/Omsorgsprinsipper';
import FormikValuesObserver from '../sif-formik/helpers/formik-values-observer/FormikValuesObserver';
import BarnFormPart from './kalkulator-form-parts/BarnFormPart';
import AntallBarnFormPart from './kalkulator-form-parts/AntallBarnFormPart';
import { Heading } from '@navikt/ds-react';

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

    const [resultViewData, setResultViewData] = useState<ResultView<number>>(empty);

    const onValidSubmit = (values: Partial<KlakulatorFormValues>) => {
        const mappedBarn = values.barn ? mapBarnKalkulatorToBarn(values.barn) : [];

        if (mappedBarn.length === 0) {
            setResultViewData(noValidChildrenOrange);
        }

        const omsorgsprinsipper: Omsorgsprinsipper = beregnOmsorgsdager(mappedBarn);
        const sumDager: number = summerAntallOmsorgsdager(omsorgsprinsipper);
        if (sumDager === 0) {
            setResultViewData(noValidChildrenOrange);
        } else {
            setResultViewData({ _tag: 'ResultBox', result: sumDager });
        }
    };

    return (
        <FormikWrapper
            initialValues={{
                antallBarn: undefined,
                barn: [],
            }}
            onSubmit={(values) => {
                return onValidSubmit(values);
            }}
            renderForm={({ values: { barn = [] }, isValid, setFieldValue, setErrors }) => {
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
                                setErrors({});
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
                            {barn.length > 0 && (
                                <Heading level="2" size="medium">
                                    <FormattedMessage id={'barn.tittel'} values={{ antall: barn.length }} />
                                </Heading>
                            )}

                            {barn.map((b, index) => {
                                return (
                                    <BarnFormPart
                                        barn={b}
                                        index={index}
                                        antallBarn={barn.length}
                                        key={b.id}
                                        valideringsFeil={!isValid}
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
