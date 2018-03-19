export default class Validation {
    static required(value) {
        return !!value.length;
    }

    static email(value) {
        let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return pattern.test(value);
    }

    static min(value, min) {
        return (value.length >= min);
    }

    static max(value, min) {
        return (value.length <= min);
    }
}