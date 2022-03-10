import "./styles.scss";
import { useState, useEffect } from "react";
import userService from "./services/user";
import UserCard from "./components/UserCard";
import SearchBar from "./components/SearchBar";
import Sort from "./components/Sort";
import Pagination from "./components/Pagination";

const App = () => {
  const [userList, setUserList] = useState(null);
  const [sortType, setSortType] = useState(false);

  // calls the userService to get the user list
  const getUserList = (page) => {
    userService.getUserList(page).then((data) => {
      setUserList(data ? data.sort(compare) : []);
    });
  };

  // get user list on page load
  useEffect(() => {
    getUserList();
  }, []);

  // when we type a name in the searchbar, we filter our
  // current user list by the user input, if we clean the input
  // we make a request to the API to refresh the user list
  const searchByName = (name) => {
    if (name || name !== "") {
      const filteredUserList = userList.filter((user) => {
        const fullName = `${user?.name?.first} ${user?.name?.last}`;
        return fullName.toLowerCase().includes(name.toLowerCase());
      });
      setUserList(filteredUserList);
    } else {
      getUserList();
    }
  };

  // compare function that sorts userList by first name,
  // passed as an argument to sort the user list
  const compare = (a, b) => {
    if (a?.name?.first < b?.name?.first) {
      return sortType ? 1 : -1;
    }
    if (a?.name?.first > b?.name?.first) {
      return sortType ? -1 : 1;
    }
    return 0;
  };

  // when we change the sort type in the sort component, we set
  // sortType to the new value
  const sortByName = (sortType) => {
    setSortType(sortType);
  };

  // when we detect a change in sortType (code above), and if
  // we have a userList, we sort our userList. Keep in mind the
  // (prevUserList) => [...prevUserList].sort(compare) portion of
  // the code, as we need to create a copy of userList before sorting it
  // and setting it again, otherwise, the component wont update the first
  // time
  useEffect(() => {
    if (userList) {
      setUserList((prevUserList) => [...prevUserList].sort(compare));
    }
  }, [sortType]);

  // When we change any of the possible fields in edit mode in UserCard
  // we find the changed user by its uuid, and we set the changed values
  // directly into the user, allowing us to filter by the new user name
  // if we change it
  const onChangeUser = (id, newData) => {
    if (id && newData) {
      setUserList(
        userList.map((user) => {
          if (user?.login?.uuid === id) {
            const firstName = newData.name.split(" ")[0];
            const lastName = newData.name.split(" ")[1] || "";
            const state = newData.location.split(", ")[0];
            const city = newData.location.split(", ")[1] || "";
            user.name.first = firstName;
            user.name.last = lastName;
            user.email = newData.email;
            user.cell = newData.number;
            user.location.state = state;
            user.location.city = city;
          }
          return user;
        })
      );
    }
  };

  // When we change the page, we make a request to get the user list
  // in the selected page
  const onPageChange = (page) => {
    getUserList(page);
  };

  return (
    <div className="App">
      <h1>Hi Southteams</h1>
      <h2>I hope you like this revolutionary user list app :)</h2>
      <h4>
        If you like, you can filter and sort by first name, edit the user and
        paginate trough the result list.{" "}
      </h4>
      {/* SearchBar component */}
      <SearchBar searchByName={(name) => searchByName(name)} />
      <br />
      {/* Sort component */}
      <div className="align-left">
        <Sort sortByName={(sortType) => sortByName(sortType)} />
      </div>
      {/* Pagination component */}
      <Pagination onPageChange={(page) => onPageChange(page)} />
      {/* Dinamic rendering of the userList */}
      <div className="content">
        {userList &&
          userList.map((user) => {
            return (
              <div key={`${user?.login?.uuid}`} className="content-item">
                {/* UserCard component */}
                <UserCard
                  id={user?.login?.uuid}
                  name={`${user?.name?.first} ${user?.name?.last}`}
                  email={user?.email}
                  number={user?.cell}
                  location={`${user?.location?.state}, ${user?.location?.city}`}
                  photo={user?.picture?.large}
                  onChangeUser={(id, newData) => onChangeUser(id, newData)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
