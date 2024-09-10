import Logo from '/Logo.png';

const Title = () => {
    return(
        <div>
        <a href="/index.html" target="_blank">
          <img src={Logo} className="max-h-[60px] pl-5" alt="EasyBook logo" />
        </a>
        {/* <h1 className="absolute top-[10px] right-[30px] text-[#103346] font-[Arial]">Book Smarter, Travel Easier</h1> */}
      </div>
    )
 };

 export default Title;
     