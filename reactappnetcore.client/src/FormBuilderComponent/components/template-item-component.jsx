import React from "react";

const TemplateItem = ({ item, index }) => {
    return (
        <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
                <a href={`/form-builder/${item.id}`}>Edit</a>
                <br />
                {/* <a href={`/answer/${item.id}`}>Answer</a> */}
            </td>
        </tr>
    );
};

export default TemplateItem;