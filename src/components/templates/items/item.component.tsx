import styled from "styled-components";
import Image from "next/image";

import { Product } from "../../../interfaces/product";
import Button from "./../../button.component";
import { AddToCart, Heart, Star } from "./../../icons";
import ButtonGroup from "./../../button-group.component";
import useItem from "./use-item";
import ItemContext from "./item-context";
import { useContext } from "react";
interface ItemProps {
  item: Product;
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

  img {
    object-fit: contain;
  }

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
  const { isItemInBucketList, isItemInWishList } = useItem(item.id);
  const { addItemToBucket, removeItemFromBucket, addItemToWishes, removeItemFromWishes } = useContext(ItemContext);

  return (
    <ItemStyled>
      <Image src={item.images[0] ?? item.images[1]} alt={item.brand} sizes="100vw" width={280} height={200} />
      <LikePriceContainer>
        {item.rating && (
          <Button
            type={"iconRight"}
            title={`${item.rating}`}
            icon={<Star width={"12px"} height={"12px"} color="white" />}
          />
        )}
        <div className="price">
          ${item.price}
        </div>
      </LikePriceContainer>
      <ItemDescription>
        <div className="name">{item.title}</div>
      </ItemDescription>

      <ButtonGroup fluid gap="0">
        <Button
          title={isItemInWishList ?  'UNLIKE' : "LIKE"}
          icon={<Heart width={"15px"} height={"15px"} />}
          onClick={() => isItemInWishList ? removeItemFromWishes(item.id) : addItemToWishes(item.id) }
          type={"iconLeft"}
          background="lightgray"
          color="black"
        />
        <Button
          title={`${isItemInBucketList ? "REMOVE ITEM" : "ADD TO CART"} `}
          icon={<AddToCart width={"15px"} height={"15px"} color="white" />}
          onClick={() => isItemInBucketList ? removeItemFromBucket(item.id) : addItemToBucket(item.id)}
          type={"iconLeft"}
        />
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
