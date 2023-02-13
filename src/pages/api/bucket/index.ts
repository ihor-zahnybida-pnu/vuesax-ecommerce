import { NextApiResponse, NextApiRequest } from 'next'

import { Product } from '../../../interfaces/product';
import { products } from '../../../data';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  return res.status(200).json(products);
}