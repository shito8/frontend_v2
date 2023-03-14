import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect} from 'react';

function Menu() {

    useEffect(() => {
        if(typeof window !== "undefined"){

                let menuActive = document.querySelectorAll(".menu-item")
        
                    for(let i=0; i<menuActive.length; i++){
                        
                        if(menuActive[i] == window.location.href){
                            menuActive[i].classList.add("active")
                        }
                
                        menuActive[i].addEventListener("click", function(){
                            for(const items of menuActive){
                                
                                items.classList.remove("active")
                            }
                            this.classList.add("active");
                            })
                        }
        }
      }, []);





    

    return (
        <div className="sidebar" id="sidebar">
            <div className="menuTop">
                <div className="net">
                    Testnet
                </div>
            </div>
            <div className="sidebar_content">
                <ul className="menuList">
            <Link href='/' className="menu-item">
                
                    <div className="menu-icon">
                    <Image src='/img/bridge_dark.png' alt="anetaBridge" id="Vector" className="dark__mode" width={12} height={15}/>
                    <Image src='/img/bridge.png' alt="anetaBridge" id="Vector" className="sun__mode" width={12} height={15}/>
                    </div>
                    <li className="btnM">
                     Bridge
                    </li>
                
            </Link>
            <Link href="/transactions" className="menu-item">
            
                <div className="menu-icon">
                <Image src='/img/transactions_dark.png' alt="anetaTx" id="Vector" className="dark__mode" width={14} height={15}/>  <Image src='/img/transactions.png' alt="anetaTx" id="Vector" className="sun__mode" width={14} height={15}/>
                </div>
                <li className="btnM">
                    Transactions
                </li>
            
            </Link>

            <Link href="/dashboard" className="menu-item">
            
                <div className="menu-icon">

                <Image src='/img/dashboard_dark.png' alt="anetaDash" id="Vector" className="dark__mode" width={16} height={15}/>
                <Image src='/img/dashboard.png' alt="anetaDash" id="Vector" className="sun__mode" width={16} height={15}/>
                </div>
                <li className="btnM">
                    Dashboard
                </li>
            
            </Link>

            </ul>
                <br/>
            <hr id="menuHR"></hr>
            <ul>

            <Link href="/feedback" className="menu-item">

            

                <div className="menu-icon">
                    <Image src='/img/feedback_dark.png' alt="anetaFeedback" id="Vector" className="dark__mode" width={16} height={15}/>
                    <Image src='/img/feedback.png' alt="anetaFeedback" id="Vector" className="sun__mode" width={16} height={15}/>
                </div>
                <li className="btnM">
                    Feedback
                </li>
            

            </Link>


            <a href="https://docs.anetabtc.io/" target="_blank" className="menu-item">
                <div className="menu-icon">
                    <Image src='/img/docs_dark.png' alt="anetaDocs" id="Vector" className="dark__mode" width={15} height={15}/>
                    <Image src='/img/docs.png' alt="anetaDocs" id="Vector" className="sun__mode" width={15} height={15}/>
                </div>

                <li className="btnM">
                    Docs
                    <Image src='/img/link_dark.png' alt="anetaLink" id="linkImg" className="dark__mode" width={9} height={9}/>
                    <Image src='/img/link.png' alt="anetaLink" id="linkImg" className="sun__mode" width={9} height={9}/>
                      
                </li>
            </a>
            </ul>

            <div className="socialMedia">
                <a href="https://twitter.com/anetaBTC" className="menu-icon">
                    <Image src='/img/twitter.png' alt="anetaSM" id="Vector-sm" width={17} height={17}/>
                </a>
                <a href="https://discord.com/invite/ScXG76dJXM" className="menu-icon">
                    <Image src='/img/discord.png' alt="anetaSM" id="Vector-sm" width={17} height={17}/>
                </a>
                <a href="https://t.me/anetaBTC" className="menu-icon">
                    <Image src='/img/telegram.png' alt="anetaSM" id="Vector-sm" width={17} height={17}/>
                </a>
                <a href="https://github.com/anetabtc" className="menu-icon">
                    <Image src='/img/git.png' alt="anetaSM" id="Vector-sm" width={17} height={17}/>
                </a>
            </div>
            </div>
        </div>
    )
}
export default Menu;
