import React, {useEffect, useState, useMemo, useCallback} from "react";

//////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.

import {collection, getDocs} from "firebase/firestore";
import { getFirebase } from "../../utils/getData";

/////////////////////////////////

function Transactions() {

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

    interface Transaction {
        info: string;
        erg_address: string;
        amount: number;
        datetime: string;
        ebtc_mint_tx_id: string;
        erg_txid: string;
        id: string;
      }

    
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


      const [products, setProducts] = useState<Array<{
        id: string,
        datetime: string,
        amount: number,
        btc_address: string,
        erg_txid: string,
        info: string,
        btc_tx_id: string,
        ebtc_mint_tx_id: string,
        erg_address: string
    }>>([]);
    const [address, setAddress] = useState<any>('')
    const [getTxs, setGetTxs] = useState(true);
    let txs:any = [{}];

    const [order, setOrder] = useState(false);


    const loadTx = useCallback(async () => {
        if(db){
          const colRef = collection(db, "users");
          const snapshot = await getDocs(colRef);
          const txs: any = [];
          snapshot.forEach(doc => {
            txs.push(
              {
                "id": doc.id,
                "datetime": doc.data().datetime,
                "amount": doc.data().amount,
                "btc_address": doc.data().btc_address,
                "erg_txid": doc.data().erg_txid,
                "info": doc.data().info,
                "btc_tx_id": doc.data().btc_tx_id,
                "ebtc_mint_tx_id": doc.data().ebtc_mint_tx_id,
                "erg_address": doc.data().erg_address
              }
            )
          })
          setProducts(txs)
          setOrder(true)
        }
      }, [db, setProducts]);

    useEffect(() => {
        if(firebaseLoaded && typeof window !== "undefined"){
            let addressStorage: any = (localStorage.getItem('address'));
            try{
                setAddress(JSON.parse(addressStorage))
            }catch (e) {
                setAddress('')
            }
            if(getTxs){
                loadTx()
                setGetTxs(false)
            }
        }
    }, [firebaseLoaded, getTxs, loadTx, setAddress, setGetTxs]);


    const orderProducts = useCallback(() => {
        /* ORDER AND CLEAN products */
      
        const newProducts: any = []
        for (const indice of products) {
          if (isNaN(Date.parse(indice.datetime))) {
          } else {
            newProducts.push(indice)
          }
        }
        function compare(a: { datetime: string }, b: { datetime: string }) {
          return Date.parse(b.datetime) - Date.parse(a.datetime);
        }
      
        newProducts.sort(compare);
      
        return newProducts;
      }, [products]);
      
      useEffect(() => {
        if (order) {
          orderProducts();
        }
      }, [order, orderProducts]);

   

    const [visible, SetVisible] = useState(true);

    function DownUp() {
        if (visible) {

            return (
                <MintPage/>
            )
        } else {
            return (
                <RedeemPage/>
            )
        }
    }

    return (

        <div>

            <div id="radiosTrans">
                <input id="rad3" type="radio" name="radioBtn" onClick={() => SetVisible(true)}/>
                <label className="labelsTr" htmlFor="rad3"><b>Wrap Requests</b></label>
                <input id="rad4" type="radio" name="radioBtn" onClick={() => SetVisible(false)}/>
                <label className="labelsTr" htmlFor="rad4"><b>Unwrap Request</b></label>
                <div id="bckgrnd1"></div>

            </div>
            <DownUp/>

        </div>
    )

    function MintPage() {

        return (
            <div className="mainmenu_transaction">

                <p className="transactionTitle1" >Wrap Requests</p>

                <table className="tableWrap" >
                    <tbody>
                    <tr>
                        <td className="TD1">Created at</td>
                        <td className="TD1">Transaction (eBTC)</td>
                        <td className="TD1">Transaction (Bridge Fee)</td>
                        <td className="TD1" >anetaBTC ID</td>
                        <td className="TD1">Confirmation Status</td>
                    </tr>
                    </tbody>
                    <tbody className="menuHR2"/>
                    


                {
                    

                    orderProducts().map((tx: Transaction) => {

                        if (tx.info !== "Mint Order Success" && [ "Mint Order Paid", "Mint Order Processing", "Mint Order Submitted"].includes(tx.info) && tx.erg_address === address) {
                                
                                return <tbody key={tx.id}>
                                    <tr>
                                    <td className="TD1" >{tx.datetime}</td>

                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{(Math.round(((tx.amount*.005)+0.0001)*100000000)/100000000).toString()} BTC </a>
                                    </td>

                                    <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                    <td className="TD1"><p className="bord"><b className="boldPo">• Pending </b></p></td>
                                </tr>
                                </tbody>
                            }
                            if(tx.info === "Mint Order Success" && tx.erg_address === address) {
                                return <tbody key={tx.id}>
                                    <tr >
                                    <td className="TD1" >{tx.datetime}</td>

                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{(Math.round(((tx.amount*.005)+0.0001)*100000000)/100000000).toString()} BTC </a>
                                    </td>

                                    <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                    <td className="TD1"><p className="bord"><b className="boldPo1">• Complete</b></p></td>
                                </tr>
                                </tbody>
                            }
                            else {
                                return null
                            }
                        }
                    )
                }

                </table>
            </div>
        )
    }

    function RedeemPage() {

        return (
            <div className='mainmenu_transaction'>
                <div>


                    <p className="transactionTitle1">Unwrap Requests</p>
                    <table className="tableWrap">
                        <tbody>
                        <tr>
                            <td className="TD1">Created at</td>
                            <td className="TD1">Transaction (eBTC)</td>
                            <td className="TD1">Transaction (Bridge Fee)</td>
                            <td className="TD1">anetaBTC ID</td>
                            <td className="TD1">Confirmation Status</td>
                        </tr>
                        </tbody>
                        <tbody className="menuHR2"/>
                        
                        {
                            orderProducts().map((tx: Transaction) => {
                                    if ((tx.info === "Redeem Order Paid" || tx.info === "Redeem Order Processing"|| tx.info === "Redeem Order Submitted") && tx.erg_address === address) {

                                        return <tbody key={tx.id}>
                                            <tr >
                                            <td className="TD1" >{tx.datetime}</td>

                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{(Math.round(((tx.amount*.005)+0.0001)*100000000)/100000000).toString()} BTC </a>
                                            </td>

                                            <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                            <td className="TD1"><p className="bord"><b className="boldPo">• Pending</b></p></td>
                                        </tr>
                                        </tbody>
                                    }
                                    if(tx.info === "Redeem Order Success" && tx.erg_address === address) {
                                        return <tbody key={tx.id}>
                                            <tr >
                                            <td className="TD1" >{tx.datetime}</td>

                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{(Math.round(((tx.amount*.005)+0.0001)*100000000)/100000000).toString()} BTC </a>
                                            </td>

                                            <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                            <td className="TD1"><p className="bord"><b className="boldPo1">• Complete</b></p></td>
                                        </tr>
                                        </tbody>
                                    }
                                    else {
                                        return null
                                    }
                                }
                            )
                        }
                    </table>

                </div>
            </div>
        )

    }
}

export default Transactions;
