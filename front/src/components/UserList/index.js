import React, { useState } from "react";
import "./userList.css";

import SearchUser from "./SearchUser";
import Filter from "./Filter";
import UserField from "./UserField";

const UserList = ({ data }) => {
  const [url, setUrl] = useState(`${process.env.REACT_APP_API_PORT}/users?`);
  const [name, setName] = useState("");
  const [opFollowing, setOpFollowing] = useState(false);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const query = `${name ? `&name=${name}` : ""}${
    opFollowing ? `&op_following=true` : ""
  }${sort ? `&sort=${sort}` : ""}`;

  return (
    <main className="cc" style={{ flexDirection: "column" }}>
      <SearchUser setUrl={setUrl} setName={setName} setPage={setPage} />
      <div className="ac users">
        <Filter
          setOpFollowing={setOpFollowing}
          setSort={setSort}
          setPage={setPage}
        />
        <UserField
          url={`${url}page=${page}${query}`}
          setPage={setPage}
          page={page}
        />
      </div>
    </main>
  );
};

export default UserList;
