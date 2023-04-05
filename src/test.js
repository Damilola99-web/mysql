// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(others); // 1

const [first, second] = ["dog", "cat", "bird", "fish"];
console.log(first, second); // ["dog", "cat", "bird", "fish"]

const [name, age, ...others] = ["tayo", 78, {
    password: "123456",
    email: "a@v.c",
    address: "1234",
}];

console.log(others);

//            0            1            2
let aray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(aray[2][1]);