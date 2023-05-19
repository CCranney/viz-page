import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibility } from '../store/slices/visibilitySlice';

import './VizCard.css'

export const VizCard = ({ name, visual, i }) => {
  const isVisible = useSelector(state => state.visibility[i]);
  const dispatch = useDispatch();  
  const seenVisual = isVisible ? visual : (<div className='demo'>{name}</div>);
  return (
    <Card className='viz-card' onClick={() => {
      dispatch(changeVisibility(i));
    }}>
        <CardBody>
            {seenVisual}
        </CardBody>
    </Card>
  )
}
