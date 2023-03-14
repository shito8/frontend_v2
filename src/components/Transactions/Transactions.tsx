import React, {useEffect, useState, useMemo} from "react";

//////////////////////////////
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// Add a second document with a generated ID.

import {collection, getDocs} from "firebase/firestore";
import firebaseConfig from "../../../firebase/firebaseConfig";

/////////////////////////////////


function Transactions() {

    
    const app = useMemo(() => {
        if (typeof window !== 'undefined') {
          return initializeApp(firebaseConfig);
        }
      }, []);
      const analytics = useMemo(() => {
        if (typeof window !== 'undefined') {
          return getAnalytics(app);
        }
      }, [app]);
      const db = useMemo(() => {
        if (typeof window !== 'undefined') {
          return getFirestore(app);
        }
      }, [app]);


    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState<any>('')
    const [idN, setId] = useState([]);
    const [getTxs, setGetTxs] = useState(true);
    let txs:any = [{}];
    let txs2 = [{}]

    const [order, setOrder] = useState(false);



    useEffect(() => {
        if(typeof window !== "undefined"){
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
    });


    async function loadTx() {
        const colRef = collection(db, "users");
        const snapshot = await getDocs(colRef);
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

    useEffect(()=>{
        if(order){
            orderProducts()
        }
     },[order]);


    function orderProducts() {

        /* ORDER AND CLEAN products */

        const newProducts:any = []
        for (const indice of products) {
            if(isNaN(Date.parse(indice.datetime))){
            }else{
                newProducts.push(indice)
            }
        }
        newProducts.sort(function(a,b){
            return (Date.parse(b.datetime)-Date.parse(a.datetime))
        })
        return newProducts
        
        
     }

   

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
        const bridge = 0.005
        const br = 32


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
                    

                    orderProducts().map((tx) => {

                            if ((tx.info === "Mint Order Paid" || tx.info === "Mint Order Processing"|| tx.info === "Mint Order Submitted") && tx.erg_address === address && tx.info != "Mint Order Success") {
                                
                                return <tbody>
                                    <tr>
                                    <td className="TD1" >{tx.datetime}</td>

                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{Math.round((0.001+ bridge * tx.amount) * 100000000) / 100000000} BTC </a>
                                    </td>

                                    <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                    <td className="TD1"><p className="bord"><b className="boldPo">• Pending </b></p></td>
                                </tr>
                                </tbody>
                            }
                            if(tx.info === "Mint Order Success" && tx.erg_address === address) {
                                return <tbody>
                                    <tr >
                                    <td className="TD1" >{tx.datetime}</td>

                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                    <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{Math.round((0.001+ bridge * tx.amount) * 100000000) / 100000000} BTC </a>
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
        const bridge = 0.005
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
                            orderProducts().map((tx) => {
                                    if ((tx.info === "Redeem Order Paid" || tx.info === "Redeem Order Processing"|| tx.info === "Redeem Order Submitted") && tx.erg_address === address) {

                                        return <tbody>
                                            <tr >
                                            <td className="TD1" >{tx.datetime}</td>

                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{Math.round((bridge * tx.amount + 0.0001 + 0.05) * 100000000) / 100000000} BTC </a>
                                            </td>

                                            <td className="TD1">{tx.id ? tx.id.substring(0, 7) + '-' + tx.id.substring(tx.id.length - 7, tx.id.length) : ""}</td>
                                            <td className="TD1"><p className="bord"><b className="boldPo">• Pending</b></p></td>
                                        </tr>
                                        </tbody>
                                    }
                                    if(tx.info === "Redeem Order Success" && tx.erg_address === address) {
                                        return <tbody>
                                            <tr >
                                            <td className="TD1" >{tx.datetime}</td>

                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.ebtc_mint_tx_id}>{tx.amount} eBTC </a> </td>
                                            <td className="TD1"><a href={"https://explorer.ergoplatform.com/en/transactions/"+ tx.erg_txid}>{Math.round((bridge * tx.amount + 0.0001 + 0.05) * 100000000) / 100000000} BTC </a>
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
