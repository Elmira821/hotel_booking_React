/* import Footer from './Footer'; */
import './MailList.css';

const MailList = () => {
    return (
        <section className="bg-gradient section-container">
            <div className="title-container">
               
                <p className="subtitle">Subscribe to receive our special offers!</p>
            </div>
            <form className="form-container">
                <div className="input-container">
                    <input type="text" placeholder="Your Email" className="input-field" />
                    <button className="button">Subscribe</button>
                </div>
                
            </form>
        </section>
    );
}

export default MailList;
