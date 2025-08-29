import { useEffect } from 'react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { useFormikContext } from 'formik';
import AnnetBarnPart from '../../components/barn-form-parts/AnnetBarnPart';
import RegistrertBarnPart from '../../components/barn-form-parts/RegistrertBarnPart';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

interface Props {
    søknadstype: Søknadstype;
    søkersFødselsnummer: string;
    registrertBarn: RegistrertBarn[];
}

const EttersendelseGjelderStep = ({ søknadstype, søkersFødselsnummer, registrertBarn }: Props) => {
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();

    const { registrertBarnAktørId } = values;
    const harRegistrerteBarn = registrertBarn.length > 0;
    const gjelderEtAnnetBarn = registrertBarnAktørId === VelgBarn_AnnetBarnValue;

    useEffect(() => {
        if (registrertBarnAktørId !== VelgBarn_AnnetBarnValue) {
            setFieldValue(SoknadFormField.barnetHarIkkeFnr, undefined);
            setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
        }
    }, [registrertBarnAktørId]);

    return (
        <SoknadFormStep id={StepID.ETTERSENDELSE_GJELDER} søknadstype={søknadstype}>
            <>
                <FormBlock>
                    <RegistrertBarnPart registrertBarn={registrertBarn} />
                </FormBlock>

                {(gjelderEtAnnetBarn || !harRegistrerteBarn) && (
                    <AnnetBarnPart søkersFødselsnummer={søkersFødselsnummer} harRegistrerteBarn={harRegistrerteBarn} />
                )}
            </>
        </SoknadFormStep>
    );
};

export default EttersendelseGjelderStep;
