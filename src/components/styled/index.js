import styled from 'styled-components';

export const AppWrapper = styled.div`
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

export const BackArrowButton = styled.div`
  cursor: pointer;
`;

export const Title = styled.h4`
  margin: 0;
  margin-bottom: 15px;
  font-weight: 300;
`;

export const Input = styled.input`
    padding: 10px;
    background-color: #eee;
    border: none;
    width: 100%;
    box-sizing: border-box;
`;

export const FixedHeightBox = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
`;

export const Error = styled.p`
  color: red;
  margin: 10px 0 0 0;
`;
