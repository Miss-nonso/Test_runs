let database = [];

const time = () => {
  if (new Date().getHours() < 12) {
    return new Date().getHours() + ":" + new Date().getMinutes() + " AM";
  } else {
    return new Date().getHours() + ":" + new Date().getMinutes() + " PM";
  }
};

const autoAdd = () => {
  database = database.map((user, index) => {
    let idGenerator = ("USERSC00" + (index + 1)).toString();
    return {
      id: idGenerator,
      userName: user.name + "00" + (index + 1),
      ...user,
      status: true,
      timeCreated: time(),
      timeUpdated: time(),
    };
  });

  return database;
};

// CREATE ONE

const createOne = (user) => {
  if (typeof user !== "object") {
    return "Invalid Entry";
  } else if (typeof user === "object") {
    if (user.name && user.role && user.age) {
      database.push(user);
    } else {
      return "One or more field(s) missing. Please Enter name, age and role.";
    }
  }
  return autoAdd();
};

createOne({ name: "Helen", role: ["Director", "Manager"], age: 76 });

// CREATE MANY

const createMany = (arrOfUsers) => {
  arrOfUsers.map((user) => {
    if (typeof user !== "object") {
      return "Invalid Data type exists in your list";
    } else {
      if (user.name && user.role && user.age) {
        database.push(user);
        return database;
      } else {
        return "Error with entries";
      }
    }
  });
  return autoAdd();
};

createMany([
  {
    name: "Onyinye",
    role: ["Engineer", "Server"],
    age: 29,
  },
  {
    name: "Joan",
    role: ["manager", "Artist"],
    age: 14,
  },
  {
    name: "Dolapo",
    role: ["Coordinator", "Director"],
    age: 43,
  },
]);

//  GET ONE

const getOne = (id) => {
  if (typeof id !== "string") {
    return "Your input is of an incorrect datatype. Kindly use an appropriate string.";
  } else {
    if (
      id.substring(0, 6).toUpperCase() !== "USERSC" ||
      isNaN(Number(id.substring(6, id.length)))
    ) {
      return "Invalid Id number";
    } else {
      let getData = database.find((data) => data.id === id.toUpperCase());
      if (getData) {
        return getData;
      } else {
        return "No user with such ID";
      }
    }
  }
};
getOne("USERSC002");

// GET MANY

const getMany = (arrOfId) => {
  let arrOfUsers = [];
  arrOfId.forEach((data) => {
    const databasefilter = database.filter((user) => user.id == data);
    if (typeof data !== "string") {
      arrOfUsers.push(
        data + "has an incorrect datatype. Kindly use an appropriate string."
      );
    } else {
      if (
        data.substring(0, 6).toUpperCase() !== "USERSC" ||
        isNaN(Number(data.substring(6, data.length)))
      ) {
        arrOfUsers.push(data + " is an Invalid Id number");
      } else {
        databasefilter.forEach((filteredEl) => {
          arrOfUsers.push(filteredEl);
        });
      }
    }
  });
  return arrOfUsers;
};

getMany(["USE0SC001", "USERSC002"]);

// UPDATE ONE

const updateOne = (id, val) => {
  if (typeof val !== "string") {
    return "Error. Please use valid strings for both entries";
  } else {
    if (
      typeof id !== "string" ||
      id.substring(0, 6).toUpperCase() !== "USERSC" ||
      isNaN(Number(id.substring(6, id.length)))
    ) {
      return "Invalid Id number";
    } else {
      let UpdatedDatabase = database.map((user) => {
        return user.id == id
          ? {
              ...user,
              userName: val + id.substring(6, id.length),
              name: val,
              timeUpdated: time(),
            }
          : user;
      });
      return UpdatedDatabase;
    }
  }
};

updateOne("USERSC002", "Jerry");

// UPDATE MANY

const updateMany = (arrOfUpdates) => {
  let updateValidator = arrOfUpdates.map((data) => {
    if (typeof data[0] !== "string" || typeof data[1] !== "string") {
      return data + "  This entry contains invalid datatype(s)";
    } else {
      if (
        data[0].substring(0, 6).toUpperCase() !== "USERSC" ||
        isNaN(Number(data[0].substring(6, data[0].length)))
      ) {
        return data[0] + " This Id is invalid";
      } else {
        let updateApplier = database.map((user) => {
          if (user.id === data[0]) {
            return {
              ...user,
              userName: data[1] + data[0].substring(6, data[0].length),
              name: data[1],
              timeUpdated: time(),
            };
          } else {
            return data;
          }
        });
        return updateApplier;
      }
    }
  });
  return updateValidator;
};

console.log(
  "updateMany",
  updateMany([
    ["USERSC001", "Vicky"],
    ["USERSC002", "Amanda"],
    ["USERSC003", "Jamine"],
  ])
);

// DELETE ONE

const deleteOne = (id) => {
  let deleter = database.filter((item) => item.Id !== id);
  return deleter == undefined ? "Id does not exist" : deleter;
};

deleteOne("USERSC001");

// DELETE MANY

const deleteMany = (arrOfIds) => {
  arrOfIds.map(
    (item) => (database = database.filter((data) => data.Id !== item))
  );
  return database;
};

deleteMany([101, 104]);

// RETURN BY NAME

const returnByName = (userName) => {
  return database.find((item) => item.userName == userName);
};

returnByName("USERSC004");
