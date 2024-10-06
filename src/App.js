import { Box, GlobalStyles } from '@mui/material';
import './App.css';
import Header from './Common/Header/header';
import Home from './Home';

function App() {
  return (

     <>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: 'rgb(40,44,52)', 
            margin: 0, 
            padding: 0,
            height: '100%',
          },
        }}
      />
      <Box>
        <Header />
        <Home />
      </Box>
    </>
  );
}

export default App;
