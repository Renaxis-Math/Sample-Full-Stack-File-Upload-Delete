import React, { Component } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';

class FileUploadInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayFilename: this.truncateFilename(props.filename) || "Choose File",
        };
        this.buttonRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filename !== this.props.filename) {
            this.setState({
            displayFilename: this.truncateFilename(this.props.filename),
            });
        }
    }

    truncateFilename = (filename) => {
        if (!filename) return "Choose File";

        const maxLength = 30; // Adjust this value as needed
        const extension = filename.split('.').pop();
        if (filename.length <= maxLength) { return filename; }
        
        const partLength = Math.floor((maxLength - 3 - extension.length) / 2);
        const nameNoExtension = filename.slice(0, -(extension.length + 1));

        const nameHead = nameNoExtension.slice(0, partLength);
        const nameTail = nameNoExtension.slice(-partLength)
        return `${nameHead}...${nameTail}.${extension}`;
    };

    render() {
        const { fileInputRef, onFileClick, onFileChange } = this.props;
        const { displayFilename } = this.state;

        return (
            <Box 
                position = "relative" 
                display = "inline-block" 
                width = "100%">
            <Input
                hidden
                mr = {2}
                colorScheme = "blue"
                variant = "outline"
                cursor = "pointer"
                type = "file"
                ref = {fileInputRef}
                onChange = {onFileChange}
            />

            <Button
                onClick = {onFileClick}
                width = "100%"
                textAlign = "left"
                colorScheme ="blue"
                variant = "outline"
                border = "1px solid"
                borderColor = "gray.300"
                padding = {4}
                overflow = "hidden"
                whiteSpace = "nowrap"
                ref={this.buttonRef}
            >
                <Text
                    maxW= "80%"
                    isTruncated
                >
                    {displayFilename}
                </Text>
            </Button>
            </Box>
        );
    }
}

export default FileUploadInput;