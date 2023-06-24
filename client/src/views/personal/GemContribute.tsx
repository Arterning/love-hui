import React, { useState, useEffect } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

const heatmapData = [
    { date: '2022-01-09', count: 10 },
    { date: '2022-06-15', count: 2 },
]

const gemContribute : React.FC = () => {
    return (
        <div>
          <h2>生命在于运动 - 健身记录</h2>
        <div>
      <CalendarHeatmap
        startDate={new Date('2022-01-01')}
        endDate={new Date('2022-12-31')}
        values={heatmapData}
        showWeekdayLabels={true}
      />
    </div>
        </div>
    )
}

export default gemContribute
