import styled from "styled-components";
import Image from "next/image";

import { Item } from "../../../interfaces/Item";
import example from "./../../../assets/img/phone.jpg";
import Button from "./../../button.component";
import { AddToCart, Heart, Star } from "./../../icons";
import ButtonGroup from "./../../button-group.component";
interface ItemProps {
  item: Item;
}
const ItemStyled = styled.div`
  background: white;
  padding: 1em;
  padding-block-end: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);

  .button-group {
    position: absolute;
    bottom: 0;
    margin-block-start: 25px;

    .button {
      &:first-child {
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-bottom-right-radius: 5px;
      }
    }
  }
`;

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <ItemStyled>
      <Image src={item.img} alt={item.name} sizes="100vw" height={250} />
      <LikePriceContainer>
        {item.rating && <Button
          type={"iconRight"}
          title={`${item.rating}`}
          icon={<Star width={"12px"} height={"12px"} color="white" />}
        />}
        <div className="price">{item.currency}{item.price}</div>
      </LikePriceContainer>
      <ItemDescription>
        <div className="name">{item.name}</div>
        <div className="description">{item.description}</div>
      </ItemDescription>

      <ButtonGroup fluid gap="0">
        <Button
          title="WISHLIST"
          icon={<Heart width={"15px"} height={"15px"} />}
          onClick={console.log}
          type={"iconLeft"}
          background="lightgray"
          color="black"
        />
        <Button title="ADD TO CART" icon={<AddToCart width={"15px"} height={"15px"} color="white" />} onClick={console.log} type={"iconLeft"} />
      </ButtonGroup>
    </ItemStyled>
  );
};

export default Item;

const LikePriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .price {
    margin-inline-start: auto;
  }
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
