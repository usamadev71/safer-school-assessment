import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SurveyService } from "../../services";
import { _generateRandomColor } from "../../utils";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Total Responses by Users",
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarGraph = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchTotalResponses = async () => {
      const apiRes: any = await SurveyService.getTotalResponsesByUser();

      if (apiRes.status) {
        setData(apiRes.data);
      }
    };

    fetchTotalResponses();
  }, []);

  const labels = (data && Object.keys(data?.responses)) ?? [];

  const dataSet = {
    labels,
    datasets:
      (data &&
        Object.keys(data.responses).map((user: any) => ({
          label: data.responses[user][0].completedBy,
          data: { max: data.responses[user].length },
          backgroundColor: _generateRandomColor(),
        }))) ??
      [],
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
      <Bar data={dataSet} options={options} />
    </div>
  );
};
