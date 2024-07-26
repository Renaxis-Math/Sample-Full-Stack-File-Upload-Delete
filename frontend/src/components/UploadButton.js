import React from 'react';
import { Button } from '@chakra-ui/react';

const UploadButton = ({ onClick }) => (
    <Button
        colorScheme = "orange"
        variant = "solid"
        cursor = "pointer"
        onClick = {onClick}
    >
        Upload
    </Button>
);

export default UploadButton;