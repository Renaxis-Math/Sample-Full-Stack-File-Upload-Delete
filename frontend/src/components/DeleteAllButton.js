import React from 'react';
import { Button } from '@chakra-ui/react';

const DeleteAllButton = ({ onClick }) => (
    <Button
        colorScheme = "red"
        variant = "solid"
        cursor = "pointer"
        onClick = {onClick}
    >
        Delete All
    </Button>
);

export default DeleteAllButton;