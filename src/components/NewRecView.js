import React, {useState, useRef, useEffect} from 'react';
import {debounce} from 'lodash';
import {isValidUrl, fetchMetaData} from '../services/urlService';
import {createRecommendation} from '../services/recommendationService';
import styled from 'styled-components';
import {Title, AppWrapperBody} from '../App';
import {FooterButton} from './FooterButton';

const Input = styled.input`
    padding: 10px;
    background-color: #eee;
    border: none;
    width: 100%;
    box-sizing: border-box;
`;

const FixedHeightBox = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
`;

const Error = styled.p`
  color: red;
  margin: 10px 0 0 0;
`;
  
const funPlaceholders = [
    'http://www.goodtime.blog/posts/3352/',
    'https://www.some-arxiv-paper.xyz/232q3kuy4f7wfgsi',
    'http://www.reddit.com/r/youmightlikethis',
    'http://www.recipes-dawg.com/blog/12/27/1993',
    'https://www.reverse-funnel.biz/how-to',
    'http://www.authoryoumightdig.com/about',
    'https://www.podcasts4you.com/funny',
    'http://www.cs.fancy-science-article.edu/blog',
    'http://www.youtube.com/watch/214nd1naigsvsc8/related-video'
]
  
export default () => {
    const [link, setLink] = useState('');
    const [isUrlValidBool, setIsUrlValidBool] = useState(true);
    const [buttonActive, setButtonActive] = useState(false);
    const [placeholder, setPlaceholder] = useState('https://www.mycoolsite.net');
    const errorCheck = useRef(debounce((link) => {
      const isValid = !link || isValidUrl(link);
      setIsUrlValidBool(isValid);
      setButtonActive(isValidUrl(link));
    }, 500));
  
    useEffect(() => {
      const timer = setInterval(() => {
        const index = Math.floor(Math.random() * funPlaceholders.length);
        setPlaceholder(funPlaceholders[index]);
      }, 5000);
  
      return () => {
        clearInterval(timer);
      }
    }, []);
  
    const handleInput = (e) => {
        if (buttonActive) {
          setButtonActive(false);
        }
  
        setLink(e.target.value);
  
        if (!e.target.value) {
          setIsUrlValidBool(true);
        } else {
          errorCheck.current(e.target.value);
        }
    };
  
    const submitRecommendation = () => {
        createRecommendation(link);
        fetchMetaData(link);
    }
  
    return (
      <>
        <AppWrapperBody>
          <Title>link to the material you suggest</Title>
          <Input placeholder={placeholder} value={link} onChange={handleInput} />
          <FixedHeightBox>{!isUrlValidBool && <Error>you gotta use a valid url</Error>}</FixedHeightBox>
        </AppWrapperBody>
  
        <FooterButton disabled={!buttonActive} onClick={submitRecommendation} text="submit recommendation" />
      </>
    )
  }