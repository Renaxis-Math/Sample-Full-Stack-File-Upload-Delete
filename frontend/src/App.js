import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import MainComponent from './components/MainComponent'

function App() {
  return (
      <ChakraProvider>
        <Box 
          textAlign = "center" 
          fontSize = "2xl" 
          m = "3rem auto" 
          p = {5} 
          maxW = {700}
        >
          <MainComponent />
        </Box>
      </ChakraProvider>
  );
}

export default App;
