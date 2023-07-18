import { useEffect, useState } from "react";
import axios from "axios";
import { Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function MonthlyRevenueChart() {
  const [revenueData, setRevenueData] = useState([]);
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get("https://travel2h.click/public_html/api/analytic/revenueData");
        setRevenueData(response.data);
        console.log(revenueData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRevenueData();
  }, [revenueData]);

  const labels = revenueData.map((data) => `${data.month}/${data.year}`);
  const dataset = revenueData.map((data) => data.user_count);

  const chartData = {
    labels: Array.from(Array(revenueData.length).keys()),
    datasets: [
      {
        label: "Số lượng người dùng đăng ký hàng tháng",
        data: dataset,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          callback: (value, index) => labels[index],
        },
      },
    },
  };

  
  return (
    <div>
      <Bar data={chartData} options={chartOptions} style={{width:'300px',height:'300px',marginTop:'20px'}}/>
    </div>
  );
}

export default MonthlyRevenueChart;
