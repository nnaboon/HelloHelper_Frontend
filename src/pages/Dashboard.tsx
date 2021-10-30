import React from 'react';
import { REQUEST } from '../data/request';

const Dashboard = () => {
    return (
        <div>
            <div>{REQUEST.map((items) => (
                    <div>{items.title}</div>
                )
            )}</div>
        </div>
    )

}

export default Dashboard;