import { Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { useFormikContext } from 'formik';
import ResponsivePanel from '../../components/responsive-panel/ResponsivePanel';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { getMedlemsskapDateRanges } from '../../utils/medlemsskapUtils';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadFormStep from '../SøknadFormStep';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';

type Props = {
    søknadsdato: Date;
};

const MedlemsskapStep = ({ onValidSubmit, søknadsdato }: StepCommonProps & Props) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { text } = useAppIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemsskapDateRanges(søknadsdato);

    return (
        <SøknadFormStep stepId={StepID.MEDLEMSKAP} onValidFormSubmit={onValidSubmit}>
            <Block padBottom="xxl">
                <SifGuidePanel>
                    {text('step.medlemskap.veileder')}{' '}
                    <Link href={getLenker().medlemskap} target="_blank">
                        nav.no
                    </Link>
                    .
                </SifGuidePanel>
            </Block>
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
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
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
                    </ResponsivePanel>
                </FormBlock>
            )}
            <FormBlock>
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
            </FormBlock>
            {values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
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
                    </ResponsivePanel>
                </FormBlock>
            )}
        </SøknadFormStep>
    );
};

export default MedlemsskapStep;
