import React from 'react'
import PropTypes from 'prop-types'
import MuiTypography from '@material-ui/core/Typography';

const Typography = ({children, ...props}) => {
  return children instanceof String && children.length === 0 ? (
      <MuiTypography>
        {}
      </MuiTypography>
    ) : (
      <MuiTypography {...props} >
        { children }
      </MuiTypography>
    )
}

export default Typography;