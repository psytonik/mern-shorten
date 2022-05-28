import moment from "moment";
import React from 'react';
import {Line} from 'react-chartjs-2';
import {MONTHS_ARR} from '../constants/months.js';

const LinkChart = ({link}) => {

	const months = link.clicksDate.map((mon) => moment(mon).format("MMM"));
	const clickCountByMonth = MONTHS_ARR.map(
		(month) => months.filter((m) => m === month).length
	);

	return <div style={{width:'100%',height:'500px'}}>
		<h2 className="text-center mt-3">Click Statistics</h2>
		<Line
			type="line"
			data={{
				labels:MONTHS_ARR,
				datasets: [
					{
						label:'clicks',
						data:clickCountByMonth,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor:'rgba(255, 99, 132, 1)',
						borderWidth: 3
					}
				]
			}}
			options={{
				maintainAspectRatio:false,
				responsive:true,
				scales: {
					y: {beginAtZero: true}
				}
			}}
		/>
	</div>
}


export default LinkChart;
