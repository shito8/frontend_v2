import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string,
  err?: any
}

const urlUsdBtcApiKey = `${process.env.URL_USDBTC_APIKEY}`
const headers = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {

    const { authorization } = req.headers;
    if (!authorization || authorization !== `Bearer ${process.env.TOKEN_API}`) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    fetch(urlUsdBtcApiKey, headers)
        .then(res => res.json())
        .then((data) => {
            res.status(200).json({ ...data });
          })
        .catch((err) => {
            res.status(500).json({  message: 'Internal Server Error', err  });
        });

  }