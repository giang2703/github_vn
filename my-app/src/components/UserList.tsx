// components/UserList.js
export default function UserList() {
    const users = ['Người dùng 1', 'Người dùng 2', 'Người dùng 3'];
    
    return (
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    );
  }
  