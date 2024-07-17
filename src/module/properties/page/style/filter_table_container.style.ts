import styled from "styled-components";

const FilterTableContainerStyle = styled.div<Props>`
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isOpen &&
    `
    height: 50px;
  `}
`;

interface Props {
  isOpen?: boolean;
}

export default FilterTableContainerStyle;