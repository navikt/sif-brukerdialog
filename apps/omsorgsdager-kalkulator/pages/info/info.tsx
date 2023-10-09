import { BodyLong, Heading, Panel, ReadMore } from "@navikt/ds-react";
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl";
import { FormattedMessage } from "react-intl";

const Info = () => {
  const { formatMessage } = useFeatureToggleIntl();
  return (
    <div className="p-4">
      <Heading level="2" size="large" spacing>
        <FormattedMessage id="info.title" />
      </Heading>
      <BodyLong as="div">
        <FormattedMessage id="info.avsnitt1" />
      </BodyLong>
      <ReadMore
        header={formatMessage("info.readMore.tittel")}
        className="flex flex-col pt-4"
      >
        <BodyLong as="div">
          <FormattedMessage id="info.readMore" />
        </BodyLong>
      </ReadMore>
      <BodyLong as="div">
        <FormattedMessage id="info.avsnitt2" />
      </BodyLong>
    </div>
  );
};

export default Info;
