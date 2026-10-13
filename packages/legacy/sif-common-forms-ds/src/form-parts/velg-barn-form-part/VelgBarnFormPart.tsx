import { Box } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FormikRadioGroup, FormikRadioProp } from '@navikt/sif-common-formik-ds';
import { FormikRadioGroupProps } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { RegistrerteBarnListeHeading } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { JSX, useMemo } from 'react';

import { FormsText, useFormsIntl } from '../../i18n/forms.messages';

export const VelgBarn_AnnetBarnValue = 'annetBarn';

export type VelgBarnEkstrainfo = {
    [key: string]: JSX.Element;
};
interface Props extends Omit<FormikRadioGroupProps<any, any>, 'legend' | 'radios'> {
    legend?: string;
    registrerteBarn: RegistrertBarn[];
    registrerteBarnEkstrainfo?: VelgBarnEkstrainfo;
    inkluderAnnetBarn?: boolean;
    annetBarnOptions?: FormikRadioProp;
    headerLevel?: '2' | '3';
}

export const VelgBarnFormPart = ({
    legend,
    inkluderAnnetBarn,
    registrerteBarn,
    registrerteBarnEkstrainfo,
    annetBarnOptions,
    headerLevel = '3',
    ...restProps
}: Props) => {
    const { text } = useFormsIntl();

    const radios = useMemo(() => {
        const options: FormikRadioProp[] = registrerteBarn.map((barn) =>
            mapBarnTilRadioProps(barn, registrerteBarnEkstrainfo),
        );
        if (inkluderAnnetBarn) {
            options.push(
                annetBarnOptions || {
                    value: VelgBarn_AnnetBarnValue,
                    label: text('@forms.velgBarnFormPart.gjelderAnnetBarn'),
                },
            );
        }
        return options;
    }, [registrerteBarn, registrerteBarnEkstrainfo]);

    return (
        <Box>
            <FormikRadioGroup
                legend={
                    <RegistrerteBarnListeHeading level={headerLevel} size="xsmall">
                        {legend || text('@forms.velgBarnFormPart.legend')}
                    </RegistrerteBarnListeHeading>
                }
                {...restProps}
                radios={radios}
            />
        </Box>
    );
};

const mapBarnTilRadioProps = (
    barn: RegistrertBarn,
    registrerteBarnEkstrainfo?: VelgBarnEkstrainfo,
): FormikRadioProp => {
    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    const ekstrainfo = registrerteBarnEkstrainfo?.[aktørId];
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
                {ekstrainfo && <div>{ekstrainfo}</div>}
            </>
        ),
    };
};
