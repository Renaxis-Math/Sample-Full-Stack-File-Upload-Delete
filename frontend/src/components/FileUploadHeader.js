import React from 'react';
import { Text } from '@chakra-ui/react';

const FileUploadHeader = () => (
    <Text 
        fontSize = "2xl" 
        fontWeight = "bold" 
        textAlign = "center" 
        mt = {2} 
        mb = {6} 
    >
        File Upload to AWS S3
    </Text>
);

export default FileUploadHeader;