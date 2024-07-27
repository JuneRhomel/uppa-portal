import styled from "styled-components";
import * as Select from '@radix-ui/react-select';
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/violet.css';
import '@radix-ui/colors/indigo.css';

const StyledSelectRoot = styled(Select.Root)`
  width: 200px;
`;

const StyledSelectTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  border: 1px solid var(--indigo-10);
  background-color: white;
  color: var(--indigo-10);

  &[data-placeholder] {
    color: var(--indigo-10);
  }
`;

const StyledSelectIcon = styled(Select.Icon)`
  color: var(--indigo-10);
`;

const StyledSelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const StyledSelectViewport = styled(Select.Viewport)`
  padding: 5px;
`;

const StyledSelectItem = styled(Select.Item)`
  font-size: 13px;
  line-height: 1;
  color: var(--mauve-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  &[data-disabled] {
    color: var(--mauve-8);
    pointer-events: none;
  }
  &[data-highlighted] {
    outline: none;
    color: white;
    background-color: var(--indigo-10);
  }
`;

const StyledSelectLabel = styled(Select.Label)`
  padding: 0 25px;
  font-size: 12px;
  line-height: 25px;
  color: var(--mauve-11);
`;



const StyledSelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledSelectScrollButton = styled(Select.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: var(--indigo-10);
  cursor: default;
`;


export {
    StyledSelectRoot,
    StyledSelectTrigger,
    StyledSelectIcon,
    StyledSelectContent,
    StyledSelectViewport,
    StyledSelectItem,
    StyledSelectLabel,
    StyledSelectItemIndicator,
    StyledSelectScrollButton
}