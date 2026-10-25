import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const trendData = [
  { month: 'Apr', risk: 48 },
  { month: 'May', risk: 45 },
  { month: 'Jun', risk: 51 },
  { month: 'Jul', risk: 46 },
  { month: 'Aug', risk: 44 },
  { month: 'Sep', risk: 42 },
];

function BurnoutTrend() {
  return (
    <section className="dashboard-chart-card">
      <div className="dashboard-chart-header">
        <div>
          <h2>Burnout Risk Trend</h2>
          <p>Your burnout risk over the selected period.</p>
        </div>

        <span className="chart-current-value">
          42%
        </span>
      </div>

      <div className="burnout-trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={trendData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, 'Burnout Risk']}
            />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#315ecb"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default BurnoutTrend;