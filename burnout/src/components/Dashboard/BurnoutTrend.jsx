
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BurnoutTrend({ trend }) {
  const chartData = (trend || []).map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    burnoutRisk: Number(
      item.burnoutRisk
    ) * 100,
  }));

  return (
    <section className="dashboard-section">

      <div className="dashboard-section-header">
        <div>
          <h2>Burnout Risk Trend</h2>
          <p>
            Your burnout risk across previous assessments.
          </p>
        </div>
      </div>

      <div className="dashboard-chart">

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) =>
                `${value}%`
              }
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(1)}%`,
                "Burnout Risk",
              ]}
            />

            <Line
              type="monotone"
              dataKey="burnoutRisk"
              stroke="#315ecb"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
}

export default BurnoutTrend;
