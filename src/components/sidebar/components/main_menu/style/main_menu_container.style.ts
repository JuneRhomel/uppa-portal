import styled from "styled-components";

const MainMenuSidebarContainerStyle = styled.div<Props>`
  width: 100%;
  height: 34px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-inline: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  color: #757B81;
  font-weight: 400;
  font-size: 12px;
  border-radius: 5px;
  
  &:hover {
    background-color: #e0e0e0;
  }

  ${(props) => props.$isactive && `
    background-color: #EFEFEF;
    color: #0B0F13;
    font-weight: 500;
  `}

`;

interface Props {
  $isactive: boolean
}

export default MainMenuSidebarContainerStyle;
