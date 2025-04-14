exports.EventEntity = class EventEntity {
    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.start_date = event.start_date || new Date();
        this.end_date = event.end_date || new Date();
        this.comment = event.comment || null;
        this.active = event.active !== undefined ? event.active : true;
        this.requisition_id = event.requisition_id;
        this.token = event.token;
    }
}