import styled from "styled-components";
import useLayout from "../layout/layout/context/use-layout";
import Button from "../button.component";
import { DoubleIconLeft, DoubleIconRight } from "../icons";
import Filters from "../filters/filters.componet";
import { Product } from "@/interfaces/product";

const SidebarStyled = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 1em;
  height: 100%;
`;

interface SidebarProps { 
  categories: string[];
  brands: string[];
  values: Product[];
  setFilters: (filter: any) => void;
  itemFilters:{ property: string; value: string; forceClear?: boolean; }[];
} 

const Sidebar: React.FC<SidebarProps> = ({categories, brands, values, setFilters, itemFilters}) => {
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

      <Filters filters={{ categories, brands }} values={values} setFilters={setFilters}  itemFilters={itemFilters}/>

      <Button type="textOnly" onClick={() => setFilters({forceClear: true})} title="CLEAR ALL FILTERS" />
    </SidebarStyled>
  );
};

export default Sidebar;

const TitleIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
