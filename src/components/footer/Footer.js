import React from 'react'
import '@/styles/footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='f-left-side'>
        <p>
          Sharing and Keeping your story!
        </p>
      </div>
      <div className='f-center-side'>
        <ul>
          <li>Liên hệ</li>
          <li>Hỗ trợ</li>
        </ul>
      </div>
      <div className='f-right-side'>
        <ul>
          <li>Site khác</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer