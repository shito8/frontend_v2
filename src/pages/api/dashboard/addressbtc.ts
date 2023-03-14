import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}


const urlBtcAddress = `${process.env.URL_BTC_ADDRESS}`;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {

    const { authorization } = req.headers;
    if (!authorization || authorization !== `Bearer ${process.env.TOKEN_API}`) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    fetch(urlBtcAddress)
        .then(res => res.json())
        .then(res1=>res1.data)
        .then((data) => {
            res.status(200).json({ ...data });
          })
        .catch((err) => {
            res.status(500).json({ err });
        });

  }


  