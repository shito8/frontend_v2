import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

const urlUsdErgApiKey = `${process.env.URL_USDERG_APIKEY}`
const headers = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    mode: 'cors',
    cache: 'default',
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {

    const { authorization } = req.headers;
    if (!authorization || authorization !== `Bearer ${process.env.TOKEN_API}`) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    fetch(urlUsdErgApiKey, headers)
        .then(res => res.json())
        .then((data) => {
            res.status(200).json({ ...data });
          })
        .catch((err) => {
            res.status(500).json({ err });
        });

  }