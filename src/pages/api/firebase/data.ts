import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string,
    errorMessage?: string,
  }



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {

    const { authorization } = req.headers;

    if (!authorization || authorization !== `Bearer ${process.env.TOKEN_API}`) {
        const errorData: Data = {
            apiKey: '',
            authDomain: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: '',
            errorMessage: 'Unauthorized'
        }
      return res.status(401).json(errorData);
    }

    const data = {
        apiKey: `${process.env.FIREBASE_APIKEY}`,
        authDomain: `${process.env.FIREBASE_AUTHDOMAIN}`,
        projectId: `${process.env.FIREBASE_PROJECTID}`,
        storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`,
        messagingSenderId: `${process.env.FIREBASE_MESSAGINGSENDERID}`,
        appId: `${process.env.FIREBASE_APPID}`,
        measurementId: `${process.env.FIREBASE_MEASUREMENTID}`
    }

    res.status(200).json(data);

  }