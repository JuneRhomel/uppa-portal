import styled from "styled-components";


const MasterContainerStyle = styled.div`
    width: 100%;
    display: flex;
    background-color: ${({ theme }) => theme.masterContainer.background};
`;

export default MasterContainerStyle;