function delay (data) {
    const time = Math.round(Math.random () * 600);
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(data);
        }, time);
    });
}


export default delay;