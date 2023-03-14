import CountdownTimer from "./CountdownTimer";
import QRCode from "react-qr-code";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import BTCDeposit from "./BTCDeposit";
import Image from 'next/image';


///////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";

// Add a second document with a generated ID.

import {addDoc, collection} from "firebase/firestore";
import firebaseConfig from "../../../../firebase/firebaseConfig";

/////////////////////////////////

function QRWindow({ eBTC, popup, setPopup, receiveBtc }: {
    eBTC: string,
    popup: boolean,
    setPopup: React.Dispatch<React.SetStateAction<boolean>>,
    receiveBtc: string
  }) {

    const VAULT_BTC_WALLET_ADDRESS = `${process.env.NEXT_PUBLIC_VAULT_BTC_WALLET_ADDRESS}`


    const app = useMemo(() => {
        if (typeof window !== 'undefined') {
          return initializeApp(firebaseConfig);
        }
      }, []);
      const analytics = useMemo(() => {
        if (typeof window !== 'undefined' && app !== undefined) {
          return getAnalytics(app);
        }
      }, [app]);
      const db = useMemo(() => {
        if (typeof window !== 'undefined' && app !== undefined) {
          return getFirestore(app);
        }
      }, [app]);


    const [nautilusAddress, setNautilusAddress] = useState<any>('');

    useEffect(()=>{
        if(typeof window !== "undefined"){
            let addressStorage: any = (localStorage.getItem('address'));
            setNautilusAddress(addressStorage)
        }
    }, [])

    const [vaultAddress, setVaultAddress] = useState('');


    const [paymentWindow, setPaymentWindow] = useState(true)

    const navigateToBTCDeposit = async () => {

        // TODO Write to DB

        try {
            if(db){
            const docRef = await addDoc(collection(db, "payments"), {
                erg_address: nautilusAddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),

                info: "Mint Order Paid"
            });
        }

        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setPaymentWindow(false);

    }

    async function writeToDB() {
        // TODO Write to DB

        try {
            if(db){
            const docRef = await addDoc(collection(db, "users"), {
                erg_address: nautilusAddress,
                amount: eBTC,
                datetime: new Date().toUTCString(),
                info: "Mint Order Submitted"
            });
        }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }




    useEffect(() => {
        const getVaultAddress = () => {
          setVaultAddress(VAULT_BTC_WALLET_ADDRESS);
        };
      
        getVaultAddress();
      }, [VAULT_BTC_WALLET_ADDRESS]);


    const THREE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;


    return (
        <div>
            {paymentWindow ? <PaymentInfo/> : <BTCDeposit eBTC={eBTC} popup={popup} setPopup = {setPopup} receiveBtc={receiveBtc}/>}
        </div>
    )


    function PaymentInfo() {

  
        const [copy, setCopy] = useState("");


        const [spinQR, setSpinQR] = useState(false)



        function btnCopy() {
            const btnCopy = document.querySelector(".labelAdd")?.childNodes[0]
            if(btnCopy){
                const textContent = btnCopy.textContent ?? "";
                navigator.clipboard.writeText(textContent)
            }
            setCopy("true");
            setTimeout(() => {
                setCopy("false");
            }, 1500);
        }

        function confirmQR(){

                setSpinQR(true)
                setTimeout(()=>{
                    setSpinQR(false);
                },3000);
                setTimeout(()=>{
                    writeToDB()
                    navigateToBTCDeposit()
                },2000);
                
            
        }

    const closePop = () => {
        setPopup(false)
    }



        return (
            <div className="mainPopup">
                <div className="popup">
                    <div className="divLabel">
                        <Image id="bitcoin" src='/img/Bitcoin.png' alt="aneta" width={33} height={33}/> <label
                        className="labelMain"> BTC Deposit</label>
                        <div id="close">
                            <Image src='/img/dark_close.png' alt="X" onClick={closePop} width={18} height={18}/>
                        </div>
                    </div>
                    <div className="menuPopup">
                        <label className="SingleTrans1">Using Moonshine Wallet,<br/>Send {eBTC} BTC</label>
                        <p></p>
                        <label className="SingleTrans2">In a single transaction to: </label>
                        <div className="addressBTC">
                            <div className="labelAdd" onClick={btnCopy}>
                                <p>{vaultAddress}</p>
                                <Image id="copy" className="sun__mode"
                                     src='/img/copy.png' alt="copy" width={13} height={15}/>
                                <Image id="copy" className="dark__mode"
                                     src='/img/copy_dark.png' alt="copy" width={13} height={15}/>
                                {copy === "true" ? <p id="copyPop">Copied</p> : ""}
                            </div>
                        </div>
                        <div className="timing">
                            <p/><CountdownTimer targetDate={dateTimeAfterThreeDays}></CountdownTimer><p/>
                        </div>
                        <div className="attention">
                            <span><b className="warning">Attention:</b></span>
                        </div>
                        <div className="information">
                            <b>Add your ERG address</b> in the “Message (Optional)” section in your Moonshine Wallet
                            before sending this deposit.<br/><br/>This ERG address will receive eBTC. If you do not add your ERG
                            address into the message section of this transaction, you will not receive eBTC.
                        </div>
                        <div className="backgroundQR">
                            <div className='qrCode'>
                                <QRCode
                                    id="qrCode"
                                    value={vaultAddress}
                                    size={120}
                                    level={"L"}
                                />
                            </div>
                        </div>
                        <div className="note">
                            <span><b>Note:</b> Payments may take over 10 minutes to confirm. {"Don't"} worry, your funds are safe :)</span>
                        </div>

                        <button className="btnPayment" onClick={confirmQR}>{spinQR ? <div className='spinner QR'></div>:""}I have sent the deposit</button>


                    </div>
                </div>

            </div>
        )
    }




    
}


export default QRWindow