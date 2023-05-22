import React from 'react'
import { Button, Card, CardBody, CardFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibility } from '../store/slices/visibilitySlice';
import { deactivateTooltip } from '../store/slices/tooltipSlice';
import './VizCard.css'

export const VizCard = ({ name, visual, i, linkText, link }) => {
  const isVisible = useSelector(state => state.visibility[i]);
  const dispatch = useDispatch();  
  const seenVisual = isVisible ? visual : (<div className='demo'>{name}</div>);
  const seenDataLink = isVisible ? 
    (
      <CardFooter>
        data from <a href={link} target='_blank'>{linkText}</a>
      </CardFooter> 
    ) : null;

  const collapseVisualText = isVisible ? 'Click to Collapse' : 'Click to Expand';
  return (
    <Card className='viz-card' >
        <Button onClick={() => {
          dispatch(changeVisibility(i));
          dispatch(deactivateTooltip());
        }}>
          {collapseVisualText}
        </Button>
        <CardBody >
            {seenVisual}
            {seenDataLink}
        </CardBody>
    </Card>
  )
}
