import styled from "styled-components";

const ContentContainerStyle = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.25rem;
    border : 1px solid var(--gray-a5);
    border-radius: max(var(--radius-2), var(--radius-full));
    background-color: ${({ theme }) => theme.content.contentBorder};

`;

export default ContentContainerStyle;