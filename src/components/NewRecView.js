import React, {useState, useRef, useEffect} from 'react';
import {debounce} from 'lodash';
import {isValidUrl, fetchMetaData} from '../services/urlService';
import {createRecommendation} from '../services/recommendationService';
import {Title, AppWrapperBody, Input, FixedHeightBox, Error} from './styled';
import {FooterButton} from './FooterButton';
import MetadataCard from './MetadataCard';

  
const funPlaceholders = [
    'https://www.mycoolsite.net',
    'http://www.goodtime.blog/posts/3352/',
    'https://www.some-arxiv-paper.xyz/232q3kuy4f7wfgsi',
    'http://www.reddit.com/r/youmightlikethis',
    'http://www.recipes-dawg.com/blog/12/27/1993',
    'https://www.reverse-funnel.biz/how-to',
    'http://www.authoryoumightdig.com/about',
    'https://www.podcasts4you.com/funny',
    'http://www.cs.fancy-science-article.edu/blog',
    'http://www.youtube.com/watch/214nd1naigsvsc8/related-video'
];

export default () => {
    const [link, setLink] = useState('');
    const [metadata, setMetadata] = useState({});
    const [isUrlValidBool, setIsUrlValidBool] = useState(true);
    const [buttonActive, setButtonActive] = useState(false);
    const [placeholder, setPlaceholder] = useState(funPlaceholders[0]);

    const errorCheck = useRef(debounce((link) => {
      const isValid = isValidUrl(link);
      setIsUrlValidBool(!link || isValid);
      setButtonActive(isValidUrl(link));
      if (isValid) {
        fetchMetaData(link)
          .then(data => {
            const {description, title} = data;
            setMetadata({description, title, link});
          });
      }
    }, 700));
  
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
        setButtonActive(false);
        setMetadata({});
        setLink(e.target.value);
  
        if (!e.target.value) {
          setIsUrlValidBool(true);
        } else {
          errorCheck.current(e.target.value);
        }
    };
  
    const submitRecommendation = () => {
        createRecommendation(metadata)
          .then(() => console.log('done!'));
    }
  
    return (
      <>
        <AppWrapperBody>
          <Title>link to the material you suggest</Title>
          <Input placeholder={placeholder} value={link} onChange={handleInput} />
          <FixedHeightBox>{!isUrlValidBool && <Error>you gotta use a valid url</Error>}</FixedHeightBox>
          {!!Object.keys(metadata).length && <MetadataCard metadata={metadata} />}
        </AppWrapperBody>
  
        <FooterButton disabled={!buttonActive} onClick={submitRecommendation} text="submit recommendation" />
      </>
    )
  }