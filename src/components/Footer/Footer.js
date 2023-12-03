import { Link } from 'react-router-dom';
import { useAdmin } from '../../helper';
import './Footer.css';
export default function Footer() {
    const [token] = useAdmin();
    return (
        <div className="footer">
            For any questions or concerns regarding registration or the website, please contact <a href="tel:9188670699">Aswanth V C</a><br/>
            {token > 5 && <Link className='inaugurate-link' to="/inaugurate">Go to inaugurate ;)</Link>}
        </div>
    )
}