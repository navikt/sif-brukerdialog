import { ValidationError } from "@/components/sif-formik/validation/types";
import { KlakulatorFormFields, KlakulatorFormValues } from "../Kalkulator";
import { getTypedFormComponents } from "@/components/sif-formik/getTypedFormComponents";
import { useFeatureToggleIntl } from "@/hooks/useFeatureToggleIntl";
import getRequiredFieldValidator from "@/components/sif-formik/validation/getRequiredFieldValidator";
import { ReadMore } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";

interface Props {
  setBarn: (value: string) => void;
}

const { Select } = getTypedFormComponents<
  KlakulatorFormFields,
  KlakulatorFormValues,
  ValidationError
>();

const AntallBarnFormPart: React.FC<Props> = ({ setBarn }: Props) => {
  const { formatMessage } = useFeatureToggleIntl();
  const nBarnMaks = 20;

  return (
    <>
      <Select
        label={formatMessage("kalkulator.antallBarn")}
        name={KlakulatorFormFields.antallBarn}
        validate={getRequiredFieldValidator()}
        afterOnChange={(value) => setBarn(value)}
        description={
          <ReadMore
            header={formatMessage("kalkulator.antallBarn.readMore.title")}
          >
            <FormattedMessage id={"kalkulator.antallBarn.readMore"} />
          </ReadMore>
        }
      >
        {Array.from({ length: nBarnMaks }, (_, i) => i).map((value: number) => {
          return (
            <option
              id={`n_barn_i_husstanden${value}`}
              value={value}
              key={value}
            >
              {value}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default AntallBarnFormPart;
