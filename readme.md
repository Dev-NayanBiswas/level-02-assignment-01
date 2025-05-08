<h3 align="center">
<a>Interview Questions</a>
</h3>

---

<h3>1. Some differences between types and interfaces in Typescript</h3>

Typescript give us the freedom to declare custom types of data with `type` alias or `interface`. But there are few differences in their use cases.

- **_Syntactics Differences_**

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

- Types are unique can't be redeclared where interface can be redeclared and reassigned

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

- Interfaces only to represent non-primitive data, whether Types can declare not only primitives as well as object types, union types, tuple and intersections.

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

-
