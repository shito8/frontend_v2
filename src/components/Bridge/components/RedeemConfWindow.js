import React, {useEffect, useState, useMemo} from "react";
import Image from 'next/image';

//////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.
import {addDoc, collection, getDocs} from "firebase/firestore";
import { getFirebase } from "../../../utils/getData";


/////////////////////////////////

function RedeemConfWindow({eBTC, btcAddress, nautilusAddress, txInfo, popupr, setPopupr, receiveBtc}) {


  const [firebaseLoaded, setFirebaseLoaded] = useState(false);

  const [firebaseConfig, setFirebaseConfig] = useState({
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    });
    
    useEffect(() => {
      getFirebase().then((data) => {
        setFirebaseConfig({
          apiKey: data.apiKey,
          authDomain: data.authDomain,
          projectId: data.projectId,
          storageBucket: data.storageBucket,
          messagingSenderId: data.messagingSenderId,
          appId: data.appId,
          measurementId: data.measurementId
        });
        setFirebaseLoaded(true);
      });
    }, []);


    const app = useMemo(() => {
      if (firebaseLoaded && typeof window !== 'undefined') {
        return initializeApp(firebaseConfig);
      }
    }, [firebaseConfig, firebaseLoaded]);
    const analytics = useMemo(() => {
      if (firebaseLoaded && typeof window !== 'undefined' && app !== undefined) {
        return getAnalytics(app);
      }
    }, [firebaseLoaded, app]);
    const db = useMemo(() => {
      if (firebaseLoaded && typeof window !== 'undefined' && app !== undefined) {
        return getFirestore(app);
      }
    }, [firebaseLoaded, app]);




    const [popupFixed, setPopupFixed] = useState(true);

    setTimeout(()=>{
        setPopupFixed(false);
    },6000);

    function closePop(){
        setPopupFixed(false);
        setPopupr(false);
    }

    const explorerUrl = `https://ergo-explorer.anetabtc.io/transactions/${txInfo}`



    useEffect(() => {
      if(firebaseLoaded){
        async function writeToDB(nautilusAddress, btcAddress, eBTC, txInfo) {
          try {
            const docRef = await addDoc(collection(db, "users"), {
              erg_address: nautilusAddress,
              btc_address: btcAddress,
              amount: eBTC,
              datetime: new Date().toUTCString(),
              erg_txid: txInfo,
              info: "Redeem Order Submitted"
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      
        writeToDB(nautilusAddress, btcAddress, eBTC, txInfo);
      }
      }, [nautilusAddress, btcAddress, eBTC, txInfo, db, firebaseLoaded]);



    return (
        <div className="redeemConfWindow">
            
                
            <div className="titleBTC">Unwrap Transaction Successful<Image src='/img/success.png' alt="success" width={24} height={24}/></div>
                <div id="close">
                    <Image src='/img/dark_close.png' alt="X" onClick={closePop} width={18} height={18}/>
                </div>
            <div className="resultBridge">
                <div className="amountBridge">
                        <div className="card">
                        <Image id="bitcoin" src='/img/werg.png' alt="eBTC" width={33} height={33}/>
                        <p>eBTC</p>
                    </div>
                    <div>{eBTC}</div>
                </div>
                <div className="arrowBridge"><Image src='/img/arrow_green.png' alt="arrow" width={80} height={22}/></div>
 
                <div className="amountBridge">
                    <div className="card">
                        <Image id="bitcoin" src='/img/Bitcoin.png' alt="btc" width={33} height={33}/>
                        <p>BTC</p>
                    </div>
                    <div>{receiveBtc}</div>
                </div>
            </div>


            <div className="text1">Your eBTC payment was successfully submitted.</div>
            <div className="text3">BTC will be sent to your BTC wallet shortly<br/>This may take up to 24 hours. Don’t worry, your funds are safu :).</div>
            <div className="text2 address">BTC Destination Address:
                <br/>{btcAddress}
            </div>
            <div className="text1">The status and details of this transaction can be found in the “Transactions” tab on the side menu.</div>
            <div className="text2"><b><div>Support</div></b><br/>If you need support, your BTC transaction ID will help us assist you.</div>
            <button type="button" id="confButton1" className="confWRS" onClick={closePop}><b>Close</b></button>
                
            


            {popupFixed ? <div className="popupFixed">
                <div id="close">
                    <Image src='/img/dark_close.png' alt="X" onClick={closePop} width={18} height={18}/>
                </div>
                <div className="result">
                    <div>
                        <Image src='/img/success.png' alt="success" width={80} height={80}/>
                    </div>
                    <div className="resultTx">
                        <p>Transaction Successful</p>
                        <a className="txInfo" href={explorerUrl} target="_blank">View on Explorer</a>
                    </div>
                </div>
            </div> : ""}
        </div>
    )


}



export default RedeemConfWindow