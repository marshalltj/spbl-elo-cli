export class Event {
	id: number;
	name: string;
	date: Date;

	constructor(event?: any){
		if(event){
			this.id = event.id;
			this.name = event.name;
			this.date = new Date(event.date);
		}
	}
}