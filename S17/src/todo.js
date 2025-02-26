/**
 * Represents the tasks for the user.
 */
class ToDo{
    #id
    #title
    #description
    #dueDate
    #dateCompleted
    /**
     * @constructor
     * @param {number} id
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     */
    constructor(id, title, description, dueDate){
        this.#id = id
        this.#description = description
        this.#title = title
        this.#dueDate = dueDate
        this.#dateCompleted = null

    }
}