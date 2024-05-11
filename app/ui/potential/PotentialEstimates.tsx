import { Chart, registerables } from "chart.js";
import { useContext, useEffect, useRef } from "react";
import { PotentialContext } from "~context/PotentialContext";
import { Card } from "~ui/cards/Card";
import { LoadingCard } from "~ui/loading/LoadingCard";

export const PotentialEstimates = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const { isEstimating, estimatesFound, isEstimationError } =
    useContext(PotentialContext);

  console.log({ isEstimating, estimatesFound, isEstimationError });

  useEffect(() => {
    if (!estimatesFound || !containerRef.current) return;
    Chart.register(...registerables);
    const chart = new Chart(containerRef.current, {
      type: "bar",
      data: {
        labels: ["Solar", "Wind", "Total"],
        datasets: [
          {
            label: `Estimated output ${estimatesFound.units}`,
            data: [
              estimatesFound.power_out.solar,
              estimatesFound.power_out.wind,
              estimatesFound.power_out.total,
            ],
            backgroundColor: ["#fef08a", "#22d3ee", "#34d399"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => chart.destroy();
  }, [estimatesFound, containerRef]);

  if (!isEstimating && !estimatesFound && !isEstimationError) {
    return null;
  }

  return (
    <>
      {isEstimating && <LoadingCard text="Loading..." />}
      {isEstimationError && (
        <>
          <p className="text-sm text-orange-400 text-center">
            We couldn't find any power output data for your area!
          </p>
        </>
      )}
      {estimatesFound && (
        <Card className="min-h-[300px] flex flex-col mb-8">
          <canvas ref={containerRef} className="w-full h-[300px]" />
        </Card>
      )}
    </>
  );
};
