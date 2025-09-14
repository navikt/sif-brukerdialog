import { Box } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FormikRadioGroup, FormikRadioProp } from '@navikt/sif-common-formik-ds';
import { FormikRadioGroupProps } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { RegistrerteBarnListeHeading } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useMemo } from 'react';

import { FormsText, useFormsIntl } from '../../i18n/forms.messages';

export const VelgBarn_AnnetBarnValue = 'annetBarn';

interface Props extends Omit<FormikRadioGroupProps<any, any>, 'legend' | 'radios'> {
    legend?: string;
    registrerteBarn: RegistrertBarn[];
    inkluderAnnetBarn?: boolean;
    annetBarnOptions?: FormikRadioProp;
}

export const VelgBarnFormPart = ({
    legend,
    inkluderAnnetBarn,
    registrerteBarn,
    annetBarnOptions,
    ...restProps
}: Props) => {
    const { text } = useFormsIntl();

    const radios = useMemo(() => {
        const options: FormikRadioProp[] = registrerteBarn.map((barn) => mapBarnTilRadioProps(barn));
        if (inkluderAnnetBarn) {
            options.push(
                annetBarnOptions || {
                    value: VelgBarn_AnnetBarnValue,
                    label: text('@forms.velgBarnFormPart.gjelderAnnetBarn'),
                },
            );
        }
        return options;
    }, [registrerteBarn]);

    return (
        <Box>
            <FormikRadioGroup
                legend={
                    <RegistrerteBarnListeHeading level="3" size="xsmall">
                        {legend || text('@forms.velgBarnFormPart.legend')}
                    </RegistrerteBarnListeHeading>
                }
                {...restProps}
                radios={radios}
            />
        </Box>
    );
};

const mapBarnTilRadioProps = (barn: RegistrertBarn): FormikRadioProp => {
    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    return {
        value: aktørId,
        label: (
            <>
                <div>{barnetsNavn}</div>
                <div>
                    <FormsText
                        id="@forms.velgBarnFormPart.født"
                        values={{ dato: dateFormatter.compact(fødselsdato) }}
                    />
                </div>
            </>
        ),
    };
};
