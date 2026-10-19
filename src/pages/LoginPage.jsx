// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LogoMark from '../components/LogoMark';
import './LoginPage.css';

export default function LoginPage() {
  const { login, continueAsGuest } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password.trim()) e.password = 'Password is required';
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate async
    login(email, password);
    navigate('/');
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/shop');
  };

  return (
    <div className="login-page">
      {/* Left: form */}
      <div className="login-form-side">
        <div className="login-logo">
          <LogoMark size={36} />
          <Link to="/" className="login-brand">Sproutline</Link>
        </div>

        <div className="login-card">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your Sproutline account</p>

          <form className="login-form" onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Email address</label>
              <input
                id="login-email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">Password</label>
              <input
                id="login-password"
                type="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <p id="password-error" className="form-error">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg login-submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Signing in…' : 'Log in'}
            </button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button className="btn btn-secondary btn-lg login-guest" onClick={handleGuest}>
            Continue as guest
          </button>

          <p className="login-create">
            New here? Don't worry just login to create account.
          </p>
        </div>
      </div>

      {/* Right: decorative panel with photo */}
      <div className="login-deco-side" aria-hidden="true">
        <img
          src="/images/ecofriendly-panel.jpg"
          alt="Hands holding a green heart inside a recycling symbol over a forest"
          className="login-deco-img"
        />
      </div>
    </div>
  );
}
