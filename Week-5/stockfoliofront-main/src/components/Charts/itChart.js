import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "../Title/Title.js";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("2022-10-01", 18744.5),
  createData("2022-10-02", 18744.97),
  createData("2022-10-05", 18744.49),
  createData("2022-10-06", 18744.16),
  createData("2022-10-07", 18744.86),
  createData("2022-10-08", 18744.97),
  createData("2022-10-09", 18851.13),
  createData("2022-10-12", 18834.71),
  createData("2022-10-13", 18744.63),
  createData("2022-10-14", 18762.17),
  createData("2022-10-15", 18945.12),
  createData("2022-10-16", 18862.86),
  createData("2022-10-19", 18890.17),
  createData("2022-10-20", 18944.99),
  createData("2022-10-21", 18897.8),
  createData("2022-10-22", 18944.33),
  createData("2022-10-23", 18967.18),
  createData("2022-10-26", 18978.21),
  createData("2022-10-27", 18950.81),
  createData("2022-10-28", 18899.56),
  createData("2022-10-29", undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Price (₹)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
