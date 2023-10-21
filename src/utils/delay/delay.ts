import { BookingsInterface } from "../../features/interfaces/interfaces";

type DelayType = string | BookingsInterface | BookingsInterface[] | undefined;

function delay (data: DelayType) {
    const time = Math.round(Math.random () * 500);
    return new Promise((resolve, reject) => {
        if(time < 480){
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