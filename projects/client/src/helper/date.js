function sortDate(date) {
    const substringed = date?.substring(0, 10)
    return substringed?.split("-")?.reverse()?.join("/")
}
console.log(sortDate('2023-07-13 09:21:45'))
module.exports = { sortDate }