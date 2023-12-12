import { BarnFormFiels, BarnKalkulator, KlakulatorFormFields, KlakulatorFormValues } from '../Kalkulator';
import BarnPanelView from '../../barnPanel/BarnPanelView';
import { ValidationError } from '../../sif-formik/validation/types';
import { getTypedFormComponents } from '../../sif-formik/getTypedFormComponents';
import { Alert, BodyLong, Link, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import getYesOrNoValidator from '../../sif-formik/validation/getYesOrNoValidator';
import { YesOrNo } from '../../sif-formik/types';
import getRequiredFieldValidator from '../../sif-formik/validation/getRequiredFieldValidator';
import { barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt, erForbiDetAttendeKalenderår } from '../../../utils/utils';
import { intlHelper } from '@/utils/intlHelper';
import { lenker } from '@/utils/lenker';

interface Props {
    barn: BarnKalkulator;
    index: number;
    antallBarn: number;
    valideringsFeil?: boolean;
}

const { YesOrNoQuestion, Select } = getTypedFormComponents<
    KlakulatorFormFields,
    KlakulatorFormValues,
    ValidationError
>();

const BarnFormPart: React.FC<Props> = ({ barn, index, antallBarn, valideringsFeil }: Props) => {
    const intl = useIntl();

    const getFieldName = (index: number, field: BarnFormFiels): string => {
        return `${KlakulatorFormFields.barn}.${index}.${field}`;
    };

    const barnName = () => {
        if (antallBarn > 1) {
            return `barn  ${index + 1}`;
        } else return 'barnet';
    };

    return (
        <>
            <div className="mt-7">
                <BarnPanelView id={barn.id} index={index} length={antallBarn} valideringsFeil={valideringsFeil}>
                    <Select
                        label={intlHelper(intl, 'barn.årFødt')}
                        name={getFieldName(index, BarnFormFiels.årFødt) as KlakulatorFormFields}
                        style={{ width: 'fit-content' }}
                        validate={(value) => {
                            const error = getRequiredFieldValidator()(value);

                            return error
                                ? {
                                      key: 'validation.barn.årFødt.noValue',
                                      values: { barnName: barnName() },
                                      keepKeyUnaltered: true,
                                  }
                                : undefined;
                        }}
                        description={
                            <ReadMore header={intlHelper(intl, 'barn.årFødt.readMore.title')}>
                                <BodyLong as="div" spacing>
                                    <FormattedMessage id={'barn.årFødt.readMore.avsnitt1'} />
                                </BodyLong>
                                <BodyLong as="div">
                                    <FormattedMessage id={'barn.årFødt.readMore.avsnitt2'} />
                                </BodyLong>
                            </ReadMore>
                        }>
                        {[
                            <option id={`${index}.aar-fodt-ikke-valgt`} value={undefined} key={0}>
                                {' '}
                            </option>,
                            ...Array.from({ length: 21 }, (_, i) => i).map((value: number) => {
                                const currentYear = dayjs().year();
                                const year = currentYear - value;
                                return (
                                    <option value={year} key={year}>
                                        {year}
                                    </option>
                                );
                            }),
                        ]}
                    </Select>

                    {barn.årFødt && !erForbiDetAttendeKalenderår(barn.årFødt) && (
                        <>
                            <div className="mt-7">
                                <YesOrNoQuestion
                                    name={getFieldName(index, BarnFormFiels.borSammen) as KlakulatorFormFields}
                                    legend={intlHelper(intl, 'barn.borSammen')}
                                    validate={(value) => {
                                        const error = getYesOrNoValidator()(value);

                                        return error
                                            ? {
                                                  key: 'validation.barn.borSammen.yesOrNoIsUnanswered',
                                                  values: { barnName: barnName() },
                                                  keepKeyUnaltered: true,
                                              }
                                            : undefined;
                                    }}
                                    description={
                                        <ReadMore header={intlHelper(intl, 'barn.borSammen.readMore.title')}>
                                            <FormattedMessage id={'barn.borSammen.readMore'} />
                                        </ReadMore>
                                    }
                                />
                            </div>
                            <div aria-live="polite">
                                {barn.borSammen === YesOrNo.NO && (
                                    <Alert variant="warning" className="mt-4">
                                        <FormattedMessage id={'barn.borSammen.alert'} />
                                    </Alert>
                                )}
                            </div>
                            {barn.borSammen === YesOrNo.YES && (
                                <>
                                    <div className="mt-7">
                                        <YesOrNoQuestion
                                            name={
                                                getFieldName(index, BarnFormFiels.kroniskSykt) as KlakulatorFormFields
                                            }
                                            legend={intlHelper(intl, 'barn.kroniskSykt')}
                                            validate={(value) => {
                                                const error = getYesOrNoValidator()(value);

                                                return error
                                                    ? {
                                                          key: 'validation.barn.kroniskSykt.yesOrNoIsUnanswered',
                                                          values: { barnName: barnName() },
                                                          keepKeyUnaltered: true,
                                                      }
                                                    : undefined;
                                            }}
                                            description={
                                                <ReadMore header={intlHelper(intl, 'barn.kroniskSykt.readMore.title')}>
                                                    <BodyLong as="div" spacing>
                                                        <FormattedMessage id="barn.kroniskSykt.readMore.avsnitt1" />
                                                    </BodyLong>
                                                    <BodyLong as="div" spacing>
                                                        <FormattedMessage id="barn.kroniskSykt.readMore.avsnitt2" />
                                                        <Link href={lenker.omsorgspengerEkstraDager} target="_blank">
                                                            <FormattedMessage id="barn.kroniskSykt.readMore.avsnitt2.lenke" />
                                                        </Link>
                                                    </BodyLong>
                                                </ReadMore>
                                            }
                                        />
                                    </div>
                                    {barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barn) && (
                                        <Alert variant="warning" className="my-7">
                                            <FormattedMessage id={'barn.kroniskSykt.alert'} />
                                        </Alert>
                                    )}
                                    {!barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barn) && (
                                        <div className="mt-7">
                                            <YesOrNoQuestion
                                                name={
                                                    getFieldName(
                                                        index,
                                                        BarnFormFiels.aleneOmOmsorgen,
                                                    ) as KlakulatorFormFields
                                                }
                                                legend={intlHelper(intl, 'barn.aleneOmOmsorgen')}
                                                validate={(value) => {
                                                    const error = getYesOrNoValidator()(value);

                                                    return error
                                                        ? {
                                                              key: 'validation.barn.aleneOmOmsorgen.yesOrNoIsUnanswered',
                                                              values: { barnName: barnName() },
                                                              keepKeyUnaltered: true,
                                                          }
                                                        : undefined;
                                                }}
                                                description={
                                                    <ReadMore
                                                        header={intlHelper(
                                                            intl,
                                                            'barn.aleneOmOmsorgen.readMore.title',
                                                        )}>
                                                        <BodyLong as="div" spacing>
                                                            <FormattedMessage
                                                                id={'barn.aleneOmOmsorgen.readMore.avsnitt.1'}
                                                            />
                                                        </BodyLong>

                                                        <BodyLong as="div" spacing>
                                                            <FormattedMessage
                                                                id={'barn.aleneOmOmsorgen.readMore.avsnitt.2'}
                                                            />
                                                        </BodyLong>
                                                        <BodyLong as="div" spacing>
                                                            <FormattedMessage
                                                                id={'barn.aleneOmOmsorgen.readMore.avsnitt.3'}
                                                            />
                                                        </BodyLong>
                                                        <BodyLong as="div" spacing>
                                                            <FormattedMessage
                                                                id={'barn.aleneOmOmsorgen.readMore.avsnitt.4'}
                                                            />{' '}
                                                            <Link
                                                                href={lenker.omsorgspengerEkstraDager}
                                                                target="_blank">
                                                                <FormattedMessage id="barn.aleneOmOmsorgen.readMore.avsnitt.4.lenke" />
                                                            </Link>
                                                        </BodyLong>
                                                    </ReadMore>
                                                }
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {erForbiDetAttendeKalenderår(barn.årFødt) && (
                        <Alert variant="warning" className="my-7">
                            <FormattedMessage id={'barn.årFødt.alert'} />
                        </Alert>
                    )}
                </BarnPanelView>
            </div>
        </>
    );
};

export default BarnFormPart;
