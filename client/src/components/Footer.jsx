import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '10px' }}>PROFILE</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}>FAQ's</li>
            <li style={{ marginBottom: '5px' }}>Pricing plans</li>
            <li style={{ marginBottom: '5px' }}>Order tracking</li>
            <li style={{ marginBottom: '5px' }}>Returns</li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '10px' }}>RECENT POSTS</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}>Touch of uniqueness</li>
            <li style={{ marginBottom: '5px' }}>Offices you won’t forget</li>
            <li style={{ marginBottom: '5px' }}>Cicilan</li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '10px' }}>CUSTOMER</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}>Help & contact us</li>
            <li style={{ marginBottom: '5px' }}>Return</li>
            <li style={{ marginBottom: '5px' }}>Online stores</li>
            <li style={{ marginBottom: '5px' }}>Terms & condition</li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '10px' }}>CONTACT</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}>951596422</li>
            <li style={{ marginBottom: '5px' }}>moviehub@gmial.com</li>
            <li style={{ marginBottom: '5px' }}>movieshub</li>
          </ul>
          <div style={{ marginTop: '10px' }}>
            <i className="fab fa-instagram" style={{ marginRight: '10px', fontSize: '20px' }}></i>
            <i className="fab fa-twitter" style={{ marginRight: '10px', fontSize: '20px' }}></i>
            <i className="fab fa-facebook" style={{ fontSize: '20px' }}></i>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <hr style={{ borderColor: '#555' }} />
        <p style={{ marginTop: '10px', fontSize: '14px' }}>© 2014 Nizami cinema. All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;