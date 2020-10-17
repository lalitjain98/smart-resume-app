import React from 'react';
import { Radar } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import { Tableau20 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau';


const generateDataObject = ({ dataArray = [], labelsArray = [] }) => ({
  labels: labelsArray,
  datasets: [{
    label: '',
    // backgroundColor: 'rgba(179,181,198,0.2)',
    // borderColor: 'rgba(179,181,198,1)',
    // pointBackgroundColor: 'rgba(179,181,198,1)',
    // pointBorderColor: '#fff',
    // pointHoverBackgroundColor: '#fff',
    // pointHoverBorderColor: 'rgba(179,181,198,1)',
    data: dataArray,
  }],
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
  },
}));

export default function ({ skills = [] }) {
  const classes = useStyles();

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (skills) {
      setData(generateDataObject({
        dataArray: skills.map((item) => item.rating),
        labelsArray: skills.map((item) => item.title),
      }));
    }
  }, [skills]);

  return (
    <Box className={classes.root}>
      {/* <h2>Doughnut Chart</h2> */}
      <Radar
        data={data}
        options={{
          plugins: {
            colorschemes: {
              scheme: Tableau20,
            },
          },
          scale: {
            ticks: {
              beginAtZero: true,
              max: 5,
              stepSize: 0.5,
            },
          },
        }}
      />
    </Box>
  );
}
