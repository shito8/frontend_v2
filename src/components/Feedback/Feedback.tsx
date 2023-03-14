import React from 'react';
import Image from 'next/image';

function Feedback() {
  return (
    <div className="feedback-page">
    <div className='mainmenu_feedback'>
    <a target="_blank" rel="noreferrer" href="https://5c3i0k2q3p5.typeform.com/to/hfymRoSr"><div className="feedback-page__content-btn">anetaBTC Feedback Form</div></a>
    <a target="_blank"rel="noreferrer" href="https://discord.com/invite/ScXG76dJXM"><div className="feedback-page__content-btn">Discuss on Discord
                    <Image src='/img/i_discord_dark.png' width={20} height={15} alt="aneta" id="Icons" className="dark__mode"/>
                    <Image src='/img/i_discord.png' width={20} height={15} alt="aneta" id="Icons" className="sun__mode"/></div></a>
    <a target="_blank" rel="noreferrer" href="https://t.me/anetaBTC"><div className="feedback-page__content-btn">Discuss on Telegram
                    <Image src='/img/i_tg_dark.png' width={17} height={15} alt="aneta" id="Icons" className="dark__mode"/>
                    <Image src='/img/i_tg.png' width={17} height={15} alt="aneta" id="Icons" className="sun__mode"/></div></a>
   </div>
   </div>
  )
}

export default Feedback;