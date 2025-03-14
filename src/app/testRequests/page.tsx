import { addUser } from "./actions";

export default function Page() {
    return (
        <div>
            <h1>Test Requests</h1>
            <button onClick={addUser}>Add User</button>
        </div>
    );
}
