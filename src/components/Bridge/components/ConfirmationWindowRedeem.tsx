import React, {useState, useEffect} from "react";
import sendPaymentFunction from "../services/transactions/sendPayment";
import ErrorPayment from "./ErrorPayment";
import RedeemConfWindow from "./RedeemConfWindow";
import Image from 'next/image';





function ConfirmationWindowRedeem({eBTC, btcAddress, popupr, setPopupr, receiveBtc}:{
    eBTC: string,
    btcAddress: string,
    popupr: boolean,
    setPopupr: React.Dispatch<React.SetStateAction<boolean>>,
    receiveBtc: string
}) {

    const [nautilusAddress, setNautilusAddress] = useState<any>('');

    useEffect(()=>{
        if(typeof window !== "undefined"){
            let addressStorage: any = (localStorage.getItem('address'));
            setNautilusAddress(JSON.parse(addressStorage))
        }
    }, [])



    const closePop = () => {
        setPopupr(false)
    }


    const [txInfo, setTxInfo] = useState('');


    const [conf, setConf] = useState("info");
    const [error, setError] = useState(false);

    const [disable, setDisable] = useState(false);


    const [spinConf, setSpinConf] = useState(false)
    

    function Conf() {
            if (conf === "info") {
                return (
                    <ConfirmationInfo/>
                )
            }
            else if (conf === "concl") {
                return (
                    <RedeemConfWindow eBTC={eBTC} btcAddress={btcAddress} nautilusAddress={nautilusAddress} txInfo={txInfo} popupr={popupr} setPopupr={setPopupr} receiveBtc={receiveBtc}/>
                )
            }else if (conf === "wait"){
                return (
                    <Wait/>
                )
            }else return <></>

    }


    return (
        error ? <ErrorPayment popupr={popupr} setPopupr={setPopupr}/> : <div className="mainPopup">
            <div className="confContent">

                <div className="confWindow">
                    <Conf/>
                </div>
            </div>
        </div>
    )

    function closeWait(){
        setConf("info")
    }

    function Wait(){
        return (                    
            <div className="redeem waiting">
                <div className="titleBTC underLine">Waiting for confirmation</div>
                <div id="close">
                <Image src='/img/dark_close.png' onClick={closeWait} alt="X" width={18} height={18}/>
                </div>
                <div className='spinner waiting'></div>
                <div className="text">Unwrapping {eBTC} eBTC.</div>
                <div className="text">Confirm this transaction in your wallet.</div>
            </div>)
    }



    function ConfirmationInfo() {

        const [toolTip, setToolTip] = useState(false);

        function onToolTip(){
            setToolTip(true)
        }

        function ofToolTip(){
            setTimeout(()=>{
                setToolTip(false);
            },1000);
        }



        return (
            <div className="redeem">
                <div className="titleBTC">Confirm Unwrap</div>
                    <div id="close">
                    <Image src='/img/dark_close.png' onClick={closePop} alt="X" width={18} height={18}/>
                    </div>
                <div className="resultBridge">
                    <div className="amountBridge">
                            <div className="card">
                            <Image id="bitcoin" src='/img/werg.png' alt="eBTC" width={33} height={33}/>
                            <p>eBTC</p>
                        </div>
                        <div>{eBTC}</div>
                    </div>
                    <div className="arrowBridge"><Image src='/img/arrow_blue.png' alt="arrow" width={80} height={22}/></div>
 
                    <div className="amountBridge">
                        <div className="card">
                        <Image id="bitcoin" src='/img/Bitcoin.png' alt="btc" width={33} height={33}/>
                            <p>BTC</p>
                        </div>
                        <div>{receiveBtc}</div>
                    </div>
                </div>
                
                <div className="bridgeFee unWrap confirm">
                    <div className='feeItem'>
                        <div>Bridge Fee:
                            <Image src='/img/idark_svg.png'
                            alt="info" width={16} height={16} className='dark__mode' onMouseOver={onToolTip} onMouseOut={ofToolTip}/>
                            <Image src='/img/ilight_svg.png'
                            alt="info" width={16} height={16} className='sun__mode' onMouseOver={onToolTip} onMouseOut={ofToolTip}/>
                            </div>
                            {toolTip ? <div className="toolTip">
                                0.05% of eBTC Quantity<br/>Uwrapped + 0.0001 eBTC<br/>+ 0.05 ERG 
                                <div className="flecha-down"></div>
                            </div> : ""}
                            

                        <div>
                        {Math.round(((parseFloat(eBTC)*.005)+0.0001)*100000000)/100000000} eBTC + 0.05 ERG
                        </div>
                    </div>
                </div>
                <div className="text2">BTC destination address:
                    <br/>{btcAddress}
                </div>

                <button type="button" id="confButton" disabled={disable}
                        onClick={() => send()}
                >{spinConf ? <div className='spinner conf'></div>:""}<b>Confirm Unwrap</b></button>

            </div>
        )
    }

    async function send() {
        setSpinConf(true)
        setTimeout(()=>{
            setSpinConf(false);
            setConf("wait")
        },2000);
        setDisable(true)
        const result = await sendPaymentFunction(eBTC, btcAddress, nautilusAddress)
        setTxInfo(result)
        result ? setConf("concl") : setError(true)
    }




}





export default ConfirmationWindowRedeem;