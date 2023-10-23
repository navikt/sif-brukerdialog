import { ValidationError } from '../../sif-formik/validation/types';
import { KlakulatorFormFields, KlakulatorFormValues } from '../Kalkulator';
import { getTypedFormComponents } from '../../sif-formik/getTypedFormComponents';
import { ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '../../../utils/intlHelper';

interface Props {
    setBarn: (value: string) => void;
}

const { Select } = getTypedFormComponents<KlakulatorFormFields, KlakulatorFormValues, ValidationError>();

const AntallBarnFormPart: React.FC<Props> = ({ setBarn }: Props) => {
    const intl = useIntl();
    const nBarnMaks = 20;

    return (
        <div className="mb-7">
            <Select
                label={intlHelper(intl, 'kalkulator.antallBarn')}
                name={KlakulatorFormFields.antallBarn}
                validate={(value) => {
                    const valueNumber = parseInt(value, 10);
                    if (!valueNumber) {
                        return {
                            key: 'validation.antallBarn.noValue',
                            keepKeyUnaltered: true,
                        };
                    }
                    return undefined;
                }}
                afterOnChange={(value) => setBarn(value)}
                style={{ width: 'fit-content' }}
                description={
                    <ReadMore header={intlHelper(intl, 'kalkulator.antallBarn.readMore.title')}>
                        <FormattedMessage id={'kalkulator.antallBarn.readMore'} />
                    </ReadMore>
                }>
                <option value="" />
                {Array.from({ length: nBarnMaks }, (_, i) => i).map((value: number) => {
                    return (
                        <option id={`n_barn_i_husstanden${value}`} value={value} key={value}>
                            {value}
                        </option>
                    );
                })}
            </Select>
        </div>
    );
};

export default AntallBarnFormPart;
