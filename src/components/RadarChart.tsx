import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

interface RadarChartProps {
    flavorProfile: {
        acidity: number;
        bitterness: number;
        sweetness: number;
        body: number;
        aftertaste: number;
    };
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart: React.FC<RadarChartProps> = ({ flavorProfile }) => {
    const data = {
        labels: ['酸味', '苦味', '甘味', 'ボディ', '余韻'],
        datasets: [
            {
                label: '風味プロフィール',
                data: [
                    flavorProfile.acidity,
                    flavorProfile.bitterness,
                    flavorProfile.sweetness,
                    flavorProfile.body,
                    flavorProfile.aftertaste,
                ],
                backgroundColor: 'rgba(218, 165, 32, 0.2)',
                borderColor: 'rgba(218, 165, 32, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                ticks: {
                    display: true,
                    beginAtZero: true,
                    stepSize: 1, // ステップサイズを指定
                    max: 5, // 5までのスケールに設定
                },
                angleLines: {
                    display: true, // 放射状の角度線の表示設定
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)', // グリッド線の色
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return <Radar data={data} options={options as any} />;
};

export default RadarChart;
