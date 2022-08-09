import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { SurveyService } from "../../services";
import { _generateRandomColor } from "../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CircleGraph = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchTotalResponses = async () => {
      const apiRes: any = await SurveyService.getTotalResponsesByQuestion();

      if (apiRes.status) {
        setData(apiRes.data);
      }
    };

    fetchTotalResponses();
  }, []);

  const dataSet = {
    labels: (data && Object.keys(data?.responses)) ?? [],
    datasets: [
      {
        label: "# of Votes",
        data:
          (data &&
            Object.keys(data?.responses)?.map(
              (resp: any) => data.responses[resp].length
            )) ??
          [],
        backgroundColor:
          (data &&
            Object.keys(data?.responses)?.map((resp: any) =>
              _generateRandomColor()
            )) ??
          [],
        borderColor:
          (data &&
            Object.keys(data?.responses)?.map((resp: any) =>
              _generateRandomColor()
            )) ??
          [],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid #ddd",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pie data={dataSet} />;
    </div>
  );
};
