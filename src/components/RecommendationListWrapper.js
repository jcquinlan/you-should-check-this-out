import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getRecommendations } from '../services/recommendationService';

export const RecommendationListWrapper = () => {
    useEffect(() => {
        getRecommendations()
            .then(res => console.log(res.docs))
    });

    return <p>list</p>
}