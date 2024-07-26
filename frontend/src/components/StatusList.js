import React from 'react';
import { List, ListItem, Icon } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const StatusList = ({ filename, isUploaded }) => (
    isUploaded && (
        <List 
            spacing = {2} 
            mt = {4}
        >
            <ListItem>
                {filename}
                <Icon as = {FaCheckCircle} color = "green.500" ml = {2} />
            </ListItem>
        </List>
    )
);

export default StatusList;