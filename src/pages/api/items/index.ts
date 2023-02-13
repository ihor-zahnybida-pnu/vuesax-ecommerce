import { NextApiResponse, NextApiRequest } from 'next'

import { Item } from '../../../interfaces/Item';
import { items } from '../../../data';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  return res.status(200).json(items)
}