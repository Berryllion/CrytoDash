import styled from 'styled-components';

export const TopBarContainer = styled.div`
  flexGrow: 1;
`;

export const TopBarDrawerEmpty = styled.div`
  height: 100vh;
  width: 300px;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopBarDrawerEditContainer = styled.div`
  padding: 5px 0 15px 0;
  background-color: rgba(0, 0, 0, 0.04);
`;

export const TopBarDrawerEdit = styled.div`
  padding: 10px 0 10px 15px;
  text-align: center;
  display: flex;
  align-content: center;
  align-items: center;
`;

export const TopBarDrawerPrice = styled.span`
  margin-right: 13px;
`;