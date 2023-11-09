import { currentCar, currentCarSize } from "../../../../lib/utils"

export const load = async () => {
    let carname;
	let carsize;

	currentCar.subscribe((data) => {
		carname = data;
	});

	currentCarSize.subscribe((data) => {
		carsize = data;
    });
    
    return {
        carname, carsize
    }
}