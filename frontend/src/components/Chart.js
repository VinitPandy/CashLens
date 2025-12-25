import React from 'react'
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement, 
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useGlobalContext } from '../context/globalContext'
import { dateFormat } from '../utils/dateFormat' 

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement, 
)

function Chart() {
    const { expenses } = useGlobalContext()

    const data = {
        labels: expenses.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                borderColor: 'red',
                tension: 0.2
            }
        ]
    }

    return (
        <div style={{background: '#FCF6F9', border: '2px solid #FFFFFF', boxShadow: '0px 1px 15px rgba(0,0,0,0.06)', padding: '1rem', borderRadius: '20px', height: '100%'}}>
            <Line data={data} />
        </div>
    )
}

export default Chart