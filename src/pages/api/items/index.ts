import { NextApiResponse, NextApiRequest } from 'next'

import { Product } from '../../../interfaces/product';
import { products, categories, brands } from '@/data';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ products: Product[], categories: string[], brands: string[] }>
  ) {
    return res.status(200).json({products, categories, brands});
}