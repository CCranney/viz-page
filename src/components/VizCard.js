import React from 'react'
import { Card, CardBody } from 'reactstrap'

export const VizCard = ({ name, visual }) => {

  return (
    <Card>
        <CardBody>
            {visual}
        </CardBody>
    </Card>
  )
}
