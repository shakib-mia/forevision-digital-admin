import { useContext, useEffect, useState } from 'react';
import Stat from '../Stat/Stat';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const Header = () => {
    const [counts, setCounts] = useState({});
    const navigate = useNavigate()
    const { store } = useContext(AppContext);
    const { token } = store

    useEffect(() => {
        const config = {
            headers: {
                token: token
            }
        }
        // axios.get(backendUrl + 'users', config).then(res => setUsers(res.data)).catch(err => console.log(err.response.data))
        axios.get(backendUrl + 'dashboard', config).then(res => setCounts(res.data)).catch(err => {
            if (err.response.data.message === "jwt expired") {
                localStorage.removeItem("token");
                navigate("/login")
            }
        })
    }, [])

    return (
        <div className="grid grid-cols-4 gap-3 py-3">

            <Stat count={counts.usersCount} heading="Total Users" />
            <Stat count={counts.isrcCount} heading="Total Songs" />
            <Stat text={counts?.topContributor?.partnerName} heading="Top Contributor" />
            <Stat text={counts.topSong?.song_title} heading="Total Songs" />


        </div>
    );
};

export default Header;