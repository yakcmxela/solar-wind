import { Link } from "@remix-run/react";

import { Card } from "~ui/cards/Card";
import { Incentive, IncentiveCategory } from "~types/Incentives";

export const IncentivesItem = ({
  color,
  found,
  selected,
}: {
  color: string;
  found?: Incentive[];
  selected: IncentiveCategory;
}) => {
  return (
    <Card className="min-h-[300px] flex flex-col">
      {(found || []).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2 capitalize">
            {selected.display_name} incentives
          </h2>
          <ul>
            {found!.map((incentive) => (
              <li key={incentive.id}>
                <h3 className="text-md mb-2 mt-4 font-bold">
                  {incentive.name}:
                </h3>
                <div className={`px-3 py-2 mb-2 rounded-lg shadow ${color}`}>
                  <div>
                    <p className="text-sm mb-1">
                      <strong>Description</strong>
                    </p>
                    <p className="text-sm my-1">{incentive.description}</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1 mt-2">
                      <strong>Eligibility</strong>
                    </p>
                    <p className="text-sm my-1">{incentive.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1 mt-2">
                      <strong>Requirements</strong>
                    </p>
                    <p className="text-sm my-1">{incentive.requirements}</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1 mt-2">
                      <strong>More info:</strong>
                    </p>
                    <Link
                      target="_blank"
                      to={incentive.source}
                      className="text-sm text-blue-600"
                    >
                      {incentive.source}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
