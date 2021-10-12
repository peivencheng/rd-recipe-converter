import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SubmitJob from './SubmitJob/SubmitJob';
import QueryJob from './QueryJob/QueryJob';


export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Job Submission" value="1" />
            <Tab label="Job Query" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><SubmitJob></SubmitJob></TabPanel>
        <TabPanel value="2"><QueryJob></QueryJob></TabPanel>
      </TabContext>
    </Box>
  );
}
