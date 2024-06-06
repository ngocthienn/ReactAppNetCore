import React from "react";

const TemplateItem = ({ item, index }) => {
    return (
        <tr key={index}>
            <th scope="row">{index}</th>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><a href={`/FormBuilder/${item.id}`}>Edit</a></td>
        </tr>
    );
};

export default TemplateItem;