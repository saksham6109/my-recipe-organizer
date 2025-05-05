import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const MacroPieChart = ({ macros }) => {
  const data = [
    { name: "Protein", value: macros.protein },
    { name: "Carbs", value: macros.carbs },
    { name: "Fat", value: macros.fat },
  ];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        dataKey="value"
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default MacroPieChart;
