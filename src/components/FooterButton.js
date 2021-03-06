import React from 'react';
import styled from 'styled-components';

const FooterButtonDiv = styled.div`
    border-top: 1px solid #eee;
`;

const FooterButtonButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: transparent;
    box-shadow: none;
    border: none;
    font-size: 18px;
    font-weight: 100;
    cursor: pointer;
    background-color: blue;
    color: #fff;

    &:disabled {
        color: #eee;
        background-color: #fff;
        cursor: not-allowed;
    }
`;

export const FooterButton = ({onClick, text, disabled}) => {
    return (
        <FooterButtonDiv>
            <FooterButtonButton disabled={disabled} onClick={onClick}>{text}</FooterButtonButton>
        </FooterButtonDiv>
    )
}