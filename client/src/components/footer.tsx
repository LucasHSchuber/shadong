

import "../assets/css/footer.css"



const Footer = () => {


  return (
    <header className="footer">
            <h1 className="title">Shadong</h1>
    
            <div className={`footer-link-menu`}>
                <ul>
                    <li><a href="/myshelf">My Shelf</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        </header>
  );
};

export default Footer;
