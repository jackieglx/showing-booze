import React from 'react'
import {Link, Outlet, useNavigation} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    return (
        <div>
            <Navbar/>
            <section className='page'>
                {isPageLoading ? (
                    <div className='loading'></div>
                ) : (
                    <Outlet/>
                )}
            </section>
        </div>
    );
}
export default HomeLayout
