import React from "react";
import { Link } from "react-router";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartBox = ({ users }) => {
  return (
    <div className="flex mt-4 items-center">
      <div className="box-info flex flex-2 flex-col gap-10">
        <div className="title flex flex-col justify-center ">
          {/* <img src="" alt="" /> */}
          <span>Total Number of Sales</span>
        </div>
        <div>
          <h1 className="text-green-700">{users}</h1>
          <Link to={"#"} className="text-sm font-bold text-blue-600">
            View All
          </Link>
        </div>
      </div>

      <div className="chartinfo flex flex-2 flex-col justify-between text-right">
        <div className="chart h-50 w-[100%]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage">45%</span>
          <span className="duration">This Month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
