import Product from 'src/models/product';
import dbConnect from 'src/services/connect';
import dbLocal from 'src/data/db.json';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect.connect();
  await Product.deleteMany();
  await Product.insertMany(dbLocal);
  res.send({ message: 'deu tudo certo' });
};

export default handler;
