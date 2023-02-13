import styled from "styled-components";
import Filter from "./filter.component";
import { Product } from "@/interfaces/product";
import { Dispatch } from "react";

interface FiltersProps {
  filters: {
    categories: string[];
    brands: string[];
  };
  values: Product[];
  setFilters: (filter: any) => void;
  itemFilters:{ property: string; value: string; forceClear?: boolean; }[];
}

const FilterStyled = styled.div`
  background: white;
  border-radius: 5px;
  padding: 10px 20px;
  overflow: scroll;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);

  h5 {
    &:not(:first-child) {
      border-block-start: 1px solid black;
      padding-block-start: 1.5em;
    }
  }
`;

const Filters: React.FC<FiltersProps> = ({ filters, values, setFilters, itemFilters}) => {
  return (
    <FilterStyled>
      {Object.keys(filters).map((item) => (
        <Filter key={item} filter={(filters as any)[item]} title={item} values={values} setFilters={setFilters}  itemFilters={itemFilters}/>
      ))}
    </FilterStyled>
  );
};

export default Filters;
