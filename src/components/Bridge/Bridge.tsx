import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { getUsdBTC, getUsdERG } from '@/utils/getData';
import QRWindow from './components/QRWindow';
import ConfirmationWindowRedeem from './components/ConfirmationWindowRedeem';
import { type } from 'os';


function Bridge() {


    const [ergUsd, setErgUsd] = useState('0');

    const [usdBTC, setUsdBTC] = useState('0');

    const [anetaBTCAmountG, setAnetaBTCAmountG] = useState('0');

    const [bridgeFeeG, setBridgeFeeG] = useState('0');


    const [btcAddressG, setBtcAddressG] = useState('');
    const [BTCAmountG, setBTCAmountG] = useState('0');

    const [receiveBtcG, setReceiveBtcG] = useState('')



    const [connectWalletError, setConnectWalletError] = useState(false);




    const closePop = () => {
        setPopup(false);
        setPopupr(false);
        setConnectWalletError(false);
        
    }

    useEffect(()=>{
        getUsdERG().then((data)=>{setErgUsd(data.USD)});
        getUsdBTC().then((data)=>{setUsdBTC(data.USD)});
    }, [])

    const [popup, setPopup] = useState(false);
    const handleClickOpen = () => {
        setPopup(true);
    }

    const [popupr, setPopupr] = useState(false);
    const handleClickOpenRedeem = () => {
        setPopupr(true);
    }

    const [visible, SetVisible] = useState(true);


    function DownUp() {
        if (visible) {
            return (
                <MintPage eBTC={anetaBTCAmountG} bridgeFee={bridgeFeeG}/>
            )
        } else {
            return (
                <RedeemPage eBTC = {BTCAmountG} btcAddress = {btcAddressG} />
            )
        }
    }

    function ConnectWalletError() {
        return(
            <div className="mainPopup">
                <div className="confContent address">

                    <div className="confWindow address">

                        <div className='errorAddress'>
                        <Image src='/img/error.png' alt="error" width={16} height={16}/>Your wallet is not connected. Please try again.
                        </div>
                        <button type="button" id="tryButton" onClick={closePop}><b>Try again</b></button>
                    </div>
                </div>
            </div>
        )
    }





    return (
        <div>

            {connectWalletError ? <ConnectWalletError/> : ""}
            {popup ? <QRWindow eBTC = {anetaBTCAmountG} popup={popup} setPopup={setPopup} receiveBtc = {receiveBtcG}
            /> : ""}

            
            {popupr ? <ConfirmationWindowRedeem eBTC = {BTCAmountG}  btcAddress = {btcAddressG} popupr={popupr} setPopupr={setPopupr} receiveBtc={receiveBtcG} /> : ""}
            <div id="content1">
                <div id="radios">
                    <input id="rad1" type="radio" name="radioBtn" onClick={() => SetVisible(true)}/>
                    <label className="labels" htmlFor="rad1"><b>WRAP</b></label>
                    <input id="rad2" type="radio" name="radioBtn" onClick={() => SetVisible(false)}/>
                    <label className="labels" htmlFor="rad2"><b>UNWRAP</b></label>
                    <div id="bckgrnd"></div>
                </div>
                <DownUp/>
            </div>
        </div>
    )


    type BridgeProps = {
        eBTC: string;
        bridgeFee: string;
      }

    function MintPage(props: BridgeProps) {

        const [mintAmount, setMintAmount] = useState('');
        const [usdBtcMint, setUsdBtcMint] = useState('0');
        const [anetaBTCAmount, setAnetaBTCAmount] = useState('0');
        const [bridgeFee, setBridgeFee] = useState('0');
        const [bridgeFeeUsd, setBridgeFeeUsd] = useState('0');

        const [minMint, setMinMint] = useState(true)
        const [maxDecimals, setMaxDecimals] = useState(true)
        const [spinMint, setSpinMint] = useState(false)

        const [receiveBtc, setReceiveBtc] = useState('')
        const [receiveBtcUsd, setReceiveBtcUsd] = useState('')



        useEffect(()=>{
            setReceiveBtc((Math.round(((parseFloat(anetaBTCAmount)*.995)-0.0001)*100000000)/100000000).toString())

            setUsdBtcMint((Math.round((parseFloat(usdBTC)*parseFloat(anetaBTCAmount))*100)/100).toFixed(2))

            setReceiveBtcUsd((Math.round((parseFloat(receiveBtc)*parseFloat(usdBTC))*100)/100).toFixed(2))

            setBridgeFee((Math.round(((parseFloat(anetaBTCAmount)*.005)+0.0001)*100000000)/100000000).toString())
            setBridgeFeeUsd((Math.round((parseFloat(bridgeFee)*parseFloat(usdBTC))*100)/100).toFixed(2))


        },[anetaBTCAmount, receiveBtc, bridgeFee])  




        const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
            setMintAmount(event.target.value);

            if (event.target.value !== '' && (1000 * parseFloat(event.target.value))/1000 !== 0) {
                setAnetaBTCAmount(event.target.value);
            }
            else {
                setAnetaBTCAmount('0');
            }

        };

        function checkAmount(){
            let integer = parseFloat(anetaBTCAmount).toString().replace(/^[^\.]+/,'0');
            if(parseFloat(anetaBTCAmount)<0.0006){
                setMinMint(false)
            }else setMinMint(true)
            if(integer.length>10){
                setMaxDecimals(false)
            }else setMaxDecimals(true)

        }


        function confirmMint(){
            if(anetaBTCAmount == '0'){
                setMinMint(false)
            }else if(minMint && maxDecimals){
                setSpinMint(true)
                setTimeout(()=>{
                    setSpinMint(false);
                    handleClickOpen1()
                },2000);
            }
        }


        async function handleClickOpen1() {


                setAnetaBTCAmountG(anetaBTCAmount)
                setBridgeFeeG(bridgeFee)
                setReceiveBtcG(receiveBtc)

                let addressStorage: any = localStorage.getItem('address');
    
                const address = JSON.parse(addressStorage)
                address ? handleClickOpen() : setConnectWalletError(true)
        }



        return (
            <div id="WRAP">
                <p className="title">Mint eBTC</p>
                <input pattern="[0-9]+" min="0" placeholder="0.00"
                       className="btcInput"
                       size={30}
                       id="mintAmount"
                       name="mintAmount"
                       onChange={handleChange}
                       value={mintAmount}
                       onBlur={checkAmount}
                /><br/>
                <div className="lblInp">
                    <Image id="bit" src='/img/Bitcoin.png'
                         alt="aneta" width={25} height={25}/>BTC<br/>
                    <div id="usd"> ~ $ {parseFloat(anetaBTCAmount) == 0 ? "0.00":usdBtcMint}</div>
                </div>
                <br></br>          
                {minMint ? "" : <div className='warningBridge'><Image src='/img/error.png' alt="error" width={16} height={16}/> You can mint a minimum of 0.0006 BTC.</div>}

                {(minMint && !maxDecimals)?<div className='warningBridge'><Image src='/img/error.png' alt="error" width={16} height={16}/> Enter a multiple number of satoshi (Maximum 8 decimal places).</div>:""}


                <div className="flex-container">
                    <div className="left">You Will Receive</div>
                    <div className="right">
                        <div><Image id="bit" src='/img/werg.png' alt="eBTC" width={25} height={25}/><b>{parseFloat(anetaBTCAmount) == 0 ? "0.00":receiveBtc} eBTC</b></div>
                        <div id="usd"> = $ {parseFloat(anetaBTCAmount) == 0 ? "0.00":receiveBtcUsd}</div>
                    </div>
                    
                </div>
                <div className="bridgeFee">
                    <div>Bridge fee</div>
                    <div>
                        <Image id="bit" src='/img/Bitcoin.png'
                         alt="aneta" width={25} height={25}/><b>{parseFloat(anetaBTCAmount) == 0 ? "0.00":bridgeFee} BTC</b><br/>
                        <div id="usd"> = $ {parseFloat(anetaBTCAmount) == 0 ? "0.00":bridgeFeeUsd}</div>
                    </div>
                </div>
                <button
                    onClick={confirmMint}
                    type="button" className="mainButton" id="mintButton">{spinMint ? <div className='spinner mint'></div>:""}<b>Wrap BTC</b></button>
            </div>
        )
    }

    type ReddemProps = {
        eBTC: string;
        btcAddress: string;
      }

    function RedeemPage(props: ReddemProps) {
        const [redeemAmount, setRedeemAmount] = useState('');
        const [usdBtcRedeem, setUsdBtcRedeem] = useState('0');
        const [btcAddress, setBtcAddress] = useState('');
        const [BTCAmount, setBTCAmount] = useState('0');
        const [bridgeFee, setBridgeFee] = useState('0');
        const [bridgeFeeUsd, setBridgeFeeUsd] = useState('0');

        const [checkBTCAddress, setCheckBTCAddress] = useState(true)
        const [minRedeem, setMinRedeem] = useState(true)
        const [maxDecimalsRedeem, setMaxDecimalsRedeem] = useState(true)
        const [spinRedeem, setSpinRedeem] = useState(false)

        const [receiveBtc, setReceiveBtc] = useState('')
        const [receiveBtcUsd, setReceiveBtcUsd] = useState('')

        useEffect(()=>{

            setUsdBtcRedeem((Math.round(parseFloat(BTCAmount)*parseFloat(usdBTC)*100)/100).toFixed(2))

            setReceiveBtc((Math.round(((parseFloat(BTCAmount)*.995)-0.0001)*100000000)/100000000).toString())

            setReceiveBtcUsd((Math.round((parseFloat(receiveBtc)*parseFloat(usdBTC))*100)/100).toFixed(2))

            setBridgeFee((Math.round(((parseFloat(BTCAmount)*.005)+0.0001)*100000000)/100000000).toString())
            setBridgeFeeUsd(((Math.round((parseFloat(ergUsd)*.05)*100)/100)+(Math.round(((parseFloat(usdBtcRedeem)*.005)+(0.0001*parseFloat(usdBTC)))*100)/100)).toFixed(2))




        },[BTCAmount, receiveBtc, usdBtcRedeem]) 


        const handleChangeRedeem = (event:React.ChangeEvent<HTMLInputElement>) => {
            setRedeemAmount(event.target.value);
            if (event.target.value !== '' && (1000 * parseFloat(event.target.value))/1000 !== 0) {
                setBTCAmount(event.target.value);
            } else {
                setBTCAmount('0');
            }

        };

        function checkAmountRedeem(){
            let integer = parseFloat(BTCAmount).toString().replace(/^[^\.]+/,'0');
            if(parseFloat(BTCAmount)<0.0006){
                setMinRedeem(false)
            }else setMinRedeem(true)
            if(integer.length>10){
                setMaxDecimalsRedeem(false)
            }else setMaxDecimalsRedeem(true)

        }

        function checkAddress(){
            if(!check(btcAddress)){
                setCheckBTCAddress(false)
            }else setCheckBTCAddress(true)

        }

        function check(text: string) {
            let regex = /^(?=\w*\d)(?=\w*[a-z])\S{10,60}$/;
            return (regex.test(text));
        }

        function confirmRedeem(){
            if(BTCAmount == '0'){
                if(btcAddress == ''){
                    setCheckBTCAddress(false)}
                    setMinRedeem(false)
            }else if(btcAddress == ''){
                setCheckBTCAddress(false)
            }else if(minRedeem && checkBTCAddress && maxDecimalsRedeem){
                setSpinRedeem(true)
                setTimeout(()=>{
                    setSpinRedeem(false);
                    handleClickOpenRedeem1()
                },2000);
                
            }
        }


        async function handleClickOpenRedeem1() {

                setReceiveBtcG(receiveBtc)
                setBtcAddressG(btcAddress)
                setBTCAmountG(parseFloat(BTCAmount).toString())
                let addressStorage: any = localStorage.getItem('address');
                const address = JSON.parse(addressStorage)
                address ? handleClickOpenRedeem() : setConnectWalletError(true)

        }





        const handleChangeBtcAddress = (event:React.ChangeEvent<HTMLInputElement>) => {
            setBtcAddress(event.target.value);
        }

        return (
            <div id="UNWRAP">
                <p className="title">Redeem BTC</p>
                <input pattern="[0-9]+" min="0" className="btcInput"  max="9999" size={30} placeholder="0.00" required
                       id="mintAmount"
                       name="mintAmount"
                       onChange={handleChangeRedeem}
                       value={redeemAmount}
                       onBlur={checkAmountRedeem}
                /><br/>
                <div className="lblInp">
                    <Image id="bit" src='/img/werg.png' alt="eBTC" width={25} height={25}/>eBTC<br/>
                    <div id="usd">~ $ {parseFloat(BTCAmount) == 0 ? "0.00":usdBtcRedeem}</div>
                </div>
                {minRedeem? "" : <div className='warningBridge redeem'><Image src='/img/error.png' alt="error" width={16} height={16}/> You can redeem a minimum of 0.0006 BTC.</div>}

                {(minRedeem && !maxDecimalsRedeem)?<div className='warningBridge redeem'><Image src='/img/error.png' alt="error" width={16} height={16}/> Enter a multiple number of satoshi (Maximum 8 decimal places).</div>:""}

                <br></br>
                <p/>
                <p className="title2">BTC Destination Address</p>
                <input type="text" className="btcInputAddress" size={30} placeholder="Enter your BTC address" onChange={handleChangeBtcAddress} value={btcAddress} onBlur={checkAddress}
                       required/><br/>
                {checkBTCAddress? "" : <div className='warningBridge address'><Image src='/img/error.png' alt="error" width={16} height={16}/> Please enter a valid BTC Destination Address.</div>}
                <div className="flex-container">
                    <div className="left">You Will Receive</div>
                    <div className="right">
                        <div><Image id="bit" src='/img/Bitcoin.png' alt="BTC" width={25} height={25}/><b>{parseFloat(BTCAmount) == 0 ? "0.00":receiveBtc}</b> BTC</div>
                        <div id="usd" className="feeUSD1"> = $ {parseFloat(BTCAmount)==0 ? "0.00":receiveBtcUsd}</div>
                    </div>
                </div>

                <div className="bridgeFee unWrap">
                    <div className='feeItem'>
                        Bridge fee
                            <div className='amountFee'>
                                <Image id="bit" src='/img/werg.png'
                            alt="aneta" width={25} height={25}/><b>{parseFloat(BTCAmount)==0 ? "0.00":bridgeFee} eBTC</b>
                            <div className='addition'> + </div>
                                <Image id="bit" src='/img/Ergo_dark.png' alt="aneta" className='dark__mode' width={25} height={25}/>
                                <Image id="bit" src='/img/Ergo.png' alt="aneta" className='sun__mode' width={25} height={25}/><b>{parseFloat(BTCAmount)==0 ? 0: 0.05} ERG</b><br/>
                            </div>
                            <div id="usd" className="feeUSD2"> = $ {parseFloat(BTCAmount)==0 ? "0.00":bridgeFeeUsd}</div>
                    </div>
                </div>



                <button onClick={confirmRedeem} type="button" className="mainButton2" id="mintButton">{spinRedeem ? <div className='spinner unwrap'></div>:""}
                    <b>Unwrap eBTC</b></button>
            </div>
        )
    }








}



export default Bridge;