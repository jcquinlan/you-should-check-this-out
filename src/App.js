import React from 'react';
import {RecommendationListWrapper} from './components/RecommendationListWrapper';
import {FooterButton} from './components/FooterButton';
import {BackArrowButton, Header, Title, AppWrapper, AppWrapperBody} from './components/styled';
import NewRecView from './components/NewRecView';

const BackArrow = ({onClick}) => {
  return (
    <BackArrowButton onClick={onClick}>
      &larr; back
    </BackArrowButton>
  )
};

function App() {
  const [showNewRec, setShowNewRec] = React.useState(false);
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
