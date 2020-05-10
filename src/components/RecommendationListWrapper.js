import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { getRecommendations } from '../services/recommendationService';
import MetadataCard from './MetadataCard';

export const RecommendationListWrapper = () => {
    const [recs, setRecs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecommendations()
            .then(docRefs => {
                const docs = [];
                docRefs.forEach(doc => docs.push({id: doc.id, ...doc.data()}));
                setRecs(docs);
                console.log(docs);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return 'loading...';
    }

    if (!recs.length) {
        return 'dang, no recommendations yet. you should add one.'
    }

    return recs.map(rec => <MetadataCard key={rec.id} metadata={rec} />);
        
}