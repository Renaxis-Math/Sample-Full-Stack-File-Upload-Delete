import React from 'react';
import { Text } from '@chakra-ui/react';

const SectionHeader = ({ children }) => (
    <Text 
        textAlign = "center" 
        mt = {5} 
        mb = {5}
    >
        {children}
    </Text>
);

export default SectionHeader;