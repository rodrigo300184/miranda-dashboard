function delay (data) {
    const time = Math.round(Math.random () * 3000);
    return new Promise((resolve, reject) => {
        if(time < 2500){
        setTimeout(()=> {
            resolve(data);
        }, time);
    }else {
        setTimeout(()=> {
            reject();
        }, time);
    }

    });
}


export default delay;