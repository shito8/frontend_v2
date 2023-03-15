import {useState, useEffect} from "react";
import {OutputBuilder, SConstant, SColl, TransactionBuilder, SByte, SLong} from "@fleet-sdk/core";

declare const ergo: any;

const TOKEN_ID = `${process.env.NEXT_PUBLIC_TOKEN_ID_EBTC}`;

const VAULT_ERG_WALLET_ADDRESS = `${process.env.NEXT_PUBLIC_VAULT_ERG_WALLET_ADDRESS}`;

const sendPaymentFunction = async function sendTransaction1(price: string, btcAddress: string, nautilusAddress: string) {

    let result = ''
    let currentHeight = await ergo.get_current_height();

    let amountToSend = BigInt(50000000);

    let tokenAmountCalculator = parseFloat(price) * 100000000;
    let tokenAmountTrunc = Math.trunc(tokenAmountCalculator)
    let tokenAmountToSend = BigInt(tokenAmountTrunc);
    let feeAmount = BigInt(20000000);
    let fee = feeAmount;
    let inputs = await ergo.get_utxos() 

    const utf8Encode = new TextEncoder();
    const encodedString = utf8Encode.encode(btcAddress);


    try{


        const unsignedTransaction = new TransactionBuilder(currentHeight)
            .from(inputs)
            .to(new OutputBuilder(amountToSend, VAULT_ERG_WALLET_ADDRESS)
                .addTokens([
                    {tokenId: TOKEN_ID, amount: tokenAmountToSend}
                ])
                 .setAdditionalRegisters({
                    R4: SConstant(SColl(SByte, encodedString)),
                })
            )
            .sendChangeTo(nautilusAddress).payMinFee()
            .build()
            .toEIP12Object();



        let signedTransaction = await ergo.sign_tx(unsignedTransaction)

        //let outputZeroBoxId = signedTransaction.outputs[0].boxId;
        let txInfo = await ergo.submit_tx(signedTransaction)


        result = txInfo





    }catch(e){
        console.log("error", e)
        result = ''
    }


    return result
    

}




export default sendPaymentFunction;