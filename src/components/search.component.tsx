import styled from "styled-components";
import Button from "./button.component";
import { osName } from "react-device-detect";
import { useHotkeys } from "react-hotkeys-hook";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Cancel, Search as SearchIcon } from "./icons";

export interface SearchProps {
  value: string;
  onValueChanged: (value: string) => void;
}
const SearchContainerStyled = styled.div`
  position: relative;
`;

const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0 1em;
  border-radius: 5px;
  box-shadow: ${props=> props.theme.boxShadow};
  box-sizing: border-box;

  .search-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: ${(props) => props.theme.searchWrapperGap};

    svg {
      fill: ${(props) => props.theme.searchIconColor};
    }

    input {
      height: 40px;
      width: 100%;
      border: none;
      outline: none;
      background-color: white;

      &::placeholder {
        color: lightgray;
      }
    }
  }

  .cancel-button {
    visibility: ${(props) => props.theme.iconButtonVisibility};
  }

  .search-icon {
    cursor: auto;
  }
`;

const Search: React.FC<SearchProps> = ({ value, onValueChanged }) => {
  const [hotKey, setHotKey] = useState<string>("");
  useHotkeys(hotKey, () => searchInput.current?.focus());
  const placeholder = `Search  ${osName === "Mac OS" ? "(Cmd+K or /)" : osName === "Windows" ? "(Ctrl+K or /)" : "" }`

  useEffect(() => {
    switch (osName) {
      case "Mac OS":
        setHotKey((prev) => (prev = "Meta+K, /"));
        break;
      case "Windows":
        setHotKey((prev) => (prev = "Ctrl+K, /"));
        break;
      default:
        setHotKey((prev) => (prev = "/"));
        break;
    }

    window.addEventListener("keydown", console.log);
    return () => window.removeEventListener("keydown", console.log);
  }, []);

  const [focused, setFocus] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const eventHandlers = useMemo(
    () => ({
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      onChange: (e: ChangeEvent<HTMLInputElement>) => onValueChanged(e.target.value) }),
    [onValueChanged]
  );

  return (
    <SearchContainerStyled className="search-container">
      <SearchStyled className="search" theme={{
        boxShadow: focused ? ' 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)' : 'initial',
        iconButtonVisibility: value.length ? 'initial' : 'hidden',
      }}>
        <div className="search-wrapper">
          <Button
            icon={<SearchIcon width={"20px"} height={"20px"} color="lightgray" />}
            type={"iconOnly"}
            onClick={console.log}
            className="search-icon"
            background="white"
          />
          <input
            ref={searchInput}
            className="input"
            type="text"
            value={value}
            {...eventHandlers}
            placeholder={placeholder}
          />
        </div>

        <Button
          icon={<Cancel width={"20px"} height={"20px"} color="lightgray" />}
          type={"iconOnly"}
          className="cancel-button"
          onClick={() => {
            onValueChanged("");
            searchInput.current?.focus();
          }}
          background="white"
        />
      </SearchStyled>
    </SearchContainerStyled>
  );
};

export default Search;
