import { AreaChart, linearGradient, XAxis, YAxis, Area, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Bar, BarChart } from 'recharts'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { sortDate } from '../../helper/date';
import { useSelector } from 'react-redux';
import { Error404 } from '../error404';
import { convertToRp } from '../../helper/rupiah';

export const Graphic = ({time = '', cashier=''}) => {

    const token = localStorage.getItem('token');
    const [ chart, setChart ] = useState([]);
    const [ checkError, setCheckError ] = useState(false)
    const { startDate, endDate, refresh } = useSelector((state) => state.reportSlice.value)

    const handleChart = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/report/sales?time=${time}&startDate=${startDate}&endDate=${endDate}&cashier=${cashier}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            setChart(data.result);
            setCheckError(true);
        } catch (err) {
            setCheckError(false)
            console.log(err);
        }
    }
    
    useEffect(() => {
        handleChart()
    }, [refresh]);
    
    useEffect(() => {
        handleChart()
        console.log(startDate)
    }, [time, cashier]);

    return (
        checkError ? (
            <ResponsiveContainer>
                <AreaChart width={950} height={400} data={chart}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey='date' />
                <YAxis dataKey='sumTotal' domain={[0, 'dataMax']} />
                <CartesianGrid strokeDasharray="5 5" />
                <Legend verticalAlign='bottom' />
                <Tooltip contentStyle={{color: 'white', backgroundColor: 'black'}} />
                <Area dataKey={() => convertToRp("avgTotal")} stroke="pink" fillOpacity={0.2} fill="pink" />
                <Area dataKey="countTotal" stroke="yellow" fillOpacity={0.2} fill="yellow" />
                <Area dataKey="minTotal" stroke="cyan" fillOpacity={0.2} fill="cyan" />
                <Area dataKey="maxTotal" stroke="red" fillOpacity={0.2} fill="red" />
                <Area dataKey="sumTotal" stroke="green" fillOpacity={0.2} fill="green" />
                </AreaChart>
                {/* // <AreaChart width={950} height={400} data={chart}>
                // <XAxis dataKey='date' />
                // <YAxis dataKey='sumTotal' domain={[0, 'dataMax']} />
                // <CartesianGrid strokeDasharray="3 3" />
                // <Legend verticalAlign='bottom' />
                // <Tooltip contentStyle={{color: 'white', backgroundColor: 'black'}} />
                // <Area dataKey="avgTotal" stroke="pink" fillOpacity={0.2} fill="pink" />
                // <Area dataKey="countTotal" stroke="yellow" fillOpacity={0.2} fill="yellow" />
                // <Area dataKey="minTotal" stroke="cyan" fillOpacity={0.2} fill="cyan" />
                // <Area dataKey="maxTotal" stroke="red" fillOpacity={0.2} fill="red" />
                // <Area dataKey="sumTotal" stroke="green" fillOpacity={0.2} fill="green" />
                // </AreaChart> */}
            </ResponsiveContainer>
        ) : (
            <Error404 />
        )
    )
}