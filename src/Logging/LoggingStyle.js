import styled from 'styled-components';

export const LoggingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
`;

export const LoggingElement = styled.div`
  text-align: center;
  margin: ${props => props.button ? '30px' : '5px'} 0 5px 0;
`;


export const LoggingInputError = styled.span`
  margin-top: 5px;
  font-size: 0.8em;
  color: #f44336;
  display: block;
`;