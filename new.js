let allInfo = [];

const time = () => {
  if (new Date().getHours() < 12) {
    return new Date().getHours() + ":" + new Date().getMinutes() + " AM";
  } else {
    return new Date().getHours() + ":" + new Date().getMinutes() + " PM";
  }
};

// CREATE ONE

const createOne = (obj) => {
  allInfo.push(obj);
  return allInfo;
};

createOne({
  Id: 101,
  name: "Chioma",
  active: true,
  roles: ["driver", "waiter", "CEO"],
  age: 39,
  userName: "chiomaUnique27",
  timeCreated: time(),
});

// CREATE MANY

const createMany = (arrofObj) => {
  arrofObj.map((item) => allInfo.push(item));
  return allInfo;
};

createMany([
  {
    Id: 102,
    name: "Onyinye",
    active: true,
    roles: ["Engineer", "Server"],
    age: 29,
    userName: "Onyi5050",
    timeCreated: time(),
  },
  {
    Id: 103,
    name: "Joan",
    active: false,
    roles: ["manager", "Artist"],
    age: 14,
    userName: "Joan2039",
    timeCreated: time(),
  },
  {
    Id: 104,
    name: "Dolapo",
    active: false,
    roles: ["Coordinator", "Director"],
    age: 43,
    userName: "DollyDollars001",
    timeCreated: time(),
  },
]);

//  GET ONE

const getOne = (id) => {
  let found = allInfo.find((item) => item.Id == id);
  return found == undefined ? "This Id does not exist" : found;
};

getOne(109);

// GET MANY

const getMany = (arrOfId) => {
  let newArr = [];
  arrOfId.forEach((id) => {
    const res = allInfo.filter((data) => data.Id == id);
    if (res.length == 0) {
      newArr.push(id + " does not exist");
    } else {
      newArr.push(res[0]);
    }
  });

  return newArr;
};

getMany([101, 109]);

// UPDATE ONE

const updateOne = (id, val) => {
  let update = allInfo.map((data) => {
    if (data.Id == id) {
      return { ...data, name: val, timeCreated: time() };
    }
    return data;
  });
  return update;
};

updateOne(103, "Ashley");

// UPDATE MANY

const updateMany = (arrOfInfoToChg) => {
  let result = [];
  arrOfInfoToChg.forEach((el) => {
    const user = allInfo.find((data) => data.Id == el[0]);
    if (!user) {
      result.push(`User with ${el[0]} not found`);
    } else {
      allInfo.map((data) => {
        if (data.Id == el[0]) {
          const updated = {
            ...data,
            name: el[1],
            userName: el[2],
            timeUpdated: time(),
          };
          result.push(updated);
          return updated;
        }
        return data;
      });
    }
  });
  return result;
};

updateMany([
  [101, "Vicky", "Vicky001"],
  [109, "Beccky", "BecckyBee"],
  [104, "Jamine", "ClassyJasmine"],
]);

// DELETE ONE

const deleteOne = (id) => {
  let deleter = allInfo.filter((item) => item.Id !== id);
  return deleter == undefined ? "Id does not exist" : deleter;
};

deleteOne(104);

// DELETE MANY

const deleteMany = (arrOfIds) => {
  arrOfIds.map(
    (item) => (allInfo = allInfo.filter((data) => data.Id !== item))
  );
  return allInfo;
};

deleteMany([101, 104]);

// RETURN BY NAME

const returnByName = (userName) => {
  return allInfo.find((item) => item.userName == userName);
};

returnByName("Joan2039");
