import React from 'react'
import {
    Pie,
    PieChart,
    Tooltip,
    Cell,
    Legend,
    ResponsiveContainer,

} from "recharts"
import CustomTooltip from "../Charts/CustomTooltip"
import CustomLegend from "../Charts/CustomLegend"

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <ResponsiveContainer width="100%" height={380}>

            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    Cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={CustomTooltip} />
                <Legend content={CustomLegend} />


                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor='middle'
                            fill="#666"
                            fontSize="14px"
                        >
                            {label}
                        </text>


                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor='middle'
                            fill="#333"
                            fontSize="14px"
                            fontWeight="semi-bold"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}

            </PieChart>
        </ResponsiveContainer >
    )
}

export default CustomPieChart