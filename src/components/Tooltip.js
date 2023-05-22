import React from 'react'
import './Tooltip.css'

export const Tooltip = ({tooltipInfo}) => {

  if (!tooltipInfo.x) {
    return null;
  }

  return (
    <div 
        className={'viz-tooltip'}
        style={{
            left: tooltipInfo.x,
            top: tooltipInfo.y
        }}
    >
        {tooltipInfo.tooltipString}
    </div>
  )
}
