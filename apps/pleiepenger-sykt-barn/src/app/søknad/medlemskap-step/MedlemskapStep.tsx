import { Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { useFormikContext } from 'formik';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { getMedlemsskapDateRanges } from '../../utils/medlemsskapUtils';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadFormStep from '../SøknadFormStep';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';
import { FormLayout } from '@navikt/sif-common-ui';

type Props = {
    søknadsdato: Date;
};

const MedlemskapStep = ({ onValidSubmit, søknadsdato }: StepCommonProps & Props) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { text } = useAppIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemsskapDateRanges(søknadsdato);

    return (
        <SøknadFormStep stepId={StepID.MEDLEMSKAP} onValidFormSubmit={onValidSubmit}>
            <FormLayout.Guide>
                {text('step.medlemskap.veileder')}{' '}
                <Link href={getLenker().medlemskap} target="_blank">
                    nav.no
                </Link>
                .
            </FormLayout.Guide>

            <FormLayout.Questions>
                <SøknadFormComponents.YesOrNoQuestion
                    legend={text('steg.medlemsskap.annetLandSiste12.spm')}
                    name={SøknadFormField.harBoddUtenforNorgeSiste12Mnd}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={text('HvaBetyrDette')}>
                            {text('steg.medlemsskap.annetLandSiste12.hjelp')}
                        </ExpandableInfo>
                    }
                />
                {values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                    <FormLayout.Panel bleedTop={true}>
                        <div data-testid="bostedUtlandList-annetLandSiste12">
                            <BostedUtlandListAndDialog<SøknadFormField>
                                name={SøknadFormField.utenlandsoppholdSiste12Mnd}
                                minDate={siste12Måneder.from}
                                maxDate={siste12Måneder.to}
                                labels={{
                                    addLabel: text('step.medlemskap.leggTilKnapp'),
                                    listTitle: text('steg.medlemsskap.annetLandSiste12.listeTittel'),
                                    modalTitle: text('step.medlemskap.utenlandsoppholdSiste12'),
                                }}
                                validate={validateUtenlandsoppholdSiste12Mnd}
                            />
                        </div>
                    </FormLayout.Panel>
                )}

                <SøknadFormComponents.YesOrNoQuestion
                    legend={text('steg.medlemsskap.annetLandNeste12.spm')}
                    name={SøknadFormField.skalBoUtenforNorgeNeste12Mnd}
                    validate={getYesOrNoValidator()}
                    description={
                        <ExpandableInfo title={text('HvaBetyrDette')}>
                            {text('steg.medlemsskap.annetLandNeste12.hjelp')}
                        </ExpandableInfo>
                    }
                />

                {values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                    <FormLayout.Panel bleedTop={true}>
                        <div data-testid="bostedUtlandList-annetLandNeste12">
                            <BostedUtlandListAndDialog<SøknadFormField>
                                name={SøknadFormField.utenlandsoppholdNeste12Mnd}
                                minDate={neste12Måneder.from}
                                maxDate={neste12Måneder.to}
                                labels={{
                                    addLabel: text('step.medlemskap.leggTilKnapp'),
                                    listTitle: text('steg.medlemsskap.annetLandNeste12.listeTittel'),
                                    modalTitle: text('step.medlemskap.utenlandsoppholdNeste12'),
                                }}
                                validate={validateUtenlandsoppholdNeste12Mnd}
                            />
                        </div>
                    </FormLayout.Panel>
                )}
            </FormLayout.Questions>
        </SøknadFormStep>
    );
};

export default MedlemskapStep;
