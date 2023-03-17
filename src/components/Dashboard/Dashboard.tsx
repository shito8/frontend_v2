import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { addressBtc, addressErg } from '../../utils/getData'

function Dashboard() {


    const [amount, setAmount] = useState<any>()
    const [eBTCAmount, setEBTCAmount] = useState<any>()
    const [ergAmount, setERGAmount] = useState<any>()
    const [btcLoader, setBtcLoader] = useState(false)
    const [ergLoader, setErgLoader] = useState(false)  

    useEffect(() => {

         addressBtc().then((data) => {
          setAmount((data.balance/1000000000).toString().substring(0,6));
          setEBTCAmount((data.balance/1000000000).toString().substring(0,6));
          setBtcLoader(true)
        });

        addressErg().then((data) => {
            setERGAmount((data.confirmedBalance/1000000000).toString().substring(0,6))
            setErgLoader(true)
          });  
      }, []);

    const openInNewTab = (url: any) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const urlBtc = `https://tbtc.bitaps.com/${process.env.NEXT_PUBLIC_VAULT_BTC_WALLET_ADDRESS}`

    const urlErg = `https://explorer.ergoplatform.com/en/addresses/${process.env.NEXT_PUBLIC_VAULT_ERG_WALLET_ADDRESS}`

    return (
        <div id="pageDashboard">
            <div className='menu_dashboard'>

                <div className={"dashBox"}>
                    <div className="infoTitleDash">BTC in Vault</div>
                    <div className={"infoDash"}>
                        <div className={"dashAmount"}>{btcLoader ? `${amount} BTC` : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}</div>
                        <div className={"dashCircle"}>
                            <div className={"synced"}>Synced <Image src='/img/secure.png' className={"secure"} alt='secure' width={12} height={15}/></div>
                        </div>
                    </div>
                    <div className={"dashButton"} role={"link"} onClick={() => openInNewTab(urlBtc)}>View supply ➜</div>
                </div>

                <div className={"dashBox"}>
                    <div className="infoTitleDash">eBTC minted</div>
                    <div className={"infoDash"}>
                        <div className={"dashAmount"}>{btcLoader ? `${eBTCAmount} eBTC` : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}</div>
                        <div className={"dashCircle"}>
                            <div className={"synced"}>Synced <Image src='/img/secure.png' className={"secure"} alt='secure' width={12} height={15}/></div>
                        </div>
                    </div>
                    <div className={"dashButton"} role="link" onClick={() => openInNewTab(urlBtc)}>View supply ➜</div>
                </div>

                <div className={"dashBox"}>
                    <div className="infoTitleDash">Revenue</div>
                    <div className={"infoDash"}>
                        <div className={"dashAmount"}>{ergLoader ? `${ergAmount} ERG` : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}</div>
                        <div className={"dashCircle"}>
                            <div className={"synced"}>Secure <Image src='/img/secure.png' className={"secure"} alt='secure' width={12} height={15}/></div>
                        </div>
                    </div>
                    <div className={"dashButton"} role="link" onClick={() => openInNewTab(urlErg)}>View supply ➜</div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;