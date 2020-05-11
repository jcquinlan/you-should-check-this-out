import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PulseLoader from "react-spinners/PulseLoader";
import {Flex} from './styled';
import { getRecommendations } from '../services/recommendationService';
import MetadataCard from './MetadataCard';
import { getCurrentUrlVoteRecord } from '../services/voteRecordService';

const RecommendationList = styled.div`
    max-height: 370px;
    overflow-y: auto;
    padding-bottom: 10px;
    ${props => props.overflowing ? `border-bottom: 1px solid #eee;` : ''}
    ${props => props.overflowing ? `border-top: 1px solid #eee;` : ''}
`;

const ScrollMessage = styled.p`
    text-align: center;
    margin-bottom: 0;
    margin-top: 20px;
    font-size: 12px;
`;

export const RecommendationListWrapper = () => {
    const [recs, setRecs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voteRecord, setVoteRecord] = useState(null);

    useEffect(() => {
        getRecommendations()
            .then(docRefs => {
                const docs = [];
                docRefs.forEach(doc => docs.push({id: doc.id, ...doc.data()}));
                setRecs(docs);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            });

        getCurrentUrlVoteRecord()
            .then(record => console.log(record) || setVoteRecord(record));
    }, []);

    const handleUpdatedMetadata = (metadata) => {
        const newRecs = recs.filter((data) => data.id !== metadata.id);
        newRecs.push(metadata);
        setRecs(newRecs);
    }

    if (loading) {
        return <Flex justifyContent="center"><PulseLoader size={8} margin={5} color="#333" /></Flex>;
    }

    if (!recs.length) {
        return 'dang, no recommendations yet. you should add one.'
    }

    const overflowing = !loading && recs.length > 2;
    const sortedRecs = recs.sort((rec1, rec2) => {
        return rec2.votes - rec1.votes;
    });

    return (
        <>
            <RecommendationList overflowing={overflowing}>
                {sortedRecs.map(rec => <MetadataCard key={rec.id} metadata={rec} onUpdate={handleUpdatedMetadata} currentVote={voteRecord[rec.id]} />)}
            </RecommendationList>

            {overflowing && <ScrollMessage>scroll for more</ScrollMessage>}
        </>
    )
        
}