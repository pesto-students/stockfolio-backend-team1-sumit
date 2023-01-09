import React, {useState} from "react"; 
import backgound_desktop from './Assets/bg2.gif';
import backgound_mobile from './Assets/bg3.gif';

function Header(){


    React.useEffect(() => {
        const handleWindowResize = () => {
            const bool =  window.innerWidth < 367 ? true : false;
            setMobile(bool) 
                
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
        window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    return(
        <div className="heading" style={{backgroundImage: "url(" +( isMobile? backgound_mobile : backgound_desktop) + ")", height: '400px'}}>
        </div>
    )

}


export default Header;