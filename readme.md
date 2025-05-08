<h3 align="center">
<a>Interview Questions</a>
</h3>

---

<h3>1. Some differences between types and interfaces in Typescript</h3>

Typescript give us the freedom to declare custom types of data with `type` alias or `interface`. But there are few differences in their use cases.

- **_Syntactics Differences_ :** here is the syntax differences of type and interface.

```javascript
// Type Alias
  type VehicleType = {
    type:string
    fuel: "petrol" | "diesel" | "electric" | "hybrid";
  }

  // Interface
  interface Car {
    brand: string;
    model: string;
    year: number;
  }
```

- **_Redeclare_ :** Types are unique can't be redeclared where interface can be redeclared and reassigned

```javascript
  interface Vehicle{
    type:string
    fuel: "petrol" | "diesel" | "electric" | "hybrid";
  }
  interface Vehicle {
    brand: string;
    model: string;
    year: number;
  }
  const myCar:Vehicle = {
    type:"Four-wheeler",
    fuel: "petrol",
    licenseRequired: true,
    brand: "TOYOTA",
    model: "XD-Corolla",
    year: 2024,
  }
  // when interfaces redeclared they merge themselves together, it's called Declaration Merge
```

- **_Primitive & Non-Primitives_ :** Interfaces only to represent non-primitive data, whether Types can declare not only primitives as well as object types, union types, tuple and intersections.

```javascript
// Primitive Type Alias
type UserID = number
type Username = string

let id: UserID = 101
let name: Username = 'Alice'

//Object Type Alias
type User = {
  id: number,
  name: string,
  isAdmin: boolean,
}

const user: User = {
  id: 1,
  name: 'Bob',
  isAdmin: false,
}

//Union Type Alias
type Status = 'loading' | 'success' | 'error'
let requestStatus: Status = 'loading'

//Tuple Type Alias
type Point = [number, string]
const origin: Point = [0, '2']

// Intersection Type Alias
type Person = {
  name: string,
}

type Employee = {
  employeeId: number,
}

type Staff = Person & Employee

const staffMember: Staff = {
  name: 'Charlie',
  employeeId: 1234,
}
```

- **_Extends_:** Both type aliases and interfaces can be extended. However, the syntax differs. A derived type alias or interface has all the properties and methods of its base type alias or interface, and can also define additional members.

```javascript
  // A type alias can extend another type alias using an ampersand
  type A = { x: number };
  type B = A & { y: string };

  // Type aliases can also extend interfaces
  interface A {
      x: number;
  }

  type B = A & { y: string };

  //Interfaces can extend type aliases with the extends keyword
  type A = {
    x: number;
  };

  interface B extends A {
    y: string;
  }

  // Interfaces can extend other interfaces the same way they extend type aliases. Interfaces can also extend multiple interfaces separated by commas.
  interface A {
    x: string;
    y: number;
  }

  interface B {
      z: boolean;
  }

  interface C extends A, B {
      w: string;
  }

  let c: C = {
      w: "Jenny"
      x: "Doe",
      y: 4,
      z: true,
  };

```

- **_Uses cases of types and interfaces in class_ :** Typescript allows both type and interface to insert with class but there are some differences between them..

```javascript
class Animal {
  name: string
}

// Inserting using type alias for creating new Model
type DogType = Animal & {
  breed: string, //copied manually from Animal
}

// extending parent class and get the inheritance power using extends by interface
interface DogInterface extends Animal {
  breed: string; //inheriting it's parent Animal class logics
}

//It's like both of them having access of name & breed or any method were available in Animal class, but the key differences are in inheritances,

// Incase of type implementation : The class must have all the same public properties that Animal has.It does not mean DogType actually inheriting from the Animal class. So no need to use super() here,   It’s Like Building From Scratch...

class DogFromType implements DogType {
  name: string
  breed: string

  constructor(name: string, breed: string) {
    this.name = name
    this.breed = breed
  }
}

// Incase of interface implementation : here extending Animal class so inheriting its logics as well including parents constructor. Here need to call super() before accessing this in subClass- otherwise there will be a runtime error
class DogFromInterface extends Animal implements DogInterface {
  breed: string

  constructor(name: string, breed: string) {
    super(name)
    this.breed = breed
  }
}
```

**_summary_ :** In Object-Oriented Programming, interfaces are generally more reliable than types when defining class contracts, because they support inheritance, can extend other classes or interfaces, and are designed to work naturally with implements.

<h3>2. What is the use of enums in TypeScript? Provide an example of a numeric and string enum.</h3>

- **_Enums_ :** enum defines a strict set of options for variables, enums are nothing but objects, basically grouping together different types of data utilized in code.

```javascript
  enum Weekdays {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
```

- **_How Enums Compiled_ :** enums default to numeric enums (Weekdays) , so the Weekdays enum is essentially an object with keys 0 to 6 as keys, and its following transpiled javascript code is

```javascript
'use strict'
var Weekdays
;(function (Weekdays) {
  Weekdays[(Weekdays['Monday'] = 0)] = 'Monday'
  Weekdays[(Weekdays['Tuesday'] = 1)] = 'Tuesday'
  Weekdays[(Weekdays['Wednesday'] = 2)] = 'Wednesday'
  Weekdays[(Weekdays['Thursday'] = 3)] = 'Thursday'
  Weekdays[(Weekdays['Friday'] = 4)] = 'Friday'
  Weekdays[(Weekdays['Saturday'] = 5)] = 'Saturday'
  Weekdays[(Weekdays['Sunday'] = 6)] = 'Sunday'
})(Weekdays || (Weekdays = {}))

console.log(Weekdays.Thursday) //0
console.log(Weekdays['Thursday']) //0
console.log(Weekdays[0]) //Monday
```

**_Using Multiple Enums_ :** Like the way of Typescript we can declare union type of enums

```javascript
  enum Door {
    Open = 'open',
    Closed = 'closed',
    Ajar = 'ajar', // half open, half closed
  }

  enum DoorFrame {
    Missing = 'noDoor',
  }

  type DoorState = Door | DoorFrame

  let door: DoorState
  door = Door.Ajar
  console.log(door) // 'ajar'

  door = DoorFrame.Missing
  console.log(door) // 'noDoor'
```

- **_Use Cases_ :** enum becomes an object literal when transpiled, It will behave like a JavaScript object and we can use the spread syntax and rest operators like below to create a new object with more or less properties, as it defines a fixed group of values to choose from — like status codes, user roles, directions, dropdown options, weekdays, seasons etc.

```javascript
enum Weekdays {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}
const myMove = {
  ...Weekdays, //using spread operator
  Holiday: 'ChristmasDay',
}

console.log(myMove) //will return an object

//using Rest operators
const { Sunday, Saturday, ...otherDays } = Weekdays
console.log(otherDays)
```

- **_Example_ :** In TypeScript the example of string and numeric enums, would be like:

```javascript

  //String enum
  enum Weekdays {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
  }
  // Numeric enum
  enum Weekdays {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
```

**_Note_ :** enums can't be redeclared...
