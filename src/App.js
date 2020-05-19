import React, {useEffect} from 'react';
import styled from 'styled-components';
import {RecommendationListWrapper} from './components/RecommendationListWrapper';
import {FooterButton} from './components/FooterButton';
import {BackArrowButton, Header, Title, AppWrapper, AppWrapperBody} from './components/styled';
import NewRecView from './components/NewRecView';

const AboutLinkElement = styled.a`
  color: blue;

  &:visited {
    color: blue;
  }
`;

const BackArrow = ({onClick}) => {
  return (
    <BackArrowButton onClick={onClick}>
      &larr; back
    </BackArrowButton>
  )
};

const AboutLink = () => {
  return (
    <AboutLinkElement
      href="https://github.com/jcquinlan/you-should-check-this-out/blob/master/README.md"
      target="_blank">
        tf is this extension?
    </AboutLinkElement>
  )
}

function App() {
  const [showNewRec, setShowNewRec] = React.useState(false);
  const handleNewRecommendation = () => {
    setShowNewRec(true);
  };

  const onBackClick = () => setShowNewRec(false);

  useEffect(() => {
    window.chrome.browserAction.setBadgeText({text: 'test'});
  }, []);

  return (
    <AppWrapper>
      <Header>
        <span>{showNewRec ? <BackArrow onClick={onBackClick} /> : <AboutLink />}</span>
        <span>ysco</span>
      </Header>

        {!showNewRec && (
          <>
            <AppWrapperBody>
              <Title>you should check out</Title>
              <RecommendationListWrapper />
            </AppWrapperBody>

            <FooterButton onClick={handleNewRecommendation} text="add new recommendation" />
          </>
        )}

        {showNewRec && <NewRecView></NewRecView>}

    </AppWrapper>
  );
}

export default App;
