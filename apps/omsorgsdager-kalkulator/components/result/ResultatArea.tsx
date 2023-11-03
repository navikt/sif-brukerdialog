import { FormattedMessage } from 'react-intl';
import { caseResultViewOf, ResultView } from './ResultView';
import ResultBox from './ResultBox';
import { BodyLong, Box, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import Link from 'next/link';
import { getYear } from '../../utils/utils';
import { lenker } from '../../utils/lenker';
import { Result } from '../kalkulator/Kalkulator';

interface Props {
    resultView: ResultView<Result>;
}

const ResultatArea: React.FC<Props> = ({ resultView }: Props) => {
    const year = getYear();
    return caseResultViewOf(
        () => null,
        () => (
            <ResultBox type={'WARNING'}>
                <Heading level="2" size="medium" className="pb-3">
                    <FormattedMessage id={'resultat-area.title'} />
                </Heading>
                <BodyLong className="pb-3 text-justify" size="small">
                    <FormattedMessage id={'resultat-area.orange.1'} />
                </BodyLong>

                <BodyLong size="large" weight="semibold">
                    <FormattedMessage id={'resultat-area.orange.2.1.a'} />
                </BodyLong>

                <BodyLong className="pb-3 text-justify" size="small">
                    <FormattedMessage id={'resultat-area.orange.2.1.b'} values={{ year }} />
                </BodyLong>

                <BodyLong className="pb-3 text-justify" size="small">
                    <FormattedMessage id={'resultat-area.orange.3'} />
                </BodyLong>
                <BodyLong size="small">
                    <Link href={lenker.omsorgspengerNavno}>
                        <FormattedMessage id={'resultat-area.tilbake-til-omsorgspenger'} />
                    </Link>
                </BodyLong>
            </ResultBox>
        ),
        (result: Result) => {
            const { grunnrett, kroniskSykt, aleneomsorg, aleneomsorgKroniskSykeSumm, antallBarn } =
                result.omsorgsprinsipper;

            return (
                <>
                    <ResultBox type={'SUCCESS'}>
                        <Heading level="2" size="medium" className="pb-3">
                            <FormattedMessage id={'resultat-area.title'} />
                        </Heading>
                        <BodyLong className="pb-3 text-justify" size="small">
                            <FormattedMessage id={'resultat-area.green.1'} />
                        </BodyLong>
                        <VStack gap="4">
                            <Box borderRadius="large" padding={'5'} background="surface-success-moderate">
                                <Heading level="2" size="medium">
                                    <FormattedMessage
                                        id={'resultat-area.green.2.1.a'}
                                        values={{ result: result.sumDager }}
                                    />{' '}
                                    <FormattedMessage id={'resultat-area.green.2.1.b'} values={{ year }} />
                                </Heading>
                            </Box>

                            <div className="subtle-card">
                                <ExpansionCard aria-label="default-demo" className="mb-8">
                                    <ExpansionCard.Header className="bg-indigo-500">
                                        <ExpansionCard.Title size="small">Slik er det regnet ut</ExpansionCard.Title>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <div className="flex justify-between">
                                            <FormattedMessage
                                                id={'resultat-area.green.grunnrett'}
                                                values={{
                                                    antallBarn,
                                                }}
                                            />
                                            <span className="font-extrabold text-right">
                                                <FormattedMessage
                                                    id={'resultat-area.green.dager'}
                                                    values={{
                                                        antallDager: grunnrett,
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        <div className="flex justify-between pb-3">
                                            <FormattedMessage
                                                id={'resultat-area.green.aleneomsorg'}
                                                values={{
                                                    antallBarn,
                                                }}
                                            />
                                            <span className="font-extrabold text-right">
                                                <FormattedMessage
                                                    id={'resultat-area.green.dager'}
                                                    values={{
                                                        antallDager: aleneomsorg,
                                                    }}
                                                />
                                            </span>
                                        </div>

                                        {kroniskSykt.length > 0 && (
                                            <>
                                                <hr />
                                                <div className="pt-3 pb-3">
                                                    {kroniskSykt.map((b) => {
                                                        return (
                                                            <div className="flex justify-between" key={b.barnIndex}>
                                                                <FormattedMessage
                                                                    id={'resultat-area.green.barnKroniskSyk'}
                                                                    values={{ navn: antallBarn > 1 ? b.barnIndex : '' }}
                                                                />
                                                                <span className="font-extrabold text-right">
                                                                    <FormattedMessage
                                                                        id={'resultat-area.green.dager'}
                                                                        values={{
                                                                            antallDager: b.antallDager,
                                                                        }}
                                                                    />
                                                                </span>
                                                            </div>
                                                        );
                                                    })}

                                                    {aleneomsorgKroniskSykeSumm > 0 && (
                                                        <div className="flex justify-between">
                                                            <FormattedMessage id={'resultat-area.green.aleneomsorg'} />
                                                            <span className="font-extrabold text-right">
                                                                <FormattedMessage
                                                                    id={'resultat-area.green.dager'}
                                                                    values={{
                                                                        antallDager: aleneomsorgKroniskSykeSumm / 2,
                                                                    }}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        <hr />
                                        <div className="flex justify-between pt-3 pb-3">
                                            <FormattedMessage id={'resultat-area.green.totalt'} />
                                            <span className="font-extrabold text-right">
                                                <FormattedMessage
                                                    id={'resultat-area.green.dager'}
                                                    values={{
                                                        antallDager: result.sumDager,
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        <hr />
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </div>
                        </VStack>
                        <BodyLong className="pb-9 text-justify" size="small">
                            <FormattedMessage id={'resultat-area.green.3.1'} values={{ year }} />
                        </BodyLong>
                        <BodyLong size="small">
                            <Link href={lenker.omsorgspengerNavno}>
                                <FormattedMessage id={'resultat-area.tilbake-til-omsorgspenger'} />
                            </Link>
                        </BodyLong>
                    </ResultBox>
                </>
            );
        },
    )(resultView);
};

export default ResultatArea;
