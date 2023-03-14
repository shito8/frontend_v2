import React, {useEffect, useState} from "react";
import Image from 'next/image';


function Kya() {

    const [connection, setConnection] = useState(false)
    const [accept, setAccept] = useState(true)




    useEffect(() => {
        if(typeof window !== "undefined"){
            window.addEventListener("load", ()=>{
                let connect = JSON.parse(localStorage.getItem('address'));
                setTimeout(()=>{
                    connect == null ? setAccept(false) : setConnection(true);
                },2000);
            })  
        }

    });

    const acceptFunction = () => {
        setAccept(true)
    }

  return (
    <div>
        {(connection || accept) ? "" :<div className="mainPopup">
            <div className="confContent" id="kya">
                <div className="confWindow"> 
                    <div className="kya">
                        <div>
                            <h2>Know Your Assumptions (KYA)<div id="close"><Image src='/img/dark_close.png' onClick={acceptFunction} alt="X" width={18} height={18}/>
                            </div></h2>
                            <p>This website (app.anetabtc.io) provides the means for users to interact with the anetaBTC protocol. <br/>The anetaBTC protocol operates as a financial protocol built on top of the Ergo blockchain, operated in large part by smart contracts.</p>
                            <p><b>Notice:</b><br/>app.anetabtc.io is currently being operated on the Ergo Mainnet. As a precautionary measure, it is strongly recommended that users utilize a new Ergo wallet when interacting with app.anetabtc.io, as the safety and security of the wallet dApp connection is not fully guaranteed during this testing phase.</p>
                            <p><b>By Accepting these KYA, you agree that:</b></p>
                                <div>
                                <ol>
                                    <li>You will use app.anetabtc.io at your own risk;</li>
                                    <li>Only YOU are responsible for your own assets;</li>
                                    <li>The anetaBTC protocol and its smart contracts meet your expectations.</li>
                                </ol>
                                </div>
                            
                            <p><b>Notice that:</b></p>
                            <div>
                                <ul>
                                    <li>app.anetabtc.io operates on a live blockchain, thus all transactions are final and irreversible.</li>
                                    <li>Every transaction can be viewed via Ergo Explorer and BTC Explorer.</li>
                                    <li>By creating an order you send your funds to a specific smart-contract, all such contracts are wired into the user interface. Thus, orders are created entirely in your browser (on your machine).</li>
                                </ul>
                            </div>
                            
                            <p><b>The anetaBTC team doesn't guarantee the absence of bugs and errors.<br/>app.anetabtc.io is without a Know Your Customer (KYC) process and can offer NO assistance if a user is hacked or cheated out of passwords, currency or private wallet keys.</b></p>
                            <p><b>NOTICE:</b><br/>This build of app.anetabtc.io is classed as <b>BETA.</b><br/>You should only use this build for testing purposes.<br/>app.anetbtc.io will not be liable for any losses incurred on the user, this includes losses caused by bugs, errors, downtimes or exploits.
                            </p>
                        </div>
                        <button type="button" id="confButton1" className="confWRS" onClick={acceptFunction} ><b>I understand the risks and accept KYA</b></button>
                    </div> 
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Kya