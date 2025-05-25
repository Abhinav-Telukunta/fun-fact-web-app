import { loginUrl } from '../api';
import '../App.css';

export default function LoginButton() {
    return (
        <div className="container">
            <div className="login-card">
                <img src="/logo.svg" alt="FunFact Logo" className="logo" />
                <h1>Fun Fact Web App</h1>
                <p className="tagline">Discover something new about your favorite movies.</p>
                <button onClick={() => (window.location.href = loginUrl)} className="google-btn">
                    <img src="/google-logo.svg" className="btn-icon" />
                    Sign in with Google
                </button>
            </div>
        </div>

    );
}