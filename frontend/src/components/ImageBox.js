import React from 'react';
import { Box, Button, Image, Icon } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

const ImageBox = ({ image, onDelete, onMouseEnter, onMouseLeave }) => (
    <Box
        position = "relative"
        borderWidth = "1px"
        borderRadius = "md"
        overflow = "hidden"
        onMouseEnter = {onMouseEnter}
        onMouseLeave = {onMouseLeave}
    >
        <Image 
            src = {image.url} 
            alt = {`${image.key}`} 
        />

        {image.showDelete && (
            <Button
                position = "absolute"
                top = "0"
                right = "0"
                m = {1}
                colorScheme = "red"
                size = "sm"
                onClick = { () => onDelete(image.key) }
            >
                <Icon as = {FaTrashAlt} />
            </Button>
        )}
    </Box>
);

export default ImageBox;