import { Chart, registerables } from "chart.js";
import { useContext, useEffect, useRef } from "react";
import { PotentialContext } from "~context/PotentialContext";
import { Card } from "~ui/cards/Card";
import { LoadingCard } from "~ui/loading/LoadingCard";

export const PotentialEstimates = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const { isEstimating, estimatesFound, isEstimationError } =
    useContext(PotentialContext);

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
    <Card className="min-h-[300px] flex flex-col">
      {isEstimating && <LoadingCard text="Loading..." />}
      {isEstimationError && (
        <>
          <h2 className="text-2xl font-bold mb-2">Sorry!</h2>
          <p className="text-sm">
            We couldn't find any power output data for your area!
          </p>
        </>
      )}
      {estimatesFound && (
        <canvas ref={containerRef} className="w-full h-[300px]" />
      )}
    </Card>
  );
};
