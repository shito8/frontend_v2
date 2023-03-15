const headers = new Headers();
headers.append('Authorization', `Bearer ${process.env.TOKEN_API}`)


export async function addressBtc(){
    const response = await fetch('api/dashboard/addressbtc',{
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    return data;       
}

export async function addressErg(){
    const response = await fetch('api/dashboard/addresserg',{
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    return data;       
}

export async function getUsdBTC(){
    const response = await fetch('api/bridge/usdBtc',{
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    return data;       
}

export async function getUsdERG(){
    const response = await fetch('api/bridge/usdErg',{
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    return data;       
}

export async function getFirebase(){
    const response = await fetch('api/firebase/data', {
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    return data;
}