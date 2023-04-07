let randomNum = (round = 6) => {
    let randomNum = ''
    for (let i = 0; i < round; i++) {
        let num = String(Math.floor(Math.random() * 10))
        randomNum += num
    }
    return Number(randomNum)
}

export default randomNum;