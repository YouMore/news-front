import React from "react";
import UserItem from "../userItem/UserItem";

const UsersList = ({ users }) => {
  if (!users.length) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Пользователи не найдены
      </h1>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {users.map(user => 
          <UserItem user={user} key={user.id} />
        )}
      </div>
    </div>
  );
};

export default UsersList;
