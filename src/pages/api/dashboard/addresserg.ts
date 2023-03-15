import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string,
  err?: any
}

const urlErgAddress = `${process.env.URL_ERG_ADDRESS}`;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {

    const { authorization } = req.headers;
    if (!authorization || authorization !== `Bearer ${process.env.TOKEN_API}`) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    fetch(urlErgAddress)
        .then(res => res.json())
        .then(res1=>res1.transactions)
        .then((data) => {
            res.status(200).json({ ...data });
          })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', err });
        });

  }

  