export default class Validation {
    static required(value) {
        return !!value.length;
    }

    static email(value) {
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return pattern.test(value);
    }

    static min(value, min) {
        return (value.length >= min);
    }

    static max(value, min) {
        return (value.length <= min);
    }
}