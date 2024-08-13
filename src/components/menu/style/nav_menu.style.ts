import styled from "styled-components";

const NavMenuStyle = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   height: 40px;
   padding: 0 1rem;
   border-radius: 8px;
   crussor: pointer;
   transition: background-color 0.2s ease-in-out;
   crussor: pointer;
   gap: 0.5rem;

   &:hover {
       background-color: #4171fd6b;
   }
    &.active {
        background-color: #4171fd6b;
    }
`;


export default NavMenuStyle;