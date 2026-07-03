import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users?limit=100");
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const result = users.filter((user) => {
      return (
        user.id.toString().includes(value) ||
        user.firstName.toLowerCase().includes(value) ||
        user.lastName.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
      );
    });

    setFilteredUsers(result);
  }, [search, users]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-primary btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="table-container">
        <div className="search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DataTable
          title="User Data"
          columns={columns}
          data={filteredUsers}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          fixedHeader
          fixedHeaderScrollHeight="650px"
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default UserTable;