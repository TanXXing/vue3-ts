var a = 'why'
console.log(a)

const obj = {
  age: 0
}

const obj1 = { ...obj }

obj.age = 100

console.log(obj)
console.log(obj1)
