import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <img src={assets.logo} alt="" />
                 <p>lorem is simply dumy text of printing andv typesetting industry .lorem has been industry standard dummy text ever since the 1500s, when an unknown printer.lorem has been industry standard dummy text ever since the 1500s, when an unknown printer</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon}alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                  <h2>COMPANY</h2>
                  <ul>
                    <li>Home</li>
                     <li>About us</li>
                     <li> Delievery</li>
                     <li>Privacy policy</li>
                  </ul>
            </div>
            <div className="footer-content-right">
                 <h2>GET IN TOUCH</h2>
                 <ul>
                    <li>+91-9-362-622-2255</li>
                    <li> contact@tomato.cpm</li>
                                         
                 </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ Tomato - All Right reserved.</p>
       
      
    </div>
  )
}

export default Footer
