import { Product } from "@/interfaces/product";
import { Dispatch, useState } from "react";
import styled from "styled-components";

interface FilterProps {
  filter: string[];
  title: string;
  values: Product[];
  setFilters: (filter: any) => void;
}

const FilterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Filter: React.FC<FilterProps> = ({ filter, title, values, setFilters }) => {
  const handleEventChanged = (item: string) => {
    setFilters({
        property: title === "categories" ? "category" :title === 'brands' ? 'brand' : '',
        value: item,
      });
  };

  return (
    <>
      <h5 className="filter__item-title">{title.toUpperCase()}</h5>

      {filter.map((item) => (
        <FilterStyled key={item} className="filter">
          <InputLabelWrapper>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={(e) => handleEventChanged(item)}
              id={item}
            />
            <label htmlFor={item}>{item}</label>
          </InputLabelWrapper>
          <span className="filter__item-count">
            {getFilteredProduct(values, item, title).length}
          </span>
        </FilterStyled>
      ))}
    </>
  );
};

export default Filter;

const InputLabelWrapper = styled.div`
  display: flex;
  gap: 5px;
  input,
  label {
    cursor: pointer;
  }
  input[type="checkbox"]:checked {
    accent-color: #0b75c0;

    &:hover {
      accent-color: #0b75c0;
      opacity: 0.8;
    }
  }
`;

const getFilteredProduct = (
  values: Product[],
  item: string,
  title: string
): Product[] => {
  if (title === "categories") {
    return values.filter(
      (v) => v.category.replace("_", " ").toLowerCase() === item.toLowerCase()
    );
  } else if (title === "brands") {
    return values.filter(
      (v) => v.brand.replace("-", "").toLowerCase() === item.toLowerCase()
    );
  } else return [];
};
