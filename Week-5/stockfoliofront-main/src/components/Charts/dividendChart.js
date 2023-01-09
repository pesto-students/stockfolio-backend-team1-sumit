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
  createData("2022-10-03", 5064.3),
  createData("2022-10-04", 5070.97),
  createData("2022-10-06", 5095.49),
  createData("2022-10-07", 5164.16),
  createData("2022-10-10", 5096.86),
  createData("2022-10-11", 5254.97),
  createData("2022-10-12", 5564.13),
  createData("2022-10-13", 5594.71),
  createData("2022-10-14", 5624.63),
  createData("2022-10-17", 5934.17),
  createData("2022-10-18", 5670.12),
  createData("2022-10-19", 5761.86),
  createData("2022-10-20", 5650.17),
  createData("2022-10-20", 5490.99),
  createData("2022-10-21", 5298.8),
  createData("2022-10-25", 5578.33),
  createData("2022-10-26", 5687.18),
  createData("2022-10-27", 5880.56),
  createData("2022-10-28", 5753.81),
  createData("2022-10-31", undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Block Performance</Title>
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
