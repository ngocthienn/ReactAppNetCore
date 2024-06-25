import { useEffect, useState } from "react";
import userStore from "../stores/userStore";
import NavBar from "../components/nav-bar-component";
import Constant from "../stores/constants";
import UserItem from "../components/user-item-component";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [statusAction, setStatusAction] = useState('');
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        userStore.dispatch('getUsers');
        userStore.subscribe(state => onUpdateByStore(state));
    }, []);

    useEffect(() => {
        switch (statusAction) {
            case Constant.ADD_USER_SUCCESS:
                alert("Save success");
                closeAddForm();
                userStore.dispatch('setStatusAction', '')
                break;
            case Constant.ADD_USER_FAIL:
                alert("Save failed");
                setAddFormVisible(true);
                userStore.dispatch('setStatusAction', '')
                break;
            default:
                break;
        }
    }, [statusAction]);

    const onUpdateByStore = (state) => {
        setUsers(state.data);
        setStatusAction(state.statusAction);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userStore.dispatch('postUsers', inputs);
    }

    const closeAddForm = () => {
        setInputs({});
        setAddFormVisible(false)
    }

    let modalClass = 'modal';
    if (addFormVisible) {
        modalClass += ' show d-block';
    }

    return (
        <>
            <NavBar />
            <div>
                <h2>User</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 ? (
                            users.map((item, index) => (
                                <UserItem key={index} item={item} index={index} />
                            ))
                        ) : (
                            <tr>
                                <td>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setAddFormVisible(true)}>Add</button>
            </div>
            {addFormVisible &&
                <div className={modalClass} role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className='react-form-builder-form'>
                                <form onSubmit={handleSubmit}>
                                    <div className="SortableItem rfb-item">
                                        <div className="form-group">
                                            <label className="form-label"><span>Username: </span></label>
                                            <input className="form-control" type="text"
                                                name="username"
                                                value={inputs.username || ""}
                                                onChange={handleChange} />
                                        </div>

                                    </div>
                                    <div className="SortableItem rfb-item">
                                        <div className="form-group">
                                            <label className="form-label"><span>Name: </span></label>
                                            <input className="form-control" type="text"
                                            name="name"
                                            value={inputs.name || ""}
                                            onChange={handleChange} />
                                        </div>

                                    </div>
                                    <div className='btn-toolbar'>
                                        <input type="submit" className="btn btn-default" />
                                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closeAddForm}>Close</button>
                                    </div>
                                </form>

                            </div>

                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setAddFormVisible(false)}>Close</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserPage;