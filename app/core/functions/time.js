module.exports = {

    time(d = Date()) {
        const year = `${d.getFullYear().toString()}`;
        const month = `${(d.getMonth() + 1).toString().length === 2 ? (d.getMonth() + 1).toString() : `0${(d.getMonth() + 1).toString()}`}`;
        const day = `${d.getDate().toString().length === 2 ? d.getDate().toString() : `0${d.getDate().toString()}`}`;
        const hours = `${d.getHours().toString().length === 2 ? d.getHours().toString() : `0${d.getHours().toString()}`}`;
        const minutes = `${(parseInt(d.getMinutes() / 5) * 5).toString().length === 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : `0${(parseInt(d.getMinutes() / 5) * 5).toString()}`}`;
        const seconds = `${d.getSeconds().toString().length === 2 ? d.getSeconds().toString() : `0${d.getSeconds().toString()}`}`;
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

};