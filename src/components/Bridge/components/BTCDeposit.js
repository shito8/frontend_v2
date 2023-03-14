import React from 'react';
import Image from 'next/image';




function BTCDeposit({eBTC, popup, setPopup, receiveBtc}) {




    const closePop = () => {
        setPopup(false)
    }

     return(
        <div className="mainPopup">
            <div className="confContent" id="top_card">
                <div className="confWindow btcDeposit">
                    <div className="titleBTC">BTC Deposit</div>
                    <div className="resultBridge">
                        <div className="amountBridge">
                            <div className="card">
                                <Image id="bitcoin" src='/img/Bitcoin.png' alt="btc" width={33} height={33}/>
                                <p>BTC</p>
                            </div>
                            <div>{eBTC}</div>
                        </div>
                        <div className="arrowBridge"><Image src='/img/arrow_blue.png' alt="arrow" width={80} height={22}/></div>
                        <div className="amountBridge">
                            <div className="card">
                                <Image id="bitcoin" src='/img/werg.png' alt="eBTC" width={33} height={33}/>
                                <p>eBTC</p>
                            </div>
                            <div>{receiveBtc}</div>
                        </div>
                    </div>
                    <div className="text1">Thank you for sending your BTC Deposit.</div>
                    <div className="text1">eBTC will be sent to your Ergo wallet once your BTC deposit is confirmed. This process may take up to 24 hours.</div>
                    <div className="text2">The status and details of this transaction can be found in the “Transactions” tab on the side menu.</div>
                    <div className="text2"><b><div>Support</div></b><br/>If you need support, your BTC transaction ID will help us assist you.</div>
                    <button type="button" id="confButton1" className="confWRS" onClick={closePop}><b>Close</b></button>
                </div>
            </div>
        </div>
    )
}


export default BTCDeposit

