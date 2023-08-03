function sortDate(value) {
    const array = new Date(value)?.toString()?.substring(0, 21).split(' ');
    const day = array[0];
    const date = array[1];
    const month = array[2];
    const year = array[3];
    const time = array[4];
    
    return `${day}, ${date} ${month} ${year} at ${time} WIB`
}

function sortSimpleDate(value) {
    const substringed = value?.substring(0, 10)
    return substringed?.split("-")?.reverse()?.join("/")
}
module.exports = { sortDate, sortSimpleDate }