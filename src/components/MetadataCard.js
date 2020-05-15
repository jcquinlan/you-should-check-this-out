import React from 'react';
import styled from 'styled-components';
import {Title, Flex} from './styled';
import {voteOnRecommendation} from '../services/recommendationService';
import {updateVoteRecord} from '../services/voteRecordService';

const Truncate = ({length, children}) => {
    const DEFAULT_LENGTH = 75;
    const lengthToUse = length || DEFAULT_LENGTH;

    if (!children) return null;

    return React.Children.map(children, (child) => {
        if (child.length > lengthToUse) {
            return child.substring(0, lengthToUse) + '...';
        }

        return child;
    });
}

const MetadataTitle = styled(Title)`
    font-size: 16px;
    font-weight: 600;
`;

const MetadataDesc = styled.p`
    font-size: 14px;
`;

const MetadataLink = styled.a``;

const TitleWrapper = styled(Flex)``;

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

const ScoreNumber = styled.span``;
const ScoreCardWrapper = styled(Flex)`
    height: 50px;
    width: 50px;
    flex-basis: 50px;
    flex-shrink: 0;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    flex-direction: column;
    margin-right: 10px;

    span {
        font-size: 10px;
        color: #888;
    }

    ${ScoreNumber} {
        font-size: 24px;
    }
`;

const ArrowsWrapper = styled(Flex)`
    padding: 0 5px;
    flex-direction: column;
    justify-content: center;
`;

const Arrow = styled.span`
    cursor: pointer;
    color: #eee;
    transition: 0.3s;
    ${props => props.downvote && !props.visible ? 'color: #fff;' : ''}
    ${props => props.active ? 'color: blue;' : ''}

    &:hover {
        color: blue;
    }
`;

const ScoreCard = ({votes = 1}) => {
    return (
        <ScoreCardWrapper>
            <ScoreNumber>{votes}</ScoreNumber>
            <span>{votes === 1 ? 'vote' : 'votes'}</span>
        </ScoreCardWrapper>
    )
};

export default ({metadata, onUpdate, currentVote}) => {
    const {description, title, link, votes, id} = metadata;

    const newVote = (magnitude) => {
        if (currentVote === magnitude) return;

        const newValue = votes + magnitude;
        voteOnRecommendation(id, newValue)
            .then(res => onUpdate({...metadata, votes: newValue}));
        updateVoteRecord(id, magnitude);
    }

    return (
        <MetadataCard>
            <TitleWrapper>
                <Flex>
                    <ArrowsWrapper flexDirection="column">
                        <Arrow active={currentVote === 1} onClick={() => newVote(1)}>&#9650;</Arrow>
                        <Arrow downvote visible={currentVote === 1} active={currentVote === -1} onClick={() => newVote(-1)}>&#9660;</Arrow>
                    </ArrowsWrapper>
                    <ScoreCard votes={votes}/>
                </Flex>

                <MetadataTitle>
                    <Truncate>{title}</Truncate>
                </MetadataTitle>
            </TitleWrapper>

            <MetadataDesc><Truncate length={100}>{description}</Truncate></MetadataDesc>
            <MetadataLink target="_blank" href={link}><Truncate>{link}</Truncate></MetadataLink>
        </MetadataCard>
    )
}