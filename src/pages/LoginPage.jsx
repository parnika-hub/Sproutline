// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
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
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 28 C16 20, 16 14, 16 8" stroke="#C9A06B" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M16 16 C12 14, 8 10, 10 6 C12 6, 14 10, 16 14" fill="#2C5A43"/>
            <path d="M16 12 C20 10, 24 6, 22 2 C20 2, 18 6, 16 10" fill="#B9D1B0"/>
          </svg>
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
            New here?{' '}
            <button
              className="login-create__link"
              onClick={() => { setEmail(''); setPassword(''); }}
              aria-label="Create an account (uses same form — any email/password works)"
            >
              Create an account
            </button>
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
