import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Button } from "@mui/material";

function OrderTourCount() {
  const [chartData, setChartData] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourOrders, setTourOrders] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://travel2h.click/public_html/api/analytic/getOrderTour"
      ); // Thay đổi đường dẫn API tương ứng

      if (response.status === 200) {
        const data = response.data;
        const chartData = processChartData(data);
        setChartData(chartData);
        setData(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const processChartData = (data) => {
    const labels = [];
    const orderCounts = [];

    data.forEach((tour) => {
      const shortenedName = tour.tour_name.substring(0, 20) + "...";
      labels.push(shortenedName);

      let totalOrderCount = 0;
      tour.order_count_by_date.forEach((item) => {
        totalOrderCount += item.order_count;
      });

      orderCounts.push(totalOrderCount);
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Total Orders",
          data: orderCounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const handleTourClick = (event, elements) => {
    if (elements.length > 0) {
      const tourIndex = elements[0].index;
      const selectedTour = data[tourIndex];
      setSelectedTour(selectedTour);

      const orderCounts = selectedTour.order_count_by_date.map(
        (item) => item.order_count
      );

      const selectedTourChartData = {
        labels: selectedTour.order_count_by_date.map((item) => item.date_go),
        datasets: [
          {
            label: "Total Orders",
            data: orderCounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };

      setTourOrders(selectedTourChartData);
    }
  };

  const handleGoBack = () => {
    setSelectedTour(null);
    setTourOrders(null);
  };

  return (
    <div>
      {chartData ? (
        <>
          {selectedTour && tourOrders ? (
            <>
              <h2>Selected Tour: {selectedTour.tour_name}</h2>
              <Button variant="contained" onClick={handleGoBack}>Go Back</Button>
              <Bar data={tourOrders} options={{ responsive: true }} />
            </>
          ) : (
            <>
              <h2>Total Order Counts by Tour</h2>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  onClick: handleTourClick,
                }}
              />
            </>
          )}
        </>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default OrderTourCount;
