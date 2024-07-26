import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ImageBox from './ImageBox.js';

const FileUploadGrid = ({ imageFiles, handleDelete, setImageFiles }) => (
    <SimpleGrid 
        columns = {[1, 2, 3]} 
        spacing = {4}>
        {imageFiles.length > 0 &&
            imageFiles.map(
                (image, index) => (
                    <ImageBox
                        key = {index}
                        image = {image}
                        onDelete = {handleDelete}
                        onMouseEnter = {
                            () => setImageFiles(
                                prev => prev.map(
                                    (img, i) => i === index ? { ...img, showDelete: true } : img
                                )
                            )
                        }
                        onMouseLeave={
                            () => setImageFiles(
                                prev => prev.map(
                                    (img, i) => i === index ? { ...img, showDelete: false } : img
                                )
                            )
                        }
                    />
                )
            )
        }
    </SimpleGrid>
);

export default FileUploadGrid;