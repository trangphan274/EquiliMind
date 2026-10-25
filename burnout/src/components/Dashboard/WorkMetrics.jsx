import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const weeklyData = [
  { week: 'Week 1', workload: 65, overtime: 12 },
  { week: 'Week 2', workload: 72, overtime: 16 },
  { week: 'Week 3', workload: 78, overtime: 21 },
  { week: 'Week 4', workload: 72, overtime: 18 },
];

function WorkMetrics() {
  const metrics = [
    {
      label: 'Satisfaction',
      value: '78%',
      description: 'Job satisfaction score',
    },
    {
      label: 'Workload',
      value: '72',
      description: 'Workload score',
    },
    {
      label: 'Collaboration',
      value: '85%',
      description: 'Collaboration score',
    },
    {
      label: 'Project Completion',
      value: '88%',
      description: 'Completion rate',
    },
  ];

  return (
    <section className="work-metrics-section">
      <div className="work-metrics-header">
        <div>
          <h2>Work & Well-being Metrics</h2>
          <p>
            Key indicators from your latest assessment.
          </p>
        </div>
      </div>

      <div className="work-metrics-layout">
        {/* Actual model features */}
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <div className="metric-item" key={metric.label}>
              <span className="metric-item-label">
                {metric.label}
              </span>

              <strong className="metric-item-value">
                {metric.value}
              </strong>

              <span className="metric-item-description">
                {metric.description}
              </span>
            </div>
          ))}
        </div>

        {/* Workload & overtime */}
        <div className="workload-chart">
          <div className="workload-chart-header">
            <h3>Workload & Overtime</h3>
            <span>Last 4 weeks</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={weeklyData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="workload"
                name="Workload"
                fill="#315ecb"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="overtime"
                name="Overtime (h)"
                fill="#8da9e8"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default WorkMetrics;