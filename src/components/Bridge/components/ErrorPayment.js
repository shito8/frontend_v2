import React, {useState} from 'react';
import Image from 'next/image';


function ErrorPayment({popupr, setPopupr}) {


    const closePop = () => {
        setPopupFixed(false);
    }


    const [popupFixed, setPopupFixed] = useState(true);

    setTimeout(()=>{
        setPopupFixed(false);
        setPopupr(false)
    },5000);


    return(
        popupFixed ? 
        <div className="popupFixed">
            <div id="close">
                    <Image src='/img/dark_close.png' alt="X" onClick={closePop} width={18} height={18}/>
            </div>
            <div className="result">
                <div>
                    <Image src='/img/fail.png' alt="fail" width={80} height={80}/>
                </div>
                <div className="resultTx">
                    <p>Transaction Failed</p>
                    <p>Please Try Again</p>
                </div>
            </div>
        </div> : <></>
    )
}

export default ErrorPayment