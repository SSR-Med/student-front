import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

import { useNavigate } from 'react-router';

export default function Menu(){
    const navigate = useNavigate();
    return (
        <header>
            <div onClick={() => navigate("/student")}>
                <PersonIcon />
                <a>Student</a>
            </div>
            <div onClick={() => navigate("/")}>
                <SchoolIcon />
                <a>Course</a>
            </div>
        </header>
    )
}