import styled from "styled-components";

const BoxStyleComponent = styled.div`
    border: 1px solid var(--gray-6);
    padding: 1rem;
    width: 300px;
    height: 100vh;
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.menuContainer.background || '#fff'};
`;

export default BoxStyleComponent;
