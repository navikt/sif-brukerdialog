import { RegistrertBarn } from '@navikt/sif-common-api';
import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import DokumentTypeOpplaringspengerPart from './DokumentTypeOpplaringspengerPart';
import DokumentTypePsbPart from './DokumentTypePsbPart';

interface Props {
    søknadstype: Søknadstype;
    søkersFødselsnummer: string;
    registrertBarn: RegistrertBarn[];
}

const DokumentTypeStep = ({ søknadstype }: Props) => {
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();

    const { dokumentType, registrertBarnAktørId } = values;

    useEffect(() => {
        if (registrertBarnAktørId !== VelgBarn_AnnetBarnValue) {
            setFieldValue(SoknadFormField.barnetHarIkkeFnr, undefined);
            setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
        }
    }, [registrertBarnAktørId]);

    return (
        <SoknadFormStep id={StepID.DOKUMENT_TYPE} søknadstype={søknadstype}>
            {søknadstype === Søknadstype.pleiepengerSyktBarn && <DokumentTypePsbPart dokumentType={dokumentType} />}
            {søknadstype === Søknadstype.opplaringspenger && (
                <DokumentTypeOpplaringspengerPart dokumentType={dokumentType} />
            )}
        </SoknadFormStep>
    );
};

export default DokumentTypeStep;
