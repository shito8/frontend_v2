import React, {useEffect, useState, useMemo } from "react";
import Image from 'next/image';

function Navbar() {


    const [selected, setSelected] = useState("Ergo")
    const [visible, setVisible] = useState(false);
    const [userAddress, setUserAddress] = useState<any>(null);


    useEffect(() => {
        if(typeof window !== "undefined"){
            let addressStorage = (localStorage.getItem('address'));
            if(addressStorage === null){
            } else{
                setUserAddress(JSON.parse(addressStorage))
                connect()
            }
               }
      }, []);

      const connect = async () => {
        await ergoConnector.nautilus.connect();
      }


    async function handleWalletConnect() {

        if (userAddress === null) {
            const isConnected = await ergoConnector.nautilus.connect();

            if (isConnected) {
                const address = await ergo.get_change_address();
                localStorage.setItem('address', JSON.stringify(address))
                setUserAddress(address)              
            }

        }else{
            await ergoConnector.nautilus.connect();
            visible ? setVisible(false) : setVisible(true)
        }
    }

    async function disconnect() {

        await ergoConnector.nautilus.disconnect();
        localStorage.removeItem('address');
        setUserAddress(null)

        setVisible(false)
    }
    const [dark, setDark] = useState(false)

    const darkModeToggle = () => {
            document.body.classList.toggle("dark");
            if(document.body.classList.contains('dark')){
                setDark(true)
                localStorage.setItem('dark-mode', 'true')
            }else{
                setDark(false)
                localStorage.setItem('dark-mode', 'false')};
    }

    useEffect(()=>{

        if(typeof window !== "undefined"){
       if( localStorage.getItem('dark-mode') === 'true')
       {document.body.classList.add('dark');
        setDark(true);
        }else {document.body.classList.remove('dark');
        setDark(false);}
        }
    },);


    return (
        <div>
            
            <div id="navbar_menu">
                <div id="imgLogonav">
                        {dark ? <Image src='/img/logo_dark.png' alt="aneta" className="imgLogo" width={140} height={29} priority/> : <Image src='/img/logo.png' alt="aneta" className="imgLogo" width={140} height={29} priority/>}
                </div>
                <div id="head">
                    <a target="_blank" href="https://bitcoinfaucet.uo1.net/">
                        <div className="menuButton">
                            Get Test BTC
                        </div>
                    </a>
                    <a target="_blank" href="https://moonshinewallet.com/">
                        <div className="menuButton">
                            Download Moonshine Wallet
                        </div>
                    </a>
                    <div><DropDown selected={selected} setSelected={setSelected} dark={dark}/></div>
                    <div>
                        <div className="menuButton" id="connect" onClick={handleWalletConnect}>
                            {userAddress ? <Image id="nautilusimg" alt="aneta" src='/img/nautilus.png' width={20} height={20}/> : ""}
                            {userAddress ? userAddress.substring(0, 4) + '...' + userAddress.substring(userAddress.length - 4, userAddress.length) : 'Connect wallet'}
                        </div>
                        {visible ? <div className="menuButton" id="disconnect" onClick={disconnect}>Disconnect</div> : "" }


                    </div>
                    <div>
                        <button type="button" className="menuButton" id="sun" onClick={darkModeToggle}>
                            {dark ? <Image alt="aneta" src='/img/Vector_dark.png' width={15} height={15} id="Vector"/>: <Image alt="aneta" src='/img/Vector.png' id="Vector" width={15} height={15}/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}


function DropDown({selected, setSelected, dark}) {
    const [isActive, setIsActive] = useState(false)


    /*const options = ["Ergo", "Cardano"];*/
    const options = ["Ergo"]; /* Cardano Inactive at this stage */
    return (
        <div className="dropdown"  id={"dropdown"} >
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                <div className="imgwrapper">

                    {dark ? <Image src={`/img/${selected}_dark.png`} alt="logoBlock" id="Vector" width={15} height={15}/>:<Image src={`/img/${selected}.png`} alt="logoBlock" id="Vector" width={15} height={15}/>}

                </div>
                <div>{selected}</div>


            </div>

            {isActive && (
                <div className="dropdown-content" id={"drop-content"}>
                    <p id="navText">Select Network</p>
                    {options.map((option) => (
                        <div onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }}
                             className="dropdown-item">
                            <div className="temporary"> {/* This div unique Cardano Inactive at this stage */}
                            <div>{dark ? <Image className="nav-icon" src={`/img/${option}_dark.png`} alt="aneta" id="Vector" width={15} height={15}/>:<Image className="nav-icon" src={`/img/${option}.png`} alt="aneta" id="Vector" width={15} height={15}/>}</div>
                            <div>{option}</div>
                            {selected === option && (
                                <div className="selected"></div>
                            )}
                            </div>{/* This div unique Cardano Inactive at this stage */}
                            {/* Cardano Inactive at this stage */}
                            
                            <div className="temporary">
                                <div>{dark ? <Image className="nav-icon" src='/img/Cardano_dark.png' alt="aneta"
                                    id="Vector" width={15} height={15}/>:<Image className="nav-icon" src='/img/Cardano_dark.png' alt="aneta"
                                    id="Vector" width={15} height={15}/>}
                                </div>
                                <div id="disabled">Cardano</div>
                            </div>
                            
                            {/* Cardano Inactive at this stage */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default Navbar;
