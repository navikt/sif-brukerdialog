import { FormattedMessage } from "react-intl";
import { caseResultViewOf, ResultView } from "./ResultView";
import ResultBox from "./ResultBox";
import { BodyLong, Heading } from "@navikt/ds-react";
import Link from "next/link";
import { getYear } from "@/utils/utils";
import { lenker } from "@/utils/lenker";

interface Props {
  resultView: ResultView<number>;
}

const ResultatArea: React.FC<Props> = ({ resultView }: Props) => {
  const year = getYear();
  return caseResultViewOf(
    () => null,
    () => (
      <ResultBox type={"WARNING"}>
        <Heading level="2" size="medium" className="pb-3">
          <FormattedMessage id={"resultat-area.title"} />
        </Heading>
        <BodyLong className="pb-3 text-justify" size="small">
          <FormattedMessage id={"resultat-area.orange.1"} />
        </BodyLong>

        <BodyLong size="large" weight="semibold">
          <FormattedMessage id={"resultat-area.orange.2.1.a"} />
        </BodyLong>

        <BodyLong className="pb-3 text-justify" size="small">
          <FormattedMessage
            id={"resultat-area.orange.2.1.b"}
            values={{ year }}
          />
        </BodyLong>

        <BodyLong className="pb-3 text-justify" size="small">
          <FormattedMessage id={"resultat-area.orange.3"} />
        </BodyLong>
        <BodyLong size="small">
          <Link href={lenker.omsorgspengerNavno}>
            <FormattedMessage id={"resultat-area.tilbake-til-omsorgspenger"} />
          </Link>
        </BodyLong>
      </ResultBox>
    ),
    (result: number) => {
      return (
        <>
          <ResultBox type={"SUCCESS"}>
            <Heading level="2" size="medium" className="pb-3">
              <FormattedMessage id={"resultat-area.title"} />
            </Heading>

            <BodyLong className="pb-3 text-justify" size="small">
              <FormattedMessage id={"resultat-area.green.1"} />
            </BodyLong>

            <BodyLong size="large" weight="semibold">
              <FormattedMessage
                id={"resultat-area.green.2.1.a"}
                values={{ result }}
              />
            </BodyLong>

            <BodyLong className="pb-3 text-justify" size="small">
              <FormattedMessage
                id={"resultat-area.green.2.1.b"}
                values={{ year }}
              />
            </BodyLong>

            <BodyLong className="pb-3 text-justify" size="small">
              <FormattedMessage
                id={"resultat-area.green.3.1"}
                values={{ year }}
              />
            </BodyLong>
            <BodyLong size="small">
              <Link href={lenker.omsorgspengerNavno}>
                <FormattedMessage
                  id={"resultat-area.tilbake-til-omsorgspenger"}
                />
              </Link>
            </BodyLong>
          </ResultBox>
        </>
      );
    }
  )(resultView);
};

export default ResultatArea;
