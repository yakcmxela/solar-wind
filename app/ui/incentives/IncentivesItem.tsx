import { Link } from "@remix-run/react";

import { Card } from "~ui/cards/Card";
import { Incentive } from "~types/IncentivesResponse";
import { LoadingCard } from "~ui/loading/LoadingCard";

export const IncentivesItem = ({
  color,
  incentives,
  category,
  isError,
  isLoading,
}: {
  color: string;
  incentives?: Incentive[];
  category: string;
  isError: boolean;
  isLoading: boolean;
}) => {
  return (
    <Card className="min-h-[300px] flex flex-col">
      {isLoading && <LoadingCard text="Loading..." />}
      {isError ||
        (!isError && incentives && incentives.length === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Sorry!</h2>
            <p className="text-sm">
              We couldn't find any {category} data for your area!
            </p>
          </>
        ))}
      {(incentives || []).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2 capitalize">
            {category} incentives
          </h2>
          <ul>
            {incentives!.map((incentive) => (
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
