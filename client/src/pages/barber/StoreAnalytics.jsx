import {
	ComposedChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	LineChart
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getStoreRevenue } from "../../api/store";
import { format, parseISO } from "date-fns";

const StoreAnalytics = () => {
	const shopId = JSON.parse(sessionStorage.getItem("shopId"));

	const { data: weeklyStoreRevenue } = useQuery({
		queryKey: ["weeklyStoreRevenue"],
		queryFn: () => getStoreRevenue(shopId, "weekly")
	});

	const { data: monthlyStoreRevenue } = useQuery({
		queryKey: ["monthlyStoreRevenue"],
		queryFn: () => getStoreRevenue(shopId, "monthly")
	});

	const { data: todaysStoreRevenue } = useQuery({
		queryKey: ["todaysStoreRevenue"],
		queryFn: () => getStoreRevenue(shopId, "today")
	});

	const formattedData = weeklyStoreRevenue?.data.map((revenue) => {
		return {
			day: format(new Date(revenue.day), "eeee"),
			daily_revenue: revenue.daily_revenue,
			customer: revenue.total_customers
		};
	});

	let totalData;
	if (monthlyStoreRevenue) {
		const aggregatedData = monthlyStoreRevenue?.data.reduce((acc, item) => {
			const monthKey = item.month;
			acc[monthKey] = (acc[monthKey] || 0) + item.daily_revenue;
			return acc;
		}, {});

		totalData = Object.keys(aggregatedData).map((month) => ({
			month: format(parseISO(month), "LLL"),
			total_revenue: aggregatedData[month]
		}));
	}

	return (
		<div className="container mx-auto mt-10 border p-4 rounded-md">
			<h2 className="text-2xl font-medium">Store Analytics</h2>
			<div className="mt-4">
				<div className="font-medium text-xl">Weekly Revenue</div>
				<ComposedChart
					className="text-sm mt-4"
					width={730}
					height={250}
					data={formattedData}
					margin={{ top: 30, right: 30, left: 5, bottom: 5 }}>
					<CartesianGrid strokeDasharray="2 2" />
					<XAxis dataKey="day" name="Day" />
					<YAxis dataKey="daily_revenue" />
					<YAxis dataKey="customer" yAxisId="customer" orientation="right" />
					<Tooltip />
					<Legend />
					<Bar
						barSize={20}
						type="monotone"
						dataKey="customer"
						yAxisId="customer"
						name="Total Customers"
						fill="rgb(96 165 250)"
					/>
					<Line
						strokeWidth={2}
						type="monotone"
						dataKey="daily_revenue"
						name="Total Sales(RM)"
						stroke="rgb(99 102 241/1)"
					/>
				</ComposedChart>
			</div>
			<div className="mt-4">
				<div className="font-medium text-xl">Monthly Revenue</div>
				<LineChart
					className="mt-2 text-sm"
					width={730}
					height={250}
					data={totalData}
					margin={{ top: 30, right: 30, left: 5, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />

					<Line
						strokeWidth={2}
						type="monotone"
						dataKey="total_revenue"
						name="Total Revenue(RM)"
						stroke="rgb(99 102 241/1)"
					/>
				</LineChart>
			</div>

			<div className="mt-4 ">
				<div className="font-medium text-xl">Daily Revenue</div>
				<div className="border-2 p-2 rounded-md border-gray-200/60 w-1/2 mt-2">
					<div className="font-medium text-gray-700">
						Total Sales:{" "}
						<span className="text-gray-900">
							RM {todaysStoreRevenue?.data[0].total_sales_today}
						</span>
					</div>
					<div className="font-medium text-gray-700">
						Total Customer:{" "}
						<span className="text-gray-900">
							{todaysStoreRevenue?.data[0].total_customers}{" "}
							{todaysStoreRevenue?.data[0].total_customers > 1
								? "Customers"
								: "Customer"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoreAnalytics;
