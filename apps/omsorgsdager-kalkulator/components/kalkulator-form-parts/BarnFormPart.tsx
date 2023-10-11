import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';
import {
    BarnFormFiels,
    BarnKalkulator,
    KlakulatorFormFields,
    KlakulatorFormValues,
} from '../../pages/kalkulator/Kalkulator';
import BarnPanelView from '../barnPanel/BarnPanelView';
import { ValidationError } from '../sif-formik/validation/types';
import { getTypedFormComponents } from '../sif-formik/getTypedFormComponents';
import { Alert, BodyLong, Link, ReadMore } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import getYesOrNoValidator from '../sif-formik/validation/getYesOrNoValidator';
import { YesOrNo } from '../sif-formik/types';
import getRequiredFieldValidator from '../sif-formik/validation/getRequiredFieldValidator';
import { barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt, erForbiDetAttendeKalenderår } from '../../utils/utils';

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
    const { formatMessage } = useFeatureToggleIntl();
    const getFieldName = (index: number, field: BarnFormFiels): string => {
        return `${KlakulatorFormFields.barn}.${index}.${field}`;
    };

    const barnName = index + 1;

    return (
        <>
            <div className="mt-7">
                <BarnPanelView id={barn.id} index={index} length={antallBarn} valideringsFeil={valideringsFeil}>
                    <div>
                        <Select
                            label={formatMessage('barn.årFødt')}
                            name={getFieldName(index, BarnFormFiels.årFødt) as KlakulatorFormFields}
                            style={{ width: 'fit-content' }}
                            validate={(value) => {
                                const error = getRequiredFieldValidator()(value);

                                return error
                                    ? {
                                          key: 'validation.barn.årFødt.noValue',
                                          values: { barnName },
                                          keepKeyUnaltered: true,
                                      }
                                    : undefined;
                            }}
                            description={
                                <ReadMore header={formatMessage('barn.årFødt.readMore.title')}>
                                    <FormattedMessage id={'barn.årFødt.readMore'} />
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
                    </div>
                    {barn.årFødt && !erForbiDetAttendeKalenderår(barn.årFødt) && (
                        <>
                            <div className="mt-7">
                                <YesOrNoQuestion
                                    name={getFieldName(index, BarnFormFiels.kroniskSykt) as KlakulatorFormFields}
                                    legend={formatMessage('barn.kroniskSykt')}
                                    validate={(value) => {
                                        const error = getYesOrNoValidator()(value);

                                        return error
                                            ? {
                                                  key: 'validation.barn.kroniskSykt.yesOrNoIsUnanswered',
                                                  values: { barnName },
                                                  keepKeyUnaltered: true,
                                              }
                                            : undefined;
                                    }}
                                    description={
                                        <ReadMore header={formatMessage('barn.kroniskSykt.readMore.title')}>
                                            <FormattedMessage id={'barn.kroniskSykt.readMore'} />
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
                                <>
                                    <div className="mt-7">
                                        <YesOrNoQuestion
                                            name={getFieldName(index, BarnFormFiels.borSammen) as KlakulatorFormFields}
                                            legend={formatMessage('barn.borSammen')}
                                            validate={(value) => {
                                                const error = getYesOrNoValidator()(value);

                                                return error
                                                    ? {
                                                          key: 'validation.barn.borSammen.yesOrNoIsUnanswered',
                                                          values: { barnName },
                                                          keepKeyUnaltered: true,
                                                      }
                                                    : undefined;
                                            }}
                                            description={
                                                <ReadMore header={formatMessage('barn.borSammen.readMore.title')}>
                                                    <FormattedMessage id={'barn.borSammen.readMore'} />
                                                </ReadMore>
                                            }
                                        />
                                    </div>
                                    {barn.borSammen === YesOrNo.NO && (
                                        <Alert variant="warning" className="mt-4">
                                            <FormattedMessage id={'barn.borSammen.alert'} />
                                        </Alert>
                                    )}
                                    {barn.borSammen === YesOrNo.YES && (
                                        <div className="mt-7">
                                            <YesOrNoQuestion
                                                name={
                                                    getFieldName(
                                                        index,
                                                        BarnFormFiels.aleneOmOmsorgen,
                                                    ) as KlakulatorFormFields
                                                }
                                                legend={formatMessage('barn.aleneOmOmsorgen')}
                                                validate={(value) => {
                                                    const error = getYesOrNoValidator()(value);

                                                    return error
                                                        ? {
                                                              key: 'validation.barn.aleneOmOmsorgen.yesOrNoIsUnanswered',
                                                              values: { barnName },
                                                              keepKeyUnaltered: true,
                                                          }
                                                        : undefined;
                                                }}
                                                description={
                                                    <ReadMore
                                                        header={formatMessage('barn.aleneOmOmsorgen.readMore.title')}>
                                                        <BodyLong as="div">
                                                            <FormattedMessage
                                                                id={'barn.aleneOmOmsorgen.readMore.avsnitt.1'}
                                                            />
                                                        </BodyLong>

                                                        <BodyLong as="div">
                                                            <FormattedMessage
                                                                id={'barn.aleneOmOmsorgen.readMore.avsnitt.1'}
                                                            />
                                                        </BodyLong>
                                                        <Link
                                                            href={
                                                                'https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/'
                                                            }
                                                            target="_blank">
                                                            <FormattedMessage id="barn.aleneOmOmsorgen.readMore.avsnitt.lenke" />
                                                        </Link>
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
