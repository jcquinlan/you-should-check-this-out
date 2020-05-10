import React from 'react';
import styled from 'styled-components';
import {Title} from './styled';

const Truncate = ({length, children}) => {
    const DEFAULT_LENGTH = 75;
    const lengthToUse = length || DEFAULT_LENGTH;

    return React.Children.map(children, (child) => {
        if (child.length > lengthToUse) {
            return child.substring(0, lengthToUse) + '...';
        }

        return child;
    });
}

const MetadataTitle = styled(Title)`
    font-size: 16px;
`;

const MetadataDesc = styled.p`
    font-size: 14px;
    margin-bottom: 0;
`;

const MetadataCard = styled.div`
    padding: 15px 10px;
    border-radius: 5px;
    box-shadow: 0px 10px 12px -9px rgba(0,0,0,0.2);
    border: 1px solid #eee;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export default ({metadata}) => {
    const {description, title} = metadata;

    return (
        <MetadataCard>
            <MetadataTitle><Truncate>{title}</Truncate></MetadataTitle>
            <MetadataDesc><Truncate length={100}>{description}</Truncate></MetadataDesc>
        </MetadataCard>
    )
}