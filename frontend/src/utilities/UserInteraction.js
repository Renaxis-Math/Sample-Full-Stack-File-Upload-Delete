import axios from 'axios';

export const handleFileChange = (e, setFile, setFilename) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        setFilename(selectedFile.name);
    } else {
        setFile(null);
        setFilename('');
    }
};

export const handleSubmit = async (
        file, 
        setFile, 
        setFilename, 
        setIsUploaded, 
        setImageFiles,
        setFileCount,
        fileInputRef
    ) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setIsUploaded(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BACK_PORT}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const { key, url, isImage } = response.data;
            if (isImage) {
                setImageFiles(prev => [...prev, { key, url }]);
            }

            fileInputRef.current.value = '';
            setFile(null);
            setFilename('');
            setFileCount(
                (s) => s + 1
            )

            setTimeout(() => {
                setIsUploaded(false);
            }, Number(process.env.REACT_APP_TIME));

        } catch (err) {
            console.error('Error during file upload:', err);
        }
};

export const handleDelete = async (
        key, 
        setImageFiles, 
        setFileCount, 
        toast
    ) => {
        try {
            const uri = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BACK_PORT}/${key}`;
            const response = await axios.delete(uri);
            console.log('Delete response:', response.data);

            setImageFiles(prev => prev.filter(image => image.key !== key));
            setFileCount(
                (s) => s - 1 < 0 ? 0 : s - 1
            )

            toast({
                title: 'File deleted',
                description: 'The file has been deleted successfully.',
                status: 'success',  // Green Color by default
                duration: Number(process.env.REACT_APP_TIME),
                isClosable: true,
            });
        } catch (err) {
            console.error(`Error deleting file: ${key}`, err);
            toast({
                title: 'Error deleting file',
                description: err.message,
                status: 'error',  // Red Color by default
                duration: Number(process.env.REACT_APP_TIME),
                isClosable: true,
            });
        }
};

export const handleDeleteAll = async (
        setImageFiles, 
        setFileCount, 
        toast
    ) => {
        try {
            const uri = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BACK_PORT}`;
            const response = await axios.delete(uri);
            console.log('Delete all response:', response.data);

            setImageFiles([]);
            setFileCount(0);

            toast(
                {
                    title: 'All files deleted',
                    description: 'All files have been deleted successfully.',
                    status: 'success', // Green Color by default
                    duration: Number(process.env.REACT_APP_TIME),
                    isClosable: true
                }
            );

        } catch (err) {
            console.error('Error deleting all files:', err);
            toast(
                {
                    title: 'Error deleting files',
                    description: err.message,
                    status: 'error', // Red Color by default
                    duration: Number(process.env.REACT_APP_TIME),
                    isClosable: true
                }
            );
        }
};

export const fetchImages = async (setImageFiles) => {
    try {
        const uri = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_BACK_PORT}`;
        const response = await axios.get(uri);
        if (Array.isArray(response.data)) { setImageFiles(response.data); } 
        else { console.error('Unexpected response format:', response.data); }
    } 
    catch (err) { console.error('Error fetching images from S3:', err); }
};