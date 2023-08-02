import { AreaChart, linearGradient, XAxis, YAxis, Area, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { sortDate } from '../../helper/date';

export const Graphic = ({time = '', startDate ='', endDate='', cashier=''}) => {

    const token = localStorage.getItem('token');
    const [ chart, setChart ] = useState([])

    const handleChart = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/report/sales?time=${time}&startDate=${startDate}&endDate=${endDate}&cashier=${cashier}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(data.result);
            setChart(data.result);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        handleChart()
    }, []);
    
    useEffect(() => {
        handleChart()
        console.log(startDate)
    }, [time, startDate, endDate, cashier]);

    return (
        // <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={950} height={400} data={chart}>
            <XAxis dataKey='date' padding={{left: 30}} />
            <YAxis dataKey='sumTotal' domain={[0, 'dataMax']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend verticalAlign='bottom' />
            <Tooltip contentStyle={{color: 'white', backgroundColor: 'black'}} />
            <Area dataKey="avgTotal" stroke="pink" fillOpacity={0.2} fill="pink" />
            <Area dataKey="countTotal" stroke="yellow" fillOpacity={0.2} fill="yellow" />
            <Area dataKey="minTotal" stroke="cyan" fillOpacity={0.2} fill="cyan" />
            <Area dataKey="maxTotal" stroke="red" fillOpacity={0.2} fill="red" />
            <Area dataKey="sumTotal" stroke="green" fillOpacity={0.2} fill="green" />
            </AreaChart>

        // </ResponsiveContainer>
    )
}