
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


function takeOddOnesOut(arr) {
    arr = arr.filter((e) => {
        return e % 2 == 0
    })
    return arr
}


function takeOddOnesOut2(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 != 0) {
            arr.splice(i, 1)
        }
    }
    return arr
}


takeOddOnesOut2(arr)