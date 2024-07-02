import styled from "styled-components";

const HeaderIconsBtnStyle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 13px;
  color: #757B81;
  border: none;
  background-color: transparent;
  &:active {
    background-color: #e0e0e0;
    color: #0B0F13;
  }
`;

export default HeaderIconsBtnStyle;
