import { AreaChart, linearGradient, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { sortDate } from '../../helper/date';

export const Graphic = ({time = '', startDate, endDate, cashier}) => {

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
            console.log(startDate)
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
        <AreaChart width={730} height={250} data={chart}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {/* <defs>
            <linearGradient id="avgTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="countTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="minTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="maxTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="sumTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
        </defs> */}
        <XAxis dataKey='date'/>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area dataKey="avgTotal" stroke="purple" fillOpacity={0.2} fill="purple" />
        <Area dataKey="countTotal" stroke="black" fillOpacity={0.2} fill="black" />
        <Area dataKey="minTotal" stroke="blue" fillOpacity={0.2} fill="blue" />
        <Area dataKey="maxTotal" stroke="red" fillOpacity={0.2} fill="red" />
        <Area dataKey="sumTotal" stroke="green" fillOpacity={0.2} fill="green" />
        </AreaChart>
    )
}