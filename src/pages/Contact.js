import React from 'react'
import { Link } from 'react-router';
import Card from '../components/Card';

function Contact()
{
    return( <div className="p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
        <Link to="contact/national">
          <Card title="Mof Contact" imageSrc="./emblem.png" />
        </Link>
        <Link to="/contact/ministry">
          <Card title="Federal Ministries Contact" imageSrc="./emblem.png" />
        </Link>
        <Link to="/contact/province">
          <Card title="Provincial Contact" imageSrc="./emblem.png" />
        </Link>
        <Link to="/contact/local">
          <Card title="Local Contact" imageSrc="./emblem.png" />
        </Link>
      </div>
    </div>
  );
}
export default Contact;