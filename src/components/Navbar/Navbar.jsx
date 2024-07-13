import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { auth, database } from '../../Firebase/config';
import { FaLink } from "react-icons/fa6";
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const cardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (!loading && user) {
                try {
                    const userSnapshot = await database.collection('users').doc(user.displayName).get();
                    setName(userSnapshot.data().firstName);
                } catch (err) {
                    console.log(err);
                }
            } else console.log("user not signed in")
        };
        getUser();
    }, [loading, user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        auth.signOut();
    };

    const toggleCard = () => {
        setToggle(!toggle);
    };

    const handleCopyUrl = () => {
        const baseUrl = window.location.origin;
        const customUrl = `${baseUrl}/Gallery/${user.displayName}`;
        navigator.clipboard.writeText(customUrl).then(() => {
            alert("URL copied to clipboard");
        }).catch((err) => {
            console.error("Failed to copy URL: ", err);
        });
    };

    return (
        <header className="nav-header">
            <nav className="navbar">
                <div className="nav-container-1">
                    <h1 className="logo">crystal</h1>
                </div>
                <div className="nav-container-2">
                    <ul className="nav-menu">
                        <li><Link to={user && `/Gallery/${user.displayName}`} className="nav-link">gallery</Link></li>
                        <li><Link className="nav-link" to="#">about me</Link></li>
                        <li><Link className="nav-link" to="#">contact me</Link></li>
                        <li><Link className="nav-link" to="#">events</Link></li>
                    </ul>
                </div>
                {user ? (
                    <div className="flex gap-6 justify-end items-center relative nav-container-3">
                        <button onClick={toggleCard} className="text-primary hover:bg-gray-100 px-4 py-2 rounded font-semibold">{name}</button>
                        <AnimatePresence>
                            {toggle && (
                                <motion.div
                                    ref={cardRef}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-secondary/20 w-48 rounded absolute top-12 right-0 p-4"
                                >
                                    <button onClick={handleCopyUrl} className="w-full hover:bg-primary/40 mb-2 py-2 font-semibold text-left flex items-center gap-4 px-4 text-xs bg-primary/20 rounded">
                                        <FaLink />Copy url
                                    </button>
                                    <button onClick={() => navigate("/Profile")} className="w-full hover:bg-primary/40 mb-2 py-2 font-semibold text-left flex items-center gap-4 px-4 text-xs bg-primary/20 rounded">
                                        <FaUser />Profile
                                    </button>
                                    <button onClick={handleLogout} className="w-full hover:bg-red-400 py-2 font-semibold text-left flex items-center gap-4 px-4 text-xs bg-red-300 rounded">
                                        <RiLogoutCircleRLine />Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex justify-end nav-container-3">
                        <Link to="/Auth" className="px-3 py-2 text-sm bg-primary font-semibold text-white rounded hover:bg-primary/80">Sign In</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
