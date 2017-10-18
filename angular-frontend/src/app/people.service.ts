import { MatchFilter, Person } from '../data/person'
import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import 'rxjs/add/operator/toPromise'


@Injectable()
export class PeopleService {
    constructor(private http: Http) {}
    async getPeople(filter: MatchFilter, location?: { lon: number, lat: number}): Promise<Person[]> {
        if (location) filter = { ...filter, location }
        const response: { status: number; payload: Person[] } = 
            await this.http.post('/api/matches', filter).toPromise().then(u => u.json())

        if (response.status != 200)
            throw new Error("Cannot fetch people list")

        return response.payload
    }
}