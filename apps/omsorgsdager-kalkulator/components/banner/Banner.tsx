import { Heading } from "@navikt/ds-react";
import { format, parse } from "date-fns";
import { nb } from "date-fns/locale";
import React from "react";

import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl";
import { CalculatorSquareIcon } from "../icons/CalculatorSquareIcon";

const dato = new Date();

const Banner = () => {
  const { formatMessage } = useFeatureToggleIntl();
  return (
    <header className="bg-[#ffffff] border-b-deepblue-400 border-b-4 text-center px-4 md:px-12 py-6">
      <div className="max-w-[1128px] mx-auto flex gap-8">
        <CalculatorSquareIcon />
        <div>
          <Heading
            size="large"
            level="1"
            aria-label={formatMessage("banner.title")}
          >
            {formatMessage("banner.title")}
          </Heading>
          <div className="flex gap-4 py-3 items-baseline">
            <p className="text-sm">{formatMessage("banner.description")}</p>
            <p aria-hidden="true" className="text-gray-600">
              |
            </p>
            <p className="text-gray-600 text-sm">
              {formatMessage("banner.updated")}{" "}
              {format(dato, "dd. MMMM yyyy", { locale: nb })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
