import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useToast, Grid } from '@chakra-ui/react';
import FileUploadHeader from './FileUploadHeader';
import FileUploadInput from './FileUploadInput';
import UploadButton from './UploadButton';
import DeleteAllButton from './DeleteAllButton';
import StatusList from './StatusList';
import SectionHeader from './SectionHeader';
import FileUploadGrid from './FileUploadGrid';

import { 
    handleFileChange, 
    handleSubmit, 
    handleDelete, 
    handleDeleteAll
} from '../utilities/UserInteraction';

const MainComponent = () => {
    const [file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [filename, setFilename] = useState('');
    const fileInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [fileCount, setFileCount] = useState(() => {
        return parseInt(localStorage.getItem('fileCount')) || 0;
    });
    const toast = useToast();

    const onFileChange = (e) => handleFileChange(e, setFile, setFilename);
    const onSubmit = () => handleSubmit(file, setFile, setFilename, setIsUploaded, setImageFiles, setFileCount, fileInputRef);
    const onDelete = (key) => handleDelete(key, setImageFiles, setFileCount, toast);
    const onDeleteAll = () => handleDeleteAll(setImageFiles, setFileCount, toast);

    /**
     * Fetch images whenever browser starts or refreshes
     */

    const fetchFiles = async () => {
        try {
            const uri = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BACK_PORT}/`;
            const response = await axios.get(uri);
            const files = response.data.files;
            const imageFiles = response.data.imageFiles;
            
            // Check if the response data contains files
            if (Array.isArray(files) && Array.isArray(imageFiles)) {
                setImageFiles(imageFiles);
                setFileCount(files.length);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (err) {
            console.error('Error fetching images:', err);
        }
    };

    // Add fetchFiles to the dependency array
    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <FileUploadHeader />
            <Grid 
                templateColumns = "1fr auto auto" 
                gap = {2} 
                alignItems = "center"
            >
                <FileUploadInput
                    fileInputRef = { fileInputRef }
                    filename = { filename }
                    onFileClick = { () => fileInputRef.current.click() }
                    onFileChange = {onFileChange}
                />
                <UploadButton onClick = {onSubmit} />
                <DeleteAllButton onClick = {onDeleteAll} />
            </Grid>
            <StatusList filename = { filename } isUploaded = { isUploaded } />
            <SectionHeader>Total of {fileCount} uploaded files</SectionHeader>
            <SectionHeader>Among uploaded files, show ONLY images</SectionHeader>
            <FileUploadGrid imageFiles = { imageFiles } handleDelete = {onDelete} setImageFiles = {setImageFiles} />
        </div>
    );
};

export default MainComponent;