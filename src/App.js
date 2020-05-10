import React from 'react';
import styled from 'styled-components';
import {RecommendationListWrapper} from './components/RecommendationListWrapper';
import {FooterButton} from './components/FooterButton';
import NewRecView from './components/NewRecView';

const AppWrapper = styled.div`
  background-color: #fff;
  width: 400px;
`;

export const AppWrapperBody = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 20px;
  padding-bottom: 0;
`;

const BackArrowButton = styled.div`
  cursor: pointer;
`;

export const Title = styled.h4`
  margin: 0;
  margin-bottom: 15px;
  font-weight: 300;
`;


const BackArrow = ({onClick}) => {
  return (
    <BackArrowButton onClick={onClick}>
      &larr; back
    </BackArrowButton>
  )
};

function App() {
  const [showNewRec, setShowNewRec] = React.useState(true);
  const handleNewRecommendation = () => {
    setShowNewRec(true);
  };

  const onBackClick = () => setShowNewRec(false);

  return (
    <AppWrapper>
      <Header>
        <span>{showNewRec ? <BackArrow onClick={onBackClick} /> : 'tf is this extension?'}</span>
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
