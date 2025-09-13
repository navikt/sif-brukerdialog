import { useAppIntl } from '@i18n/index';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../../../utils/frilanserUtils';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    søknadsperiode: DateRange;
}

const FrilansStartetFørSisteTreHeleMånederSpørsmål = ({ søknadsperiode }: Props) => {
    const { text } = useAppIntl();
    const dato = dateFormatter.dateShortMonthYear(getStartdatoForNySomFrilanser(søknadsperiode));

    return (
        <ArbFriFormComponents.YesOrNoQuestion
            name={FrilansFormField.startetFørSisteTreHeleMåneder}
            legend={text(`frilanser.startetFørSisteTreHeleMåneder.spm`, {
                dato,
            })}
            validate={(value) => {
                const error = getYesOrNoValidator()(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              dato,
                          },
                      }
                    : undefined;
            }}
        />
    );
};

export default FrilansStartetFørSisteTreHeleMånederSpørsmål;
