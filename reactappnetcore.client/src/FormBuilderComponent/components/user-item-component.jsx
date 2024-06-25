import React from "react";

const UserItem = ({ item, index }) => {
    return (
        <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.name}</td>
        </tr>
    );
};

export default UserItem;