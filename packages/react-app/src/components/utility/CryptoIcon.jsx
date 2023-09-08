import btcLogo from 'cryptocurrency-icons/svg/color/btc.svg'
import solLogo from 'cryptocurrency-icons/svg/color/sol.svg'
import polyLogo from 'cryptocurrency-icons/svg/color/poly.svg'
import ethLogo from 'cryptocurrency-icons/svg/color/eth.svg'
import usdLogo from 'cryptocurrency-icons/svg/color/usd.svg'

import { Avatar } from '@mantine/core'

const iconMachine = {
    "btc": btcLogo,
    "sol": solLogo,
    "poly": polyLogo,
    "eth": ethLogo,
    "usd": usdLogo,
}

/**
 * 
 * This is a component to generate an icon based on a string that passes through.  This component file also contains an 
 * object with the currency name as a string and the logo as a value
 * 
 */

function CryptoIcon({currency, height, width, avaterSize}){
    let cssHeight = height || "32px"
    let cssWidth = width || "32px"
    let cssAvatar = avaterSize || "md"
    return (
        <Avatar radius="xl" size={cssAvatar} sx={{width: cssWidth, height: cssHeight, fontSize: "12px", display: "flex", alignItems: "center"}}>??</Avatar>
    )

    // try {
    // if (currency.toLowerCase() in iconMachine) {
    //     return (
    //         <img src={iconMachine[currency.toLowerCase()]} style={{width: cssWidth, height: cssHeight}} alt="" />
    //     )
    
    // } else {
    //     let currencyLetters = currency.slice(0,2)
    //     return (
    //         <Avatar radius="xl" size={cssAvatar} sx={{width: cssWidth, height: cssHeight, fontSize: "12px", display: "flex", alignItems: "center"}}>{currencyLetters}</Avatar>
    //     )
    // }
    // } catch (error) {
    //     console.log(error)
    //     return (
    //         <Avatar radius="xl" size={cssAvatar} sx={{width: cssWidth, height: cssHeight, fontSize: "12px", display: "flex", alignItems: "center"}}>??</Avatar>
    //     )
    // }

}

export default CryptoIcon