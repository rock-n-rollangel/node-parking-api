import { HttpException, HttpStatus } from "@nestjs/common";


export class TimeReservedException extends HttpException {
    constructor() {
        super('This time already reserved', HttpStatus.BAD_REQUEST);
    }
}