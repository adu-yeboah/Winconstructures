'use client'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Widgets } from '../../components/Widgets'
import widgetsData from '@/constants/widgets'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const barData = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: [1200, 1900, 3000, 500, 2000, 3000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }
  ]
}

const lineData = {
  labels,
  datasets: [
    {
      label: 'Visitors',
      data: [300, 400, 450, 380, 600, 700],
      borderColor: '#4bc0c0',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    }
  ]
}

function Home() {
  return (
    <>
      {/* WIDJETS */}

      <div className="flex flex-wrap my-9 gap-4">

        {widgetsData.map((widget, index) => (
          <Widgets
            key={index}
            icon={widget.icon}
            title={widget.title}
            figure={widget.figure}
            link={widget.link}
            linkText={widget.linkText}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Bar Chart</h2>
          <Bar data={barData} />
        </div>
        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Visitors Line Chart</h2>
          <Line data={lineData} />
        </div>
      </div>
    </>
  )
}

export default Home