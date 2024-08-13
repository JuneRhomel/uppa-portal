import styled from "styled-components";

const HeaderContainerStyle = styled.div`
    width: 100%;
    height: 4em;
    background-color: ${({ theme }) => theme.menuContainer.background};
    border-bottom: 1px solid var(--gray-6);
`;

export default HeaderContainerStyle