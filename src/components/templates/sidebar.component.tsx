import styled from "styled-components";
import useLayout from "../layout/layout/context/use-layout";
import Button from "../button.component";
import { DoubleIconLeft, DoubleIconRight } from "../icons";

const SidebarStyled = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 1em;
  height: 100%;
`;

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useLayout();

  return (
    <SidebarStyled>
      <TitleIconWrapper>
        <div>Filters</div>
        <Button
          type="iconOnly"
          background="white"
          icon={
            isSidebarOpen ? (
              <DoubleIconLeft width="20px" height="15px" />
            ) : (
              <DoubleIconRight width="20px" height="15px" />
            )
          }
          onClick={toggleSidebar}
        />
      </TitleIconWrapper>
      <Filters>
        <div>Filters control</div>
      </Filters>
      <Button type="textOnly" onClick={console.log} title="CLEAR ALL FILTERS" />
    </SidebarStyled>
  );
};

export default Sidebar;

const TitleIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filters = styled.div`
  background: white;
  border-radius: 5px;
  padding: 10px 20px;
  overflow: scroll;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
`;
