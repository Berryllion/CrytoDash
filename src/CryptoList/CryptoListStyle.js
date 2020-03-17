import styled from 'styled-components';

export const CryptoListContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

export const CryptoListTableContainer = styled.div`
  width: 80vw;
  padding: 20px;
  margin: auto;
`;

export const CryptoListModalContent = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CryptoListCryptoName = styled.span`
  padding: 0 5px 0 5px;
  font-weight: bold;
  font-size: 1.1em;
  color: ${props => props.color ? props.color : '#addfad'};
`;

  export const CryptoListInputError = styled.span`
  margin-top: 5px;
  font-size: 0.8em;
  color: #f44336;
  display: block;
`;