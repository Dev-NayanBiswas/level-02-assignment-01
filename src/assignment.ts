function formatString(input: string, toUpper?: boolean): string {
  if (typeof toUpper === 'undefined' || toUpper) {
    return input.toUpperCase()
  } else {
    return input.toLowerCase()
  }
}

function filterByRating(
  items: { title: string; rating: number }[]
): { title: string; rating: number }[] {
  return items.filter((item) => item.rating >= 4)
}

function concatenateArrays<T>(...arrays: T[][]): T[] {
  return arrays.flatMap((elem) => elem)
}

class Vehicle {
  constructor(private make: string, private year: number) {}
  getInfo(): string {
    return `Make: ${this.make}, Year: ${this.year}`
  }
}

class Car extends Vehicle {
  constructor(make: string, year: number, private model: string) {
    super(make, year)
  }

  getModel(): string {
    return `Model: ${this.model}`
  }
}

function processValue(value: string | number): number {
  if (typeof value === 'string') {
    return value.length
  } else {
    return value * 2
  }
}

interface Product {
  name: string
  price: number
}

function getMostExpensiveProduct(products: Product[]): Product | null {
  if (!products.length) {
    return null
  } else {
    return products.sort((a, b) => b.price - a.price)[0]
  }
}

enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

function getDayType(day: Day): string {
  switch (day) {
    case Day.Saturday:
    case Day.Sunday:
      return 'Weekend'
    default:
      return 'Weekday'
  }
}

let timeoutID: any

async function squareAsync(n: number): Promise<number> {
  clearTimeout(timeoutID)
  return new Promise((resolve, reject) => {
    if (n < 0) {
      reject(new Error('Error: Negative number not allowed'))
    } else {
      timeoutID = setTimeout(() => resolve(n * n), 1000)
    }
  })
}
